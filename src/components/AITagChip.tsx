import { UserScenario } from '@/types/user';

interface AITagChipProps {
    scenario: UserScenario;
    selected?: boolean;
    onClick?: () => void;
    className?: string; // Additional classes
}

// Level Definitions
export type ProficiencyLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';

export const getProficiencyInfo = (experience: number = 0): { level: ProficiencyLevel; xpNext: number; label: string; color: string } => {
    // Basic level calculation: 100 XP per level
    // This is a simplified helper for external consumers
    const displayLevel = Math.floor(experience / 100) + 1;

    // Legacy mapping (if needed for colors later, though now we use CSS classes)
    let level: ProficiencyLevel = 'BRONZE';
    if (experience >= 1000) level = 'DIAMOND';
    else if (experience >= 500) level = 'GOLD';
    else if (experience >= 200) level = 'SILVER';

    return {
        level,
        xpNext: 100 - (experience % 100),
        label: `Lv.${displayLevel}`,
        color: 'bg-brand-orange-dark' // Placeholder
    };
};

export default function AITagChip({ scenario, selected, onClick, className = '' }: AITagChipProps) {
    const xp = scenario.experience || 0;
    const level = Math.floor(xp / 100) + 1;

    // Selected styles: Brand Orange, slightly larger/shadowed
    // Unselected styles: Minimal white chip with gray border.
    const containerClasses = selected
        ? 'bg-brand-orange text-brand-gray text-type-button border-brand-orange shadow-md scale-105'
        : 'bg-white text-brand-black-light text-type-button border-brand-gray hover:border-brand-orange-dark hover:text-brand-orange-dark shadow-sm';

    // Level Text Color:
    // Selected: White/Transparent-white (Subtle blend)
    // Unselected: Neutral-400 (Discrete gray as requested)
    const levelTextClass = selected
        ? 'text-brand-gray'
        : 'text-brand-black-light group-hover/chip:text-brand-orange-dark';

    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                group/chip relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300
                ${containerClasses}
                ${className}
            `}
        >
            {/* Name */}
            <span className="leading-none pb-0.5">
                {scenario.name}
            </span>

            {/* Subtle Level Indicator */}
            {/* Placed next to name, baseline aligned, very small and discrete. */}
            {/* Hover Color: When unselected, matches the button hover text color (orange-dark) */}
            <span className={`text-[9px] font-medium leading-none ${levelTextClass} pt-0.5`}>
                Lv.{level}
            </span>
        </button>
    );
}
