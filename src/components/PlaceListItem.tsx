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

    // Personalized Score Calculation
    const calculatePersonalizedScore = () => {
        // ... (省略) ...
        // Only calculate personalized score if AXES are selected. Scenarios are now filters only.
        if (!place.axisScores || focusedAxes.length === 0) return null;

        const scores = place.axisScores;
        let totalScore = 0;
        let totalWeight = 0;

        const axesMap: Record<string, number> = {
            'taste': scores.taste,
            'service': scores.service,
            'atmosphere': scores.atmosphere,
            'cost': scores.cost
        };

        // Standard Axes (Always included: Weight 1 or 3)
        ['taste', 'service', 'atmosphere', 'cost'].forEach(axis => {
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });

        return totalScore / totalWeight;
    };

    const yourScore = props.personalizedScore ?? calculatePersonalizedScore();

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
                    <div className="flex justify-between items-start">
                        <div className="pr-16">
                            <h3 className="text-xl font-bold text-brand-black-dark group-hover:text-brand-orange-dark transition-colors line-clamp-2 md:line-clamp-1 mb-1">
                                {place.name}
                            </h3>
                            {/* Price & Station Info */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-black font-medium">
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
                                                case 'PRICE_LEVEL_INEXPENSIVE': return '〜1,000円';
                                                case 'PRICE_LEVEL_MODERATE': return '1,000円〜3,000円';
                                                case 'PRICE_LEVEL_EXPENSIVE': return '3,000円〜10,000円';
                                                case 'PRICE_LEVEL_VERY_EXPENSIVE': return '10,000円〜';
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
                    {/* Google Badge */}
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center bg-brand-gray-light px-2 py-1 rounded-lg border border-brand-gray">
                            <div className="text-[10px] text-brand-black-light font-bold mr-1 tracking-wide">Google</div>
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-bold text-brand-black text-sm">{place.originalRating?.toFixed(1) || '0.0'}</span>
                            <span className="text-[10px] text-brand-black-light ml-1">({place.userRatingsTotal || 0})</span>
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
                        {yourScore !== null && yourScore >= 0 ? (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <span className="text-base font-bold text-brand-orange-dark block mb-1">あなたとのマッチ度</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-black text-brand-orange-dark">
                                                {yourScore.toFixed(1)}
                                            </span>
                                            <div className="flex text-brand-orange-dark">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.round(yourScore) ? 'fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Standard AI Score (Secondary) */}
                                    <div className="text-right opacity-75">
                                        <span className="text-xs font-bold text-brand-black-light block">AI分析スコア</span>
                                        <span className="text-lg font-bold text-brand-black">{place.trueScore?.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Standard AI Score Only
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-base font-bold text-brand-orange-dark block mb-1">AI分析スコア</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black text-brand-orange-dark">
                                            {place.trueScore?.toFixed(1)}
                                        </span>
                                        <div className="flex text-brand-orange-dark">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.round(place.trueScore || 0) ? 'fill-current' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                            <div className={`text-[10px] mb-0.5 ${isFocused ? 'text-brand-orange-dark font-bold' : 'text-brand-black-light'}`}>
                                                {axis.l}
                                            </div>
                                            <div className={`text-sm font-bold ${isFocused ? 'text-brand-orange-dark' : 'text-brand-black'}`}>
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
                                    <div key={i} className="flex items-start gap-2 text-xs text-brand-black">
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
                        <span className="text-sm font-bold">AI分析中...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-4 text-brand-black-light text-sm">
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
