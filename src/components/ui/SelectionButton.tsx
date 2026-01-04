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
    const baseStyles = "flex items-center justify-center gap-2 rounded-full text-xs font-bold transition-all duration-300 ";

    // Variant specific styles
    const chipStyles = isSelected
        ? "bg-brand text-white border border-brand shadow-md transform scale-105 px-4 py-2 shadow-sm"
        : "bg-white text-brand-black/80 border border-brand-gray hover:border-brand hover:text-brand px-4 py-2 shadow-sm";

    const segmentStyles = isSelected
        ? "bg-brand text-white shadow-sm px-4 py-1.5"
        : "text-brand-black/80 hover:bg-brand-gray/20 hover:text-brand px-4 py-1.5";

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none text-brand-black/50 bg-transparent hover:text-brand-black/50 hover:border-brand-gray"
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
