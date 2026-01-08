'use client';

import { Place } from '@/types/schema';
import PlaceListItem from './PlaceListItem';
import { RefreshCw } from 'lucide-react';

interface PlaceListProps {
    places: Place[];
    onSelect: (placeId: string) => void;
    onLoadMore: () => void;
    hasMore: boolean;
    loadingMore: boolean;
    focusedAxes?: string[];
    focusedScenes?: string[];
    personalizedScores?: Record<string, { finalScore: number }>;
    onActionComplete?: () => void;
    isScoreOutdated?: boolean;
    onRecalculate?: () => void;
}

// 検索結果のリストを表示するコンポーネント
export default function PlaceList({ places, onSelect, onLoadMore, hasMore, loadingMore, focusedAxes, focusedScenes, personalizedScores, onActionComplete, isScoreOutdated, onRecalculate }: PlaceListProps) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-black mb-1">検索結果</h2>
                </div>
                {/* Manual Recalculate Button (Replaces Load More at top) */}
                {isScoreOutdated && onRecalculate && (
                    <button
                        onClick={onRecalculate}
                        className="px-6 py-2 bg-brand text-white text-sm font-bold rounded-full hover:bg-brand/90 transition-all duration-300 shadow-md flex items-center gap-2 shrink-0 animate-in fade-in zoom-in"
                    >
                        <RefreshCw className="w-4 h-4" />
                        スコア再計算
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {places.map((place) => (
                    <PlaceListItem
                        key={place.id}
                        place={place}
                        onSelect={onSelect}
                        focusedAxes={focusedAxes}
                        focusedScenes={focusedScenes}
                        personalizedScore={personalizedScores?.[place.id]?.finalScore}
                        onActionComplete={onActionComplete}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-8 pb-12">
                    <button
                        onClick={onLoadMore}
                        disabled={loadingMore}
                        className="px-8 py-3 bg-white border border-brand-gray text-brand-black/80 font-medium rounded-full hover:bg-brand-gray/20 hover:border-brand hover:text-brand transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loadingMore ? (
                            <>
                                <div className="w-4 h-4 border-2 border-brand-black/50 border-t-transparent rounded-full animate-spin" />
                                読み込み中...
                            </>
                        ) : (
                            <>
                                もっと見る
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
