'use client';

import { Place } from '@/types/schema';
import { Star, MapPin, ChevronRight, Loader2, Train, Scale, DollarSign, Sparkles } from 'lucide-react';
import { PlaceBadges } from '@/components/PlaceBadges';
import { updateStationInfo } from '@/server/actions/station';
import { useEffect, useState } from 'react';
import { ActionButtons } from '@/components/ActionButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useComparison } from '@/contexts/ComparisonContext';

interface PlaceListItemProps {
    place: Place;
    onSelect: (placeId: string) => void;
    focusedAxes?: string[];
    focusedScenes?: string[];
    personalizedScore?: number;
    onActionComplete?: () => void;
}

export default function PlaceListItem({ place, onSelect, focusedAxes = [], focusedScenes = [], onActionComplete, ...props }: PlaceListItemProps) {
    const { user } = useAuth();
    const { selectedPlaces, toggleSelection } = useComparison();

    // Check if selected
    const isSelected = selectedPlaces.some(p => p.id === place.id);

    const isAnalyzed = place.status === 'completed' && place.trueScore !== undefined;
    const isAnalyzing = place.status === 'pending' || place.status === 'processing';

    // Unified Score (AI Score OR Personalized Score)
    const yourScore = props.personalizedScore ?? 0;

    // Async trigger for station info
    useEffect(() => {
        if (!place.id || !place.location || place.nearestStation !== undefined) return;
        updateStationInfo(place.id, place.location.lat, place.location.lng);
    }, [place.id, place.location, place.nearestStation]);

    return (
        <div
            onClick={() => onSelect(place.id)}
            className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border transition-all duration-300 cursor-pointer group flex flex-col h-full select-none active:scale-[0.98] active:bg-brand-gray-light relative ${isSelected ? 'border-brand-orange-dark ring-1 ring-brand-orange-dark' : 'border-brand-gray'}`}
        >
            {/* Image & Header Section */}
            <div className="flex gap-4 mb-4">
                {place.hotpepper?.imageUrl ? (
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-brand-gray">
                        <img
                            src={place.hotpepper.imageUrl}
                            alt={place.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                ) : (
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-brand-gray bg-brand-gray-light flex flex-col items-center justify-center text-brand-black-light">
                        <span className="text-[10px] font-bold">No Image</span>
                    </div>
                )}
                <div className="flex-grow min-w-0">
                    <div className="pr-16 flex flex-col gap-1">
                        <h3 className="text-type-subtitle font-bold text-brand-black-dark group-hover:text-brand-orange-dark transition-colors line-clamp-2 md:line-clamp-1 mb-1">
                            {place.name}
                        </h3>
                        {/* Price & Station Info */}
                        <div className="flex flex-col  gap-y-1 text-type-memo text-brand-black">
                            <div className="flex items-center gap-1">
                                <span>
                                    {(() => {
                                        if (place.priceRange?.startPrice || place.priceRange?.endPrice) {
                                            const s = place.priceRange.startPrice?.units;
                                            const e = place.priceRange.endPrice?.units;
                                            return `${s ? '¥' + Number(s).toLocaleString() : ''}〜${e ? '¥' + Number(e).toLocaleString() : ''}`;
                                        }
                                        switch (place.priceLevel) {
                                            case 'PRICE_LEVEL_FREE': return '無料';
                                            case 'PRICE_LEVEL_INEXPENSIVE': return '〜¥1,000';
                                            case 'PRICE_LEVEL_MODERATE': return '¥1,000〜¥3,000';
                                            case 'PRICE_LEVEL_EXPENSIVE': return '¥3,000〜¥10,000';
                                            case 'PRICE_LEVEL_VERY_EXPENSIVE': return '¥10,000〜';
                                            default: return '予算不明';
                                        }
                                    })()}
                                </span>
                            </div>
                            {place.nearestStation && (
                                <div className="flex items-center gap-1">
                                    <Train className="w-3.5 h-3.5" />
                                    <span>{place.nearestStation}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="mb-3">
                <PlaceBadges place={place} />
            </div>

            {/* AI Analysis Score Badge */}
            <div className="mb-4 p-4 bg-brand-gray-light rounded-xl border border-brand-gray relative overflow-hidden">
                {isAnalyzed ? (
                    <div className="flex flex-col gap-3">
                        {/* Personalized Score Display (Prominent if active) */}
                        {/* Unified Score Display Row */}
                        <div className="flex justify-between">
                            {/* AI Score (Left - Prominent) */}
                            <div>
                                <span className="text-type-body font-bold block mb-1 text-brand-orange-dark">AI分析スコア</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-type-subtitle text-brand-orange-dark">
                                        {yourScore?.toFixed(1) || '0.0'}
                                    </span>
                                    <div className="pt-1 flex text-brand-orange-dark">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.round(yourScore || 0) ? 'fill-current' : 'text-brand-gray-dark'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Google Score (Right) */}
                            <div>
                                <span className="text-type-memo block mb-1 text-brand-black-light font-semibold">Google評価</span>
                                <div className="flex  gap-2">
                                    <span className="text-type-memo  tabular-nums text-brand-black-light font-semibold">
                                        {place.originalRating?.toFixed(1) || '0.0'}
                                    </span>
                                    <div className="pt-[1px] flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-type-memo text-brand-black-light">({place.userRatingsTotal.toLocaleString()})</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Axis Scores */}
                        {place.axisScores && (
                            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-brand-gray">
                                {[
                                    { k: 'taste', l: '味' },
                                    { k: 'service', l: '接客' },
                                    { k: 'atmosphere', l: '雰囲気' },
                                    { k: 'cost', l: 'コスパ' }
                                ].map((axis) => {
                                    const isFocused = focusedAxes.includes(axis.k);
                                    const score = place.axisScores?.[axis.k as keyof typeof place.axisScores] || 0;
                                    return (
                                        <div key={axis.k} className="text-center">
                                            <div className={`text-type-memo text-xs mb-0.5 ${isFocused ? 'text-brand-orange-dark font-semibold' : 'text-brand-black'}`}>
                                                {axis.l}
                                            </div>
                                            <div className={`text-type-memo font-semibold ${isFocused ? 'text-brand-orange-dark' : 'text-brand-black'}`}>
                                                {score.toFixed(1)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* AI Summary */}
                        {place.summary && (
                            <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-brand-gray-light">
                                {(Array.isArray(place.summary) ? place.summary : (place.summary as unknown as string).split('\n')).filter((line: string) => line.trim()).map((line: string, i: number) => (
                                    <div key={i} className="flex items-start gap-2 text-type-memo text-brand-black">
                                        <Sparkles className="w-3 h-3 text-brand-orange-dark shrink-0 mt-0.5" />
                                        <span className="leading-relaxed">{line}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : isAnalyzing ? (
                    <div className="flex items-center justify-center py-4 gap-2 text-brand-orange-dark">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-type-body font-semibold">AI分析中...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-4 text-brand-black-light text-type-body font-semibold">
                        分析待ち
                    </div>
                )}
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-brand-black-light border-t border-brand-gray-light">
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {/* Compare Toggle */}
                    <button
                        onClick={() => toggleSelection(place)}
                        className={`relative rounded-full text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md group ${isSelected
                            ? 'bg-brand-orange-dark text-white px-3 py-1.5 border border-brand-orange-dark'
                            : 'p-[1.5px] bg-gradient-to-r from-brand-orange via-rose-300 to-brand-orange hover:from-brand-orange-dark hover:via-rose-400 hover:to-brand-orange-dark'
                            }`}
                    >
                        {isSelected ? (
                            <div className="flex items-center gap-1.5">
                                <Scale className="w-3.5 h-3.5" />
                                <span>選択済み</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full transition-colors w-full h-full">
                                <Scale className="w-3.5 h-3.5 text-brand-orange-dark" />
                                <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">トレイに追加</span>
                            </div>
                        )}
                    </button>

                    {/* Action Buttons */}
                    <div className="scale-90 origin-left">
                        <ActionButtons place={place} uid={user?.uid} onActionComplete={onActionComplete} />
                    </div>
                </div>

                <div className="flex items-center gap-1 text-brand-orange-dark font-medium group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                </div>
            </div>
        </div>
    );
}
