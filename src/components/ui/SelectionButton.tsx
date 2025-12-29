import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectionButtonProps {
    isSelected: boolean;
    onClick: () => void;
    label: string;
    icon?: LucideIcon;
    variant?: 'chip' | 'segment';
    disabled?: boolean;
    className?: string; // For additional overrides if needed
}

export function SelectionButton({
    isSelected,
    onClick,
    label,
    icon: Icon,
    variant = 'chip',
    disabled = false,
    className = ''
}: SelectionButtonProps) {

    // Base styles common to both
    const baseStyles = "flex items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-300";

    // Variant specific styles
    const chipStyles = isSelected
        ? "bg-[#E65100] text-white border border-[#E65100] shadow-md transform scale-105 px-4 py-2"
        : "bg-white text-slate-600 border border-slate-200 hover:border-[#E65100] hover:text-[#E65100] px-4 py-2";

    const segmentStyles = isSelected
        ? "bg-[#E65100] text-white shadow-sm px-4 py-1.5"
        : "text-slate-500 hover:bg-slate-50 hover:text-[#E65100] px-4 py-1.5";

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none text-slate-300 bg-transparent hover:text-slate-300 hover:border-slate-200"
        : "";

    // Combine
    const activeStyles = variant === 'chip' ? chipStyles : segmentStyles;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${activeStyles} ${disabledStyles} ${className}`}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {label}
        </button>
    );
}
