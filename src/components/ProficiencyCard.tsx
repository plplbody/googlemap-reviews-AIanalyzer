import { Zap } from "lucide-react";

interface ProficiencyCardProps {
    title: string;
    experience: number;
    isLevelUp?: boolean;
    className?: string;
}

export default function ProficiencyCard({
    title,
    experience,
    isLevelUp = false,
    className = ""
}: ProficiencyCardProps) {
    const level = Math.floor(experience / 100) + 1;
    const nextLevelXp = 100 - (experience % 100);
    const progress = experience % 100;

    return (
        <div className={`w-full bg-neutral-50 rounded-lg p-3 border border-brand-gray-light ${className}`}>
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-brand-black flex items-center gap-1.5">
                    {title}
                </span>
                <div className="flex items-center gap-2">
                    {isLevelUp && (
                        <span className="text-[10px] font-extrabold text-brand-orange-dark animate-pulse tracking-wide flex items-center gap-0.5">
                            <Zap size={10} fill="currentColor" /> LEVEL UP!
                        </span>
                    )}
                    <span className={`text-[10px] font-bold ${isLevelUp ? 'text-brand-orange-dark scale-110' : 'text-brand-orange-dark'} transition-transform`}>
                        Lv.{level}
                    </span>
                </div>
            </div>

            {/* XP Bar */}
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                <div
                    className="h-full bg-gradient-to-r from-brand-orange-dark to-brand-orange transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between items-center">
                <span className="text-[9px] text-brand-gray">Next Level</span>
                <span className="text-[9px] text-brand-gray">{nextLevelXp} XP</span>
            </div>
        </div>
    );
}
