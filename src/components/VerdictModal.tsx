"use client";

import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { Place } from '@/types/schema';
import { X, Crown, Trophy, Quote, ThumbsUp, ThumbsDown, Utensils, Heart, Sparkles, TrendingUp, Scale } from 'lucide-react';

export function VerdictModal() {
    const { verdict, setVerdict, selectedPlaces } = useComparison();

    if (!verdict) return null;

    // Sort places by match score (Descending)
    const sortedPlaces = [...selectedPlaces].sort((a, b) => {
        const scoreA = verdict.scores?.[a.id] || 0;
        const scoreB = verdict.scores?.[b.id] || 0;
        return scoreB - scoreA;
    });

    const winner = selectedPlaces.find(p => p.id === verdict.winnerId) || sortedPlaces[0];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Close Button */}
                <button
                    onClick={() => setVerdict(null)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-gray-100 text-gray-500 transition-colors z-50 shadow-sm border border-gray-100"
                >
                    <X size={20} />
                </button>

                <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200">
                    {/* Header: Winner Banner */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 pt-8 text-center border-b border-brand-orange-dark/10 relative overflow-hidden shrink-0">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange-dark to-amber-500" />

                        <div className="inline-flex items-center px-4 py-1.5 bg-brand-orange-dark text-white rounded-full text-sm font-bold mb-4 shadow-sm border border-brand-orange-dark/20">
                            <Trophy size={14} className="fill-brand-orange-dark text-brand-orange-dark" />
                            あなたとのマッチ度 No.1
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-brand-black-dark mb-2 flex flex-col md:flex-row items-center justify-center gap-3">
                            <Crown className="w-10 h-10 text-brand-orange-dark fill-brand-orange-dark drop-shadow-sm" />
                            <span className="border-b-4 border-brand-orange-dark/20 decoration-none">{winner.name}</span>
                        </h2>

                        <div className="max-w-2xl mx-auto mt-6 relative">
                            <p className="text-lg text-brand-orange-dark font-bold leading-relaxed">
                                {verdict.reason}
                            </p>
                        </div>

                        <p className="text-xs text-brand-black text-center my-3">
                            💡 評価(Good/Bad)でAI精度UP
                        </p>
                    </div>

                    {/* Body: Comparison Matrix */}
                    <div className="flex-1 overflow-auto p-6 md:p-8 bg-white scrollbar-thin scrollbar-thumb-gray-200">
                        {/* ... existing matrix ... */}
                        <div className="flex-1 overflow-auto p-0 bg-white">
                            {/* Keep existing table logic but remove outer padding if needed or keep consistent */}
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-brand-orange-dark rounded-full" />
                                詳細比較
                            </h3>
                            {/* ... table ... */}
                            <div className="overflow-x-auto pb-4">
                                <table className="w-full min-w-[600px] border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="w-32 p-4 text-left font-bold text-gray-400 text-xs uppercase tracking-wider bg-gray-50 rounded-tl-xl border-b border-gray-100">観点</th>
                                            {sortedPlaces.map(place => (
                                                <th key={place.id} className={`p-4 text-left font-bold text-gray-800 border-b border-gray-100 w-1/${selectedPlaces.length} min-w-[200px] ${place.id === verdict.winnerId ? 'bg-brand-orange-dark/5' : ''}`}>
                                                    <div className="flex items-center gap-2">
                                                        {place.id === verdict.winnerId && <Crown size={16} className="text-brand-orange-dark fill-brand-orange-dark" />}
                                                        {place.name}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {/* Row 1: Match Score (Added) */}
                                        <tr>
                                            <td className="p-4 align-middle bg-gray-50/50 border-r border-gray-100">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-bold text-brand-orange-dark">マッチ度</span>
                                                    <div className="p-1.5 rounded-lg bg-white w-fit shadow-sm text-brand-orange-dark">
                                                        <Scale size={18} />
                                                    </div>
                                                </div>
                                            </td>
                                            {sortedPlaces.map(place => {
                                                const score = verdict.scores?.[place.id] ?? 0;
                                                const isWinner = place.id === verdict.winnerId;
                                                return (
                                                    <td key={place.id} className={`p-4 align-middle ${isWinner ? 'bg-orange-50/30' : ''}`}>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className={`text-3xl font-black tabular-nums ${isWinner ? 'text-brand-orange-dark' : 'text-brand-black'}`}>
                                                                {score}
                                                            </span>
                                                            <span className="text-sm font-bold text-brand-black-light">%</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>

                                        {/* Dynamic Rows from Verdict Matrix */}
                                        {[
                                            { k: 'taste', l: '味', icon: Utensils, color: 'text-rose-500' },
                                            { k: 'service', l: '接客', icon: Heart, color: 'text-pink-500' },
                                            { k: 'atmosphere', l: '雰囲気', icon: Sparkles, color: 'text-amber-500' },
                                            { k: 'cost', l: 'コスパ', icon: TrendingUp, color: 'text-emerald-500' },
                                        ].map((row) => (
                                            <tr key={row.k} className="group hover:bg-brand-gray-light transition-colors">
                                                <td className="p-4 align-top bg-gray-50/50 border-r border-gray-100 group-hover:brand-gray-light transition-colors">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-bold text-gray-700">{row.l}</span>
                                                        <div className={`p-1.5 rounded-lg bg-white w-fit shadow-sm ${row.color}`}>
                                                            <row.icon size={18} />
                                                        </div>
                                                    </div>
                                                </td>
                                                {sortedPlaces.map(place => {
                                                    const data = verdict.matrix[place.id]?.[row.k as 'taste' | 'service' | 'atmosphere' | 'cost'];
                                                    const score = data?.score || "-";
                                                    const pros = data?.pros || [];
                                                    const cons = data?.cons || [];

                                                    return (
                                                        <td key={place.id} className={`p-4 align-top text-sm text-gray-700 leading-relaxed ${place.id === verdict.winnerId ? 'bg-orange-50/30' : ''}`}>
                                                            <div className="flex flex-col gap-3">
                                                                {/* Score Badge */}
                                                                <div className="text-2xl font-black text-brand-black-dark tabular-nums">
                                                                    {score}
                                                                    <span className="text-base font-normal text-brand-black-light ml-1">/5.0</span>
                                                                </div>

                                                                {/* Pros */}
                                                                {pros.length > 0 && (
                                                                    <div className="space-y-1">
                                                                        {pros.map((p, i) => (
                                                                            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700 bg-emerald-50/80 px-2 py-1 rounded">
                                                                                <ThumbsUp size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                                                                                <span>{p}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Cons */}
                                                                {cons.length > 0 && (
                                                                    <div className="space-y-1">
                                                                        {cons.map((c, i) => (
                                                                            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 bg-red-50/80 px-2 py-1 rounded">
                                                                                <ThumbsDown size={12} className="text-red-500 mt-0.5 shrink-0" />
                                                                                <span>{c}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {(pros.length === 0 && cons.length === 0) && (
                                                                    <span className="text-xs text-gray-400 italic">特筆事項なし</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
