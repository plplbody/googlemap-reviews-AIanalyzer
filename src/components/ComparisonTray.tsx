"use client";

import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { X, Scale, Trash2 } from 'lucide-react';
import { comparePlaces } from '@/server/actions/comparison';
import { VerdictModal } from '@/components/VerdictModal';

import { useAuth } from "@/contexts/AuthContext";

export function ComparisonTray() {
    const { user, signInWithGoogle } = useAuth();
    const { selectedPlaces, toggleSelection, clearSelection, currentLimit, isComparing, setIsComparing, setVerdict } = useComparison();

    const handleCompare = async () => {
        if (!user) {
            signInWithGoogle();
            return;
        }

        setIsComparing(true);
        try {
            const ids = selectedPlaces.map(p => p.id);
            // TODO: Extract user preferences if available (for now default)
            const result = await comparePlaces(ids, user?.uid);
            setVerdict(result);
        } catch (error: any) {
            console.error("Comparison failed:", error);
            alert(error.message || "比較中にエラーが発生しました");
        } finally {
            setIsComparing(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-40 py-3 bg-white backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">

                    {/* Header / Counter */}
                    <div className="hidden sm:flex flex-col">
                        <span className="text-sm font-bold text-brand-black">比較トレイ</span>
                        <span className="text-xs text-brand-black-light">{selectedPlaces.length} / {currentLimit} 選択中</span>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex-1 flex items-center gap-2 overflow-x-auto py-2 px-2 scrollbar-hide">
                        {selectedPlaces.length === 0 ? (
                            <div className="flex items-center gap-3 text-brand-black-light pl-2">
                                <span className="text-sm font-medium">店舗を選択してAI分析結果を比較しましょう。（最大3件）</span>
                            </div>
                        ) : (
                            <>
                                {selectedPlaces.map((place) => (
                                    <div key={place.id} className="relative group shrink-0 w-24 sm:w-32 bg-gray-50 rounded-md border border-gray-200 p-2 flex flex-col gap-1">
                                        <button
                                            onClick={() => toggleSelection(place)}
                                            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 z-10"
                                        >
                                            <X size={14} />
                                        </button>
                                        <div className="text-xs font-semibold truncate text-brand-black">{place.name}</div>
                                        <div className="flex items-center gap-1 text-[10px] text-brand-black">
                                            <span className="font-mono text-brand-orange-dark">{(place.trueScore && place.trueScore > 0 ? place.trueScore.toFixed(1) : place.originalRating?.toFixed(1) || "-")}</span>
                                            <span className="truncate">{place.nearestStation || "駅不明"}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Placeholder for empty slots (Only show if at least 1 item selected, to guide next selection) */}
                        {selectedPlaces.length > 0 && Array.from({ length: Math.max(0, currentLimit - selectedPlaces.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="hidden sm:flex shrink-0 w-24 sm:w-32 h-14 border-2 border-dashed border-gray-200 rounded-md items-center justify-center text-brand-black text-xs">
                                選択可
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {selectedPlaces.length > 0 && (
                            <button
                                onClick={clearSelection}
                                className="p-2 text-brand-black hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
                                title="全てクリア"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                        <button
                            onClick={handleCompare}
                            disabled={selectedPlaces.length < 2 || isComparing}
                            className={`flex items-center text-sm gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all ${selectedPlaces.length < 2
                                ? "bg-brand-gray-light text-brand-black-light cursor-not-allowed border border-brand-gray"
                                : "bg-gradient-to-r from-brand-orange-dark to-brand-orange-dark/80 text-white hover:shadowbrand/30 hover:scale-105 active:scale-95"
                                }`}
                        >
                            {isComparing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>分析中...</span>
                                </>
                            ) : (
                                <>
                                    <Scale size={18} />
                                    <span>{selectedPlaces.length < 2 ? "比較する (2件~)" : "AI比較する"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <VerdictModal />
        </>
    );
}
