'use client';

import { Place } from '@/types/schema';
import { Star, MapPin, ChevronRight, Loader2, Train } from 'lucide-react';
import { PlaceBadges } from '@/components/PlaceBadges';
import { updateStationInfo } from '@/server/actions/station';
import { useEffect, useState } from 'react';

interface PlaceListItemProps {
    place: Place;
    onSelect: (placeId: string) => void;
    focusedAxes?: string[];
    focusedScenes?: string[];
}

export default function PlaceListItem({ place, onSelect, focusedAxes = [], focusedScenes = [] }: PlaceListItemProps) {
    const isAnalyzed = place.status === 'completed' && place.trueScore !== undefined;
    const isAnalyzing = place.status === 'pending' || place.status === 'processing';

    // Personalized Score Calculation
    const calculatePersonalizedScore = () => {
        if (!place.axisScores || (focusedAxes.length === 0 && focusedScenes.length === 0)) return null;

        const scores = place.axisScores;
        const usage = place.usageScores || {};
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

        // Usage Scenarios (Included ONLY if focused: Weight 3)
        // If not focused, we don't include them to avoid diluting the score with irrelevant scenarios
        ['business', 'date', 'solo', 'family', 'group'].forEach(scene => {
            if (focusedScenes.includes(scene)) {
                // usageScores might be missing or partial
                const score = usage[scene as keyof typeof usage] || 0;
                const weight = 3;
                totalScore += score * weight;
                totalWeight += weight;
            }
        });

        return totalScore / totalWeight;
    };

    const yourScore = calculatePersonalizedScore();

    // Async trigger for station info
    useEffect(() => {
        if (!place.id || !place.location || place.nearestStation !== undefined) return;

        // Trigger server action (fire and forget, Firestore listener will update UI)
        // Check local storage or session to avoid spamming if implemented, but here relying on place.nearestStation check
        // Note: nearestStation undefined means not checked. If null/empty logic handled in server action (we might want a flag to prevent loops)
        // For now, simple check.
        updateStationInfo(place.id, place.location.lat, place.location.lng);
    }, [place.id, place.location, place.nearestStation]);

    return (
        <div
            onClick={() => onSelect(place.id)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 cursor-pointer group flex flex-col h-full select-none active:scale-[0.98] active:bg-slate-50"
        >
            {/* Image & Header Section */}
            <div className="flex gap-4 mb-4">
                {place.hotpepper?.imageUrl && (
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-slate-100">
                        <img
                            src={place.hotpepper.imageUrl}
                            alt={place.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
                <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 md:line-clamp-1 mb-1">
                                {place.name}
                            </h3>
                        </div>
                        <div className="flex flex-col items-end shrink-0 ml-2">
                            <div className="text-[10px] text-slate-400 font-bold mb-0.5 tracking-wide">GOOGLE</div>
                            <div className="flex items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-bold text-slate-700 text-sm">{place.originalRating?.toFixed(1) || '0.0'}</span>
                                <span className="text-[10px] text-slate-400 ml-1">({place.userRatingsTotal || 0})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="mb-3">
                <PlaceBadges place={place} />
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
                    {place.nearestStation ? (
                        <>
                            <Train className="w-3 h-3 text-[#E65100]" />
                            <span className="line-clamp-1 max-w-[150px] font-medium text-slate-600">{place.nearestStation}</span>
                        </>
                    ) : (
                        <>
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1 max-w-[150px]">{place.address}</span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-1 text-[#E65100] font-medium group-hover:translate-x-1 transition-transform">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                </div>
            </div>
            {place.hotpepper && (
                <div className="text-[10px] text-slate-300 text-right pr-1 pt-1">
                    Powered by HotPepper
                </div>
            )}
        </div>
    );
}
