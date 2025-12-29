'use client';

import { Place } from '@/types/schema';
import PlaceListItem from './PlaceListItem';

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
}

// 検索結果のリストを表示するコンポーネント
export default function PlaceList({ places, onSelect, onLoadMore, hasMore, loadingMore, focusedAxes, focusedScenes, personalizedScores, onActionComplete }: PlaceListProps) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">検索結果</h2>
                </div>
                {hasMore && (
                    <button
                        onClick={onLoadMore}
                        disabled={loadingMore}
                        className="px-6 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-full hover:bg-slate-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                    >
                        {loadingMore ? (
                            <>
                                <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                読み込み中...
                            </>
                        ) : (
                            <>
                                もっと見る
                            </>
                        )}
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
                        className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-full hover:bg-slate-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loadingMore ? (
                            <>
                                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
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
