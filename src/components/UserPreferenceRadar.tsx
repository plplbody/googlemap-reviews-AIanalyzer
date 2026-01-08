'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface UserPreferenceRadarProps {
    preferences: {
        taste: number;
        service: number;
        atmosphere: number;
        cost: number;
    } | undefined;
    compact?: boolean;
}

export function UserPreferenceRadar({ preferences, compact = false }: UserPreferenceRadarProps) {
    if (!preferences) {
        return (
            <div className={`flex flex-col items-center justify-center text-brand-black-light bg-brand-gray-light rounded-2xl ${compact ? 'h-32' : 'h-64'}`}>
                <p className="text-sm font-bold">データ不足</p>
                <p className="text-xs">まだ学習データがありません</p>
            </div>
        );
    }

    // Clamp values to 0 (ignore negatives) and apply threshold (ignore noise < 0.01)
    const threshold = 0.01;
    const taste = preferences.taste > threshold ? preferences.taste : 0;
    const service = preferences.service > threshold ? preferences.service : 0;
    const atmosphere = preferences.atmosphere > threshold ? preferences.atmosphere : 0;
    const cost = preferences.cost > threshold ? preferences.cost : 0;

    const maxVal = Math.max(taste, service, atmosphere, cost) || 1; // Default to 1 to avoid /0

    // Normalize to 0-100 relative to max
    const data = [
        { subject: '味', A: (taste / maxVal) * 100, fullMark: 100 },
        { subject: '接客', A: (service / maxVal) * 100, fullMark: 100 },
        { subject: '雰囲気', A: (atmosphere / maxVal) * 100, fullMark: 100 },
        { subject: 'コスパ', A: (cost / maxVal) * 100, fullMark: 100 },
    ];

    return (
        <div className={`relative ${compact ? 'h-32' : 'h-48'} w-full flex flex-col items-center`}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={compact ? "65%" : "70%"} data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#64748b', fontSize: compact ? 10 : 11, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Preference"
                        dataKey="A"
                        stroke="#f54a00"
                        strokeWidth={2}
                        fill="#f54a00"
                        fillOpacity={0.3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
