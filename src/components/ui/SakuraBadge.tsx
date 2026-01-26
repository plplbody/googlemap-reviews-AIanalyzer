
import React from 'react';

type SakuraBadgeProps = {
    score?: number;
    className?: string;
};

export const SakuraBadge: React.FC<SakuraBadgeProps> = ({ score, className = '' }) => {
    // If score is undefined or Safe (< 2.5), do not render anything
    if (score === undefined || score < 2.5) {
        return null;
    }

    const isHighRisk = score >= 2.0;

    // Config based on risk level
    const label = isHighRisk ? "サクラ疑惑: 高" : "サクラ疑惑: 中";
    const bgClass = isHighRisk
        ? "bg-brand-red-light text-brand-red-dark border-brand-red-light/50"
        : "bg-brand-yellow-light text-brand-yellow-dark border-brand-yellow-light/50";
    const icon = isHighRisk ? "⚠️" : "✋";

    return (
        <span
            className={`
                inline-flex items-center px-2 py-1 rounded text-xs font-medium border
                ${bgClass} ${className}
            `}
            title={`サクラ判定スコア: ${score.toFixed(1)} / 5.0`}
        >
            <span className="mr-1">{icon}</span>
            {label}
        </span>
    );
};
