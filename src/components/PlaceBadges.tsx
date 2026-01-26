import { Place } from '@/types/schema';
import { Briefcase, Heart, User, Users } from 'lucide-react';

export function PlaceBadges({ place }: { place: Place }) {
    return (
        <div className="flex flex-wrap gap-4 text-type-memo text-brand-black">
            {/* Usage Scenarios */}
            {(place.usageScores?.solo ?? 0) >= 4.0 && (
                <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-brand-black-light" />
                    <span>少人数</span>
                </div>
            )}
            {(place.usageScores?.group ?? 0) >= 4.0 && (
                <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-brand-black-light" />
                    <span>団体</span>
                </div>
            )}
            {(place.usageScores?.date ?? 0) >= 4.0 && (
                <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-brand-black-light" />
                    <span>デート</span>
                </div>
            )}
            {(place.usageScores?.business ?? 0) >= 4.0 && (
                <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-brand-black-light" />
                    <span>ビジネス</span>
                </div>
            )}
            {(place.usageScores?.family ?? 0) >= 4.0 && (
                <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-brand-black-light" />
                    <span>ファミリー</span>
                </div>
            )}
        </div>
    );
}


