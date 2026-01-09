import { Place } from '@/types/schema';
import { Briefcase, Heart, User, Users } from 'lucide-react';

export function PlaceBadges({ place }: { place: Place }) {
    return (
        <div className="flex flex-wrap gap-2 mt-2 text-type-memo text-xs font-semibold text-brand-black">
            {/* Usage Scenarios */}
            {place.usageScores?.solo && place.usageScores.solo >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray border border-brand-gray tracking-wide shadow-sm">
                    <User className="w-3 h-3" />
                    <span>少人数</span>
                </div>
            )}
            {place.usageScores?.group && place.usageScores.group >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray border border-brand-gray tracking-wide shadow-sm">
                    <Users className="w-3 h-3" />
                    <span>団体</span>
                </div>
            )}
            {place.usageScores?.date && place.usageScores.date >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray border border-brand-gray tracking-wide shadow-sm">
                    <Heart className="w-3 h-3 fill-brand-black" />
                    <span>デート</span>
                </div>
            )}
            {place.usageScores?.business && place.usageScores.business >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray border border-brand-gray tracking-wide shadow-sm">
                    <Briefcase className="w-3 h-3" />
                    <span>ビジネス</span>
                </div>
            )}
            {place.usageScores?.family && place.usageScores.family >= 4.0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full brand-gray border border-brand-gray tracking-wide shadow-sm">
                    <Users className="w-3 h-3" />
                    <span>ファミリー</span>
                </div>
            )}
        </div>
    );
}


