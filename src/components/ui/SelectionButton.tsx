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
    const baseStyles = "flex items-center justify-center gap-2 rounded-full text-type-button transition-all duration-300 ";

    // Variant specific styles
    const chipStyles = isSelected
        ? "bg-brand-orange-dark text-white border border-brand-orange-dark shadow-md transform scale-105 px-4 py-2 shadow-sm"
        : "bg-white text-brand-black-light border border-brand-gray hover:border-brand-orange-dark hover:text-brand-orange-dark px-4 py-2 shadow-sm";

    const segmentStyles = isSelected
        ? "bg-brand-orange-dark text-white shadow-sm px-4 py-1.5"
        : "text-brand-black-light hover:bg-brand-gray-light hover:text-brand-orange-dark px-4 py-1.5";

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed pointer-events-none text-brand-black-light bg-transparent hover:text-brand-black-light hover:border-brand-gray"
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
