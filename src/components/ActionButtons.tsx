'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types/schema';
import { useUserInteractions } from '@/hooks/useUserInteractions';
import { useUserInteractionStatus } from '@/hooks/useUserInteractionStatus';

import { Heart } from 'lucide-react';
import { ScenePicker } from './ScenePicker';

interface ActionButtonsProps {
    place: Place;
    uid?: string;
    onActionComplete?: () => void;
}

export function ActionButtons({ place, uid, onActionComplete }: ActionButtonsProps) {
    const { evaluate, isLoading } = useUserInteractions(uid || '', place.id);
    const { interaction, loading: isStatusLoading } = useUserInteractionStatus(uid || '', place.id);

    // Sync with DB state, but allow local override for optimistic UI
    // We treat "Good" evaluation as the source of truth for "Liked/Saved"
    const [optimisticEval, setOptimisticEval] = useState<'good' | 'bad' | null | undefined>(undefined);

    // Derived state
    const lastEvaluation = optimisticEval !== undefined ? optimisticEval : (interaction?.evaluation?.type || null);
    const isLiked = lastEvaluation === 'good';

    const [showScenePicker, setShowScenePicker] = useState(false);

    const handleHeartClick = async () => {
        if (!uid) {
            alert('ログインが必要です');
            return;
        }

        const nextState = !isLiked;

        // Optimistic Update
        setOptimisticEval(nextState ? 'good' : null);

        if (nextState) {
            // Liked
            setShowScenePicker(true);
        }

        try {
            if (nextState) {
                // Apply Good
                await evaluate({
                    type: 'good',
                    timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
                    selectedFeatureKeys: [],
                    negativeFeedback: undefined
                });
            } else {
                // Remove (Ungood)
                // @ts-ignore
                await evaluate(null);
            }
            onActionComplete?.();
        } catch (e) {
            setOptimisticEval(isLiked ? 'good' : null); // Revert
            console.error(e);
        }
    };

    // Reset optimistic state when server state updates
    useEffect(() => {
        if (interaction !== undefined) {
            setOptimisticEval(undefined);
        }
    }, [interaction]);

    const handleSceneSelect = async (scenarioIds: string[]) => {
        try {
            await evaluate({
                type: 'good',
                timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
                selectedFeatureKeys: [],
                negativeFeedback: undefined
            }, scenarioIds, true);
        } catch (e) {
            console.error("Failed to update scenario", e);
        }
    };

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
