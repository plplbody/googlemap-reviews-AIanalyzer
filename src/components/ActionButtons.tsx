'use client';

import { useState, useEffect, useRef } from 'react';
import { Place } from '@/types/schema';
import { useUserInteractions } from '@/hooks/useUserInteractions';
import { useUserInteractionStatus } from '@/hooks/useUserInteractionStatus';
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';
import TagPicker from './TagPicker';
import LearningFeedbackPopup from './LearningFeedbackPopup';
import { UserInteraction } from '@/types/user';

interface ActionButtonsProps {
    place: Place;
    uid?: string;
    onActionComplete?: (effectivePreferences?: any) => void;
    initialInteraction?: UserInteraction | null; // S2-Impl-01: Allow injection from parent
}

export function ActionButtons({ place, uid, onActionComplete, initialInteraction }: ActionButtonsProps) {
    const { signInWithGoogle } = useAuth();
    const { evaluate, isLoading } = useUserInteractions(uid || '', place.id);

    // S2-Impl-01: Use injected interaction if available, otherwise fetch
    const hookResult = useUserInteractionStatus(uid || '', place.id, !!initialInteraction);
    const interaction = initialInteraction !== undefined ? initialInteraction : hookResult.interaction;
    const isStatusLoading = initialInteraction !== undefined ? false : hookResult.loading;

    // Sync with DB state, but allow local override for optimistic UI
    // We treat "Good" evaluation as the source of truth for "Liked/Saved"
    const [optimisticEval, setOptimisticEval] = useState<'good' | 'bad' | null | undefined>(undefined);

    // Derived state
    const lastEvaluation = optimisticEval !== undefined ? optimisticEval : (interaction?.evaluation?.type || null);
    const isLiked = lastEvaluation === 'good';
    // Server state for reference (to decide if we need to send "Delete")
    const serverLiked = interaction?.evaluation?.type === 'good';

    const [showTagPicker, setShowTagPicker] = useState(false);

    // Feedback handling
    const [feedbackData, setFeedbackData] = useState<{
        global: any;
        tag: any;
        tagName: string;
        globalExperience?: number;
        tagExperience?: number;
        isTagLevelUp?: boolean;
        isGlobalLevelUp?: boolean;
    } | null>(null);

    const hasSelectedTags = useRef(false);

    const handleHeartClick = async () => {
        if (!uid) {
            // S2-Impl-02: Auth Guard with Sign In
            if (confirm('お気に入り機能を使うにはログインが必要です。\nログインしますか？')) {
                try {
                    await signInWithGoogle();
                } catch (e) {
                    console.error("Login failed", e);
                }
            }
            return;
        }

        const nextState = !isLiked;

        // Optimistic Update
        setOptimisticEval(nextState ? 'good' : null);

        if (nextState) {
            // Liked: Open Picker
            // DEFER SAVE: We wait for user to select tag or dismiss picker
            setShowTagPicker(true);
            hasSelectedTags.current = false; // Reset
        } else {
            // Unliked: Cancel
            setShowTagPicker(false);

            // Only send request if server actually has it saved
            if (serverLiked) {
                try {
                    // @ts-ignore
                    await evaluate(null);
                    onActionComplete?.(); // Notify parent (List View update)
                } catch (e) {
                    console.error("Failed to unlike", e);
                    setOptimisticEval('good'); // Revert
                }
            }
        }
    };

    // Reset optimistic state when server state updates
    useEffect(() => {
        if (interaction !== undefined) {
            setOptimisticEval(undefined);
        }
    }, [interaction]);

    // Common function to finalize evaluation
    const submitEvaluation = async (scenarioIds: string[], tagNames?: string[]) => {
        try {
            // @ts-ignore
            const res = await evaluate({
                type: 'good',
                timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
                selectedFeatureKeys: [],
                negativeFeedback: undefined
            }, scenarioIds);

            if (res) {
                if (scenarioIds.length > 0 && res.updatedScenarios) {
                    // Tagged Feedback
                    const selectedScenarios = res.updatedScenarios.filter((s: any) => scenarioIds.includes(s.id));
                    if (selectedScenarios.length > 0) {
                        const blendedPref = { taste: 0, service: 0, atmosphere: 0, cost: 0 };
                        selectedScenarios.forEach((s: any) => {
                            blendedPref.taste += s.aiPreferences.taste;
                            blendedPref.service += s.aiPreferences.service;
                            blendedPref.atmosphere += s.aiPreferences.atmosphere;
                            blendedPref.cost += s.aiPreferences.cost;
                        });
                        const count = selectedScenarios.length;
                        blendedPref.taste /= count;
                        blendedPref.service /= count;
                        blendedPref.atmosphere /= count;
                        blendedPref.cost /= count;

                        setFeedbackData({
                            global: res.globalPreferences,
                            tag: blendedPref,
                            tagName: (tagNames && tagNames.length > 1) ? `${tagNames[0]} 他${tagNames.length - 1}件` : (tagNames?.[0] || 'タグ'),
                            globalExperience: res.globalExperience,
                            tagExperience: selectedScenarios[0]?.experience, // Use primary tag XP
                            isTagLevelUp: (selectedScenarios[0]?.experience || 0) % 100 === 0, // Simple heuristic: Since increments are 100, exact multiples mean we just crossed a boundary.
                            isGlobalLevelUp: res.globalExperience % 100 === 0 // Global increments are +20. If we hit 100, we leveled up.
                        });
                    }
                } else if (res.globalPreferences) {
                    // Generic Feedback
                    setFeedbackData({
                        global: res.globalPreferences,
                        tag: undefined,
                        tagName: '好みを学習',
                        globalExperience: res.globalExperience,
                        isGlobalLevelUp: res.globalExperience % 100 === 0
                    });
                }
                onActionComplete?.(res.effectivePreferences);
            }
        } catch (e) {
            console.error("Failed to submit evaluation", e);
            setOptimisticEval(null); // Revert on failure
        }
    };

    const handleTagSelect = async (scenarioIds: string[], tagNames: string[]) => {
        hasSelectedTags.current = true;
        await submitEvaluation(scenarioIds, tagNames);
    };

    // Handle closing behavior
    const handlePickerClose = () => {
        setShowTagPicker(false);

        // If closed without selection, trigger Generic Save
        // Check if we are still in "Liked" state (User didn't toggle off while picker was open)
        // And check if we haven't already selected tags
        if (!hasSelectedTags.current && optimisticEval === 'good') {
            // If we haven't saved to server yet (or strictly, if this is the pending like action)
            // We just save Generic.
            submitEvaluation([], undefined);
        }
    };

    return (
        <div className="relative">
            {/* Feedback Popup */}
            {feedbackData && (
                <LearningFeedbackPopup
                    globalPreferences={feedbackData.global}
                    tagPreferences={feedbackData.tag}
                    tagName={feedbackData.tagName}
                    globalExperience={feedbackData.globalExperience}
                    tagExperience={feedbackData.tagExperience}
                    isTagLevelUp={feedbackData.isTagLevelUp}
                    isGlobalLevelUp={feedbackData.isGlobalLevelUp}
                    onClose={() => setFeedbackData(null)}
                />
            )}

            {/* Tag Picker (Toast) */}
            {showTagPicker && uid && (
                <TagPicker
                    uid={uid}
                    onSelect={handleTagSelect}
                    onClose={handlePickerClose}
                />
            )}

            {/* Heart Button */}
            <button
                onClick={handleHeartClick}
                disabled={isLoading}
                className={`p-2.5 rounded-full shadow-sm transition-all active:scale-95 flex items-center justify-center ${isLiked
                    ? 'bg-rose-50 text-rose-500 border border-rose-200'
                    : 'bg-white text-brand-black-light border border-brand-gray-dark hover:text-rose-400 hover:border-rose-200'
                    }`}
                title={isLiked ? "「気になる」から外す" : "気になる！（好みを学習）"}
            >
                <div className="relative">
                    <Heart
                        className={`w-6 h-6 transition-all ${isLiked ? "fill-current scale-110 drop-shadow-sm" : "scale-100"}`}
                        strokeWidth={isLiked ? 0 : 2}
                    />
                </div>
            </button>
        </div>
    );
}
