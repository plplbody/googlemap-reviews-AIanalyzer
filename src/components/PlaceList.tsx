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
}

// 検索結果のリストを表示するコンポーネント
export default function PlaceList({ places, onSelect, onLoadMore, hasMore, loadingMore, focusedAxes }: PlaceListProps) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-1">検索結果</h2>
                <p className="text-sm text-slate-500">
                    検索キーワードに関連度の高い上位20件を表示しています
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {places.map((place) => (
                    <PlaceListItem
                        key={place.id}
                        place={place}
                        onSelect={onSelect}
                        focusedAxes={focusedAxes}
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
