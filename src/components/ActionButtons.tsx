'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types/schema';
import { useUserInteractions } from '@/hooks/useUserInteractions';
import { useUserInteractionStatus } from '@/hooks/useUserInteractionStatus';

import { Bookmark, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { ScenePicker } from './ScenePicker';

interface ActionButtonsProps {
    place: Place;
    uid?: string;
    onActionComplete?: () => void;
}

export function ActionButtons({ place, uid, onActionComplete }: ActionButtonsProps) {
    const { toggleSave, evaluate, isLoading } = useUserInteractions(uid || '', place.id);
    const { interaction, loading: isStatusLoading } = useUserInteractionStatus(uid || '', place.id);

    // Sync with DB state, but allow local override for optimistic UI
    const [optimisticSaved, setOptimisticSaved] = useState<boolean | null>(null);
    const [optimisticEval, setOptimisticEval] = useState<'good' | 'bad' | null | undefined>(undefined);

    // Derived state: Local > Server > Default
    const isSaved = optimisticSaved !== null ? optimisticSaved : (interaction?.isSaved || false);
    const lastEvaluation = optimisticEval !== undefined ? optimisticEval : (interaction?.evaluation?.type || null);



    // Toast State
    const [showToast, setShowToast] = useState(false);
    const [showScenePicker, setShowScenePicker] = useState(false);

    const handleSaveClick = async () => {
        if (!uid) {
            alert('ログインが必要です');
            return;
        }

        // Optimistic Update
        const nextState = !isSaved;
        setOptimisticSaved(nextState);

        try {
            await toggleSave(isSaved); // Pass OLD state as per hook contract
            onActionComplete?.();
        } catch (e) {
            // Revert on error
            setOptimisticSaved(!nextState);
            console.error(e);
        }
    };

    const handleEvaluationClick = async (type: 'good' | 'bad') => {
        if (!uid) {
            alert('ログインが必要です');
            return;
        }

        // Toggle Logic
        if (lastEvaluation === type) {
            // Remove evaluation
            setOptimisticEval(null);
            try {
                // @ts-ignore
                await evaluate(null);
                onActionComplete?.();
            } catch (e) {
                setOptimisticEval(type); // Revert
                console.error(e);
            }
            return;
        }

        // Apply Evaluation (Good or Bad) directly
        setOptimisticEval(type);
        if (type === 'good') {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setShowScenePicker(true);
        }

        try {
            await evaluate({
                type: type,
                timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
                selectedFeatureKeys: [], // No longer using feature selection
                negativeFeedback: undefined
            });
            onActionComplete?.();
        } catch (e) {
            setOptimisticEval(undefined);
            console.error(e);
        }
    };

    // Reset optimistic state when server state updates
    useEffect(() => {
        if (interaction !== undefined) {
            setOptimisticSaved(null);
            setOptimisticEval(undefined);
        }
    }, [interaction]);

    const handleSceneSelect = async (scenarioIds: string[]) => {
        try {
            // Second pass: Apply to specific scenarios, skipping global
            await evaluate({
                type: 'good',
                timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
                selectedFeatureKeys: [],
                negativeFeedback: undefined
            }, scenarioIds, true);
            // Re-trigger toast for feedback
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (e) {
            console.error("Failed to update scenario", e);
        }
    };

    if (isStatusLoading || isLoading) {
        // Optional: Show loading state or just keep buttons disabled / neutral
    }

    return (
        <div className="relative">
            {/* Scene Picker */}
            {showScenePicker && uid && (
                <ScenePicker
                    uid={uid}
                    onSelect={handleSceneSelect}
                    onClose={() => setShowScenePicker(false)}
                />
            )}

            {/* Toast Message */}
            {showToast && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap px-4 py-2 bg-brand-black-dark text-white text-xs font-bold rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                    あなたの好みを学習しました！
                </div>
            )}

            <div className="flex items-center gap-2">
                {/* Save Button */}
                <button
                    onClick={handleSaveClick}
                    className={`p-2 rounded-full border shadow-sm transition-all active:scale-95 ${isSaved
                        ? 'hover:bg-orange-100 border-orange-100 text-brand-orange' // Filled
                        : 'bg-white border-brand-gray text-brand-black hover:bg-orange-100 hover:text-brand-orange'
                        }`}
                    title="保存（マイリスト）"
                >
                    <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
                </button>

                {/* Evaluation Buttons Group */}
                <div className="flex items-center rounded-full border border-brand-gray bg-white shadow-sm p-1">
                    {/* Good */}
                    <button
                        onClick={() => handleEvaluationClick('good')}
                        disabled={isLoading}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${lastEvaluation === 'good'
                            ? 'hover:bg-orange-100 border-orange-100 text-brand-orange'
                            : 'bg-white text-brand-black hover:bg-orange-100 hover:text-brand-orange'
                            }`}
                        title="Good / 好み"
                    >
                        <ThumbsUp size={20} className={lastEvaluation === 'good' ? "fill-current" : ""} />
                    </button>

                    <div className="w-px h-6 bg-brand-gray mx-1" />

                    {/* Bad */}
                    <button
                        onClick={() => handleEvaluationClick('bad')}
                        disabled={isLoading}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${lastEvaluation === 'bad'
                            ? 'hover:bg-brand-gray text-brand-black-dark'
                            : 'text-brand-black hover:bg-brand-gray hover:text-brand-black-dark'
                            }`}
                        title="Bad / 合わない"
                    >
                        <ThumbsDown size={20} className={lastEvaluation === 'bad' ? "fill-current" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
}
