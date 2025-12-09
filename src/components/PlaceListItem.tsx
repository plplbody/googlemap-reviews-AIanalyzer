'use client';

import { Place } from '@/types/schema';
import { Star, MapPin, ChevronRight, Loader2 } from 'lucide-react';

interface PlaceListItemProps {
    place: Place;
    onSelect: (placeId: string) => void;
    focusedAxes?: string[];
}

export default function PlaceListItem({ place, onSelect, focusedAxes = [] }: PlaceListItemProps) {
    const isAnalyzed = place.status === 'completed' && place.trueScore !== undefined;
    const isAnalyzing = place.status === 'pending' || place.status === 'processing';

    // Personalized Score Calculation
    const calculatePersonalizedScore = () => {
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

        // Standard Axes (Taste, Service, Atmosphere, Cost)
        ['taste', 'service', 'atmosphere', 'cost'].forEach(axis => {
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });

        return totalScore / totalWeight;
    };

    const yourScore = calculatePersonalizedScore();

    return (
        <div
            onClick={() => onSelect(place.id)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 cursor-pointer group flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 flex-grow pr-2">
                    {place.name}
                </h3>
                <div className="flex flex-col items-end shrink-0 ml-2">
                    <div className="text-xs text-slate-400 font-bold mb-0.5">Google Map Score</div>
                    <div className="flex items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold text-slate-700">{place.originalRating?.toFixed(1) || '0.0'}</span>
                        <span className="text-xs text-slate-400 ml-1">({place.userRatingsTotal || 0})</span>
                    </div>
                </div>
            </div>

            {/* AI Analysis Score Badge */}
            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                {isAnalyzed ? (
                    <div className="flex flex-col gap-3">
                        {/* Personalized Score Display (Prominent if active) */}
                        {yourScore ? (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <span className="text-base font-bold text-[#E65100] block mb-1">あなたへのマッチ度</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-black text-[#E65100]">
                                                {yourScore.toFixed(1)}
                                            </span>
                                            <div className="flex text-orange-500">
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
                                        <span className="text-xs font-bold text-slate-400 block">AI分析スコア</span>
                                        <span className="text-lg font-bold text-slate-500">{place.trueScore?.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Standard AI Score Only
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-base font-bold text-[#E65100] block mb-1">AI分析スコア</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-[#E65100]">
                                            {place.trueScore?.toFixed(1)}
                                        </span>
                                        <div className="flex text-orange-500">
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
                            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-200">
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
                                            <div className={`text-[10px] mb-0.5 ${isFocused ? 'text-[#E65100] font-bold' : 'text-slate-400'}`}>
                                                {axis.l}
                                            </div>
                                            <div className={`text-sm font-bold ${isFocused ? 'text-[#E65100]' : 'text-slate-600'}`}>
                                                {score.toFixed(1)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : isAnalyzing ? (
                    <div className="flex items-center justify-center py-4 gap-2 text-[#E65100]">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-bold">AI分析中...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-4 text-slate-400 text-sm">
                        分析待ち
                    </div>
                )}
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-50">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1 max-w-[150px]">{place.address}</span>
                </div>
                <div className="flex items-center gap-1 text-[#E65100] font-medium group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                </div>
            </div>
        </div>
    );
}
