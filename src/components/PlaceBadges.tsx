import { Place } from '@/types/schema';
import { Briefcase, Heart, User, Users } from 'lucide-react';

export function PlaceBadges({ place }: { place: Place }) {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {/* Usage Scenarios */}
            {place.usageScores?.solo && place.usageScores.solo >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray text-brand-black/80 border border-brand-gray text-xs font-bold tracking-wide shadow-sm">
                    <User className="w-3 h-3 text-brand-black/80" />
                    <span>お一人様</span>
                </div>
            )}
            {place.usageScores?.date && place.usageScores.date >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray text-brand-black/80 border border-brand-gray text-xs font-bold tracking-wide shadow-sm">
                    <Heart className="w-3 h-3 text-brand-black/80 fill-brand-black/80" />
                    <span>デート</span>
                </div>
            )}
            {place.usageScores?.business && place.usageScores.business >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray text-brand-black/80 border border-brand-gray text-xs font-bold tracking-wide shadow-sm">
                    <Briefcase className="w-3 h-3 text-brand-black/80" />
                    <span>ビジネス</span>
                </div>
            )}
            {place.usageScores?.family && place.usageScores.family >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray text-brand-black/80 border border-brand-gray text-xs font-bold tracking-wide shadow-sm">
                    <Users className="w-3 h-3 text-brand-black/80" />
                    <span>ファミリー</span>
                </div>
            )}
            {place.usageScores?.group && place.usageScores.group >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray text-brand-black/80 border border-brand-gray text-xs font-bold tracking-wide shadow-sm">
                    <Users className="w-3 h-3 text-brand-black/80" />
                    <span>団体・宴会</span>
                </div>
            )}
        </div>
    );
}


