import { Place } from '@/types/schema';
import { DollarSign, Briefcase, Heart, User, Users, Award } from 'lucide-react';

export function PlaceBadges({ place }: { place: Place }) {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {(() => {
                // 1. Try Price Range
                if (place.priceRange) {
                    const start = place.priceRange.startPrice?.units;
                    const end = place.priceRange.endPrice?.units;
                    if (start || end) {
                        const label = `${start ? '¥' + Number(start).toLocaleString() : ''} ~ ${end ? '¥' + Number(end).toLocaleString() : ''}`;

                        let color = 'bg-slate-500 text-white shadow-sm';
                        let prefix = '';
                        const price = Number(start || end || 0);

                        if (price >= 10000) {
                            color = 'bg-rose-600 text-white shadow-sm shadow-rose-200';
                            prefix = '最高級';
                        } else if (price >= 3000) {
                            color = 'bg-orange-500 text-white shadow-sm shadow-orange-200';
                            prefix = '高級';
                        } else if (price >= 1000) {
                            color = 'bg-blue-500 text-white shadow-sm shadow-blue-200';
                            prefix = '標準';
                        } else {
                            color = 'bg-emerald-500 text-white shadow-sm shadow-emerald-200';
                            prefix = 'お手頃';
                        }

                        return (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border ${color}`}>
                                <DollarSign className="w-3 h-3" />
                                <span>{prefix} ({label})</span>
                            </div>
                        );
                    }
                }

                // 2. Try Price Level
                const info = getPriceLevelInfo(place.priceLevel);
                if (info) {
                    return (
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border ${info.color}`}>
                            <DollarSign className="w-3 h-3" />
                            <span>{info.label}</span>
                        </div>
                    );
                }

                // 3. Fallback: Unknown
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border bg-slate-100 text-slate-500 border-slate-200">
                        <DollarSign className="w-3 h-3" />
                        <span>予算: 不明</span>
                    </div>
                );
            })()}
            {place.usageScores?.business && place.usageScores.business >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold tracking-wide shadow-sm">
                    <Briefcase className="w-3 h-3 text-slate-500" />
                    <span>ビジネス</span>
                </div>
            )}
            {place.usageScores?.date && place.usageScores.date >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold tracking-wide shadow-sm">
                    <Heart className="w-3 h-3 text-slate-500 fill-slate-500" />
                    <span>デート</span>
                </div>
            )}
            {place.usageScores?.solo && place.usageScores.solo >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold tracking-wide shadow-sm">
                    <User className="w-3 h-3 text-slate-500" />
                    <span>お一人様</span>
                </div>
            )}
            {place.usageScores?.family && place.usageScores.family >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold tracking-wide shadow-sm">
                    <Users className="w-3 h-3 text-slate-500" />
                    <span>ファミリー</span>
                </div>
            )}
        </div>
    );
}

function getPriceLevelInfo(level: string | undefined) {
    switch (level) {
        case 'PRICE_LEVEL_FREE': return { label: '無料', color: 'bg-slate-500 text-white shadow-sm' };
        case 'PRICE_LEVEL_INEXPENSIVE': return { label: 'お手頃 (~1,000円)', color: 'bg-emerald-500 text-white shadow-sm shadow-emerald-200' };
        case 'PRICE_LEVEL_MODERATE': return { label: '標準 (1,000円~3,000円)', color: 'bg-blue-500 text-white shadow-sm shadow-blue-200' };
        case 'PRICE_LEVEL_EXPENSIVE': return { label: '高級 (3,000円~10,000円)', color: 'bg-orange-500 text-white shadow-sm shadow-orange-200' };
        case 'PRICE_LEVEL_VERY_EXPENSIVE': return { label: '最高級 (10,000円~)', color: 'bg-rose-600 text-white shadow-sm shadow-rose-200' };
        default: return null;
    }
}
