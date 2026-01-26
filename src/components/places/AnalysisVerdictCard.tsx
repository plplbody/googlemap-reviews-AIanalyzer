'use client';

import { Place } from '@/types/schema';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Sparkles, TrendingUp } from 'lucide-react';

interface AnalysisVerdictCardProps {
    place: Place;
    personalScore?: {
        finalScore: number;
        matchScore: number;
        isPersonalized: boolean;
    } | null;
}

export function AnalysisVerdictCard({ place, personalScore }: AnalysisVerdictCardProps) {
    const defaultScore = place.trueScore ?? 0;
    const finalScore = personalScore?.finalScore ?? defaultScore;
    const matchPercentage = personalScore?.isPersonalized
        ? Math.round(personalScore.matchScore * 100)
        : Math.round((finalScore / 5) * 100); // Fallback

    const radarData = place.axisScores ? [
        { subject: `味 ${place.axisScores.taste?.toFixed(1)}`, A: place.axisScores.taste, fullMark: 5 },
        { subject: `接客 ${place.axisScores.service?.toFixed(1)}`, A: place.axisScores.service, fullMark: 5 },
        { subject: `雰囲気 ${place.axisScores.atmosphere?.toFixed(1)}`, A: place.axisScores.atmosphere, fullMark: 5 },
        { subject: `コスパ ${place.axisScores.cost?.toFixed(1)}`, A: place.axisScores.cost, fullMark: 5 },
    ] : [];

    // Circle Progress Calculation
    // Using viewBox="0 0 100 100", center 50,50, radius 45
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (finalScore / 5) * circumference;

    // Custom Tick for Radar Chart to handle multiline and avoid overlap for labels
    const CustomTick = ({ payload, x, y, textAnchor, stroke, radius }: any) => {
        const [subject, score] = payload.value.split(' ');
        // "味" (Top) overlap fix: Shift Up
        const isTop = subject.includes('味');
        // "雰囲気" (Bottom) overlap fix: Shift Down
        const isBottom = subject.includes('雰囲気');

        const yOffset = isTop ? -15 : (isBottom ? 10 : 0);

        return (
            <g className="recharts-layer recharts-polar-angle-axis-tick">
                <text radius={radius} stroke={stroke} x={x} y={y + yOffset} className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor={textAnchor}>
                    <tspan x={x} dy="0em" fill="#64748b" fontSize="11" fontWeight="600">{subject}</tspan>
                    <tspan x={x} dy="1.2em" fill="#f54a00" fontSize="12" fontWeight="bold">{score}</tspan>
                </text>
            </g>
        );
    };

    return (
        <div className="w-full bg-white rounded-3xl shadow-md hover:shadow-lg border border-brand-gray overflow-hidden">
            {/* Header Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange-dark via-rose-500 to-amber-500" />

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

                {/* 1. Left: AI Score & Radar Chart (Col Span 5 or 6) */}
                <div className="lg:col-span-6 flex flex-row items-center justify-center gap-8 md:gap-8 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
                    {/* Circle Score */}
                    <div className="flex flex-col items-center gap-2 md:gap-4 shrink-0">
                        {/* Match & Label */}
                        <div className="text-brand-orange-dark rounded-full text-type-body font-bold ">
                            AI分析スコア
                        </div>

                        <div className="relative w-32 h-32 md:w-48 md:h-48"> {/* Reduced mobile size slightly, increased desktop size */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%" /* Relative radius */
                                    stroke="currentColor"
                                    strokeWidth="6" /* Keeping stroke thin for whitespace */
                                    fill="transparent"
                                    className="text-gray-100"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="text-brand-orange-dark transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-orange-dark">
                                <span className="text-3xl md:text-4xl font-bold tracking-tighter mb-1">{finalScore.toFixed(1)}</span>
                                <span className="text-type-body font-medium text-brand-black-light">/ 5.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Radar Chart (Next to Score) */}
                    <div className="flex-1 w-full min-w-[160px] max-w-[200px] md:max-w-[240px] h-[160px] md:h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={CustomTick}
                                    tickLine={false}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#f54a00"
                                    strokeWidth={2}
                                    fill="#f54a00"
                                    fillOpacity={0.2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Right: Concierge Summary (Col Span 6) */}
                <div className="lg:col-span-6 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-orange-light flex items-center justify-center shadow-sm">
                            <Sparkles className="w-5 h-5 text-brand-orange-dark" />
                        </div>
                        <div>
                            <h3 className="text-type-subtitle font-bold text-brand-black-dark leading-tight">AI Concierge Summary</h3>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {(Array.isArray(place.summary) ? place.summary : (place.summary as unknown as string || '').split('\n'))
                            .filter(line => line.trim())
                            .map((line, i) => (
                                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-brand-gray-light border border-brand-gray">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-dark shrink-0" />
                                    <p className="text-type-body text-brand-black leading-relaxed font-medium">
                                        {line}
                                    </p>
                                </div>
                            ))}
                    </div>

                    {place.gapReason && (
                        <div className="flex items-start gap-2 text-type-memo text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-100">
                            <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{place.gapReason}</span>
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
}
