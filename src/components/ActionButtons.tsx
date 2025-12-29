'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types/schema';
import { useUserInteractions } from '@/hooks/useUserInteractions';
import { useUserInteractionStatus } from '@/hooks/useUserInteractionStatus';

import { Bookmark, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

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
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

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

    if (isStatusLoading || isLoading) {
        // Optional: Show loading state or just keep buttons disabled / neutral
    }

    return (
        <div className="relative">
            {/* Toast Message */}
            {showToast && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                    あなたの好みを学習しました！
                </div>
            )}

            <div className="flex items-center gap-2">
                {/* Save Button */}
                <button
                    onClick={handleSaveClick}
                    className={`p-2 rounded-full border shadow-sm transition-all active:scale-95 ${isSaved
                        ? 'bg-amber-50 border-amber-200 text-amber-500 fill-amber-500' // Filled
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                    title="保存（マイリスト）"
                >
                    <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
                </button>

                {/* Evaluation Buttons Group */}
                <div className="flex items-center rounded-full border border-slate-200 bg-white shadow-sm p-1">
                    {/* Good */}
                    <button
                        onClick={() => handleEvaluationClick('good')}
                        disabled={isLoading}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${lastEvaluation === 'good'
                            ? 'bg-rose-100 text-rose-600'
                            : 'text-slate-500 hover:bg-rose-50 hover:text-rose-500'
                            }`}
                        title="Good / 好み"
                    >
                        <ThumbsUp size={20} className={lastEvaluation === 'good' ? "fill-current" : ""} />
                    </button>

                    <div className="w-px h-6 bg-slate-200 mx-1" />

                    {/* Bad */}
                    <button
                        onClick={() => handleEvaluationClick('bad')}
                        disabled={isLoading}
                        className={`p-2 rounded-full transition-colors flex items-center justify-center ${lastEvaluation === 'bad'
                            ? 'bg-slate-200 text-slate-700'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
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
