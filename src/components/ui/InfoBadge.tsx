import { Info } from 'lucide-react';

interface InfoBadgeProps {
    label: React.ReactNode;
    infoText: string;
    className?: string;
}

/**
 * A reusable badge that shows a tooltip on hover/click.
 * Designed to be unobtrusive but discoverable.
 */
export default function InfoBadge({ label, infoText, className = '' }: InfoBadgeProps) {
    return (
        <div className={`group relative inline-flex items-center justify-center cursor-help ${className}`}>
            {/* Badge Content */}
            <div className="flex items-center gap-1">
                {label}
            </div>

            {/* Tooltip (Hidden by default, shown on group-hover) */}
            <div className="
                absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px]
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200 ease-out transform group-hover:-translate-y-1
                z-50
            ">
                <div className="bg-brand-black/90 text-white text-[10px] px-3 py-2 rounded-lg shadow-xl text-center leading-relaxed backdrop-blur-sm">
                    {infoText}
                    {/* Tiny arrow pointing down */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-black/90" />
                </div>
            </div>
        </div>
    );
}
