'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { X, Sparkles, BrainCircuit } from 'lucide-react';
import ProficiencyCard from '@/components/ProficiencyCard';

interface LearningFeedbackPopupProps {
    globalPreferences: { taste: number; service: number; atmosphere: number; cost: number };
    tagPreferences?: { taste: number; service: number; atmosphere: number; cost: number };
    tagName: string;
    globalExperience?: number;
    tagExperience?: number;
    isTagLevelUp?: boolean;
    isGlobalLevelUp?: boolean;
    onClose: () => void;
}

export default function LearningFeedbackPopup({ globalPreferences, tagPreferences, tagName, globalExperience, tagExperience, isTagLevelUp, isGlobalLevelUp, onClose }: LearningFeedbackPopupProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Entrance animation
        const enterTimer = setTimeout(() => setVisible(true), 100);

        // Auto-close after 3 seconds
        const closeTimer = setTimeout(() => {
            handleClose();
        }, 3000);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(closeTimer);
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
    };

    // Normalize logic: "Relative Importance" (Shape Comparison)
    // We normalize both Global and Tag vectors to 0-100 based on their OWN maximums.
    // This allows us to compare "What do I prioritize in this context?" vs "What do I usually prioritize?"
    // regardless of the absolute magnitude of the learning data (which might be small for new tags).

    // 1. Get Values (Explicit Access)
    const globalTaste = Math.max(0, globalPreferences.taste);
    const globalService = Math.max(0, globalPreferences.service);
    const globalAtmosphere = Math.max(0, globalPreferences.atmosphere);
    const globalCost = Math.max(0, globalPreferences.cost);

    const tagTaste = tagPreferences ? Math.max(0, tagPreferences.taste) : 0;
    const tagService = tagPreferences ? Math.max(0, tagPreferences.service) : 0;
    const tagAtmosphere = tagPreferences ? Math.max(0, tagPreferences.atmosphere) : 0;
    const tagCost = tagPreferences ? Math.max(0, tagPreferences.cost) : 0;

    // 2. Find Max for each (Prevent divide by zero)
    const globalMax = Math.max(globalTaste, globalService, globalAtmosphere, globalCost, 0.001);
    const tagMax = Math.max(tagTaste, tagService, tagAtmosphere, tagCost, 0.001);

    // 3. Scale to 100
    const data = [
        {
            subject: '味',
            global: (globalTaste / globalMax) * 100,
            tag: tagPreferences ? (tagTaste / tagMax) * 100 : 0,
            fullMark: 100
        },
        {
            subject: '接客',
            global: (globalService / globalMax) * 100,
            tag: tagPreferences ? (tagService / tagMax) * 100 : 0,
            fullMark: 100
        },
        {
            subject: '雰囲気',
            global: (globalAtmosphere / globalMax) * 100,
            tag: tagPreferences ? (tagAtmosphere / tagMax) * 100 : 0,
            fullMark: 100
        },
        {
            subject: 'コスパ',
            global: (globalCost / globalMax) * 100,
            tag: tagPreferences ? (tagCost / tagMax) * 100 : 0,
            fullMark: 100
        },
    ];

    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className={`fixed top-24 right-4 z-[9999] w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-brand-orange/20 overflow-hidden transition-all duration-500 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-orange-light/20 to-transparent p-3 flex justify-between items-center border-b border-brand-orange/10">
                <div className="flex items-center gap-2">
                    <div className="bg-brand-orange-dark p-1.5 rounded-full text-white">
                        <BrainCircuit size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-brand-orange-dark uppercase tracking-wider">Learning Complete</p>
                        <h3 className="text-sm font-bold text-brand-black">{tagName}を学習しました</h3>
                    </div>
                </div>
                <button onClick={handleClose} className="text-brand-gray hover:text-brand-black transition-colors">
                    <X size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center">
                <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                            {/* Global Layer (Base) - Always shown */}
                            <Radar
                                name={tagPreferences ? "普段の好み" : "更新後の好み"}
                                dataKey="global"
                                stroke={tagPreferences ? "#94a3b8" : "#f54a00"} // Orange if single, Gray if comparison
                                strokeWidth={tagPreferences ? 2 : 3}
                                strokeDasharray={tagPreferences ? "3 3" : ""}
                                fill={tagPreferences ? "#94a3b8" : "#f54a00"}
                                fillOpacity={tagPreferences ? 0.1 : 0.4}
                            />

                            {/* Tag Layer (Active) - Only if tag provided */}
                            {tagPreferences && (
                                <Radar
                                    name={tagName}
                                    dataKey="tag"
                                    stroke="#f54a00"
                                    strokeWidth={3}
                                    fill="#f54a00"
                                    fillOpacity={0.4}
                                    isAnimationActive={true}
                                />
                            )}
                            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <p className="text-[10px] text-brand-black-light text-center mt-2 mb-3">
                    {tagPreferences ? (
                        <>
                            <span className="font-bold text-brand-black">{tagName}のコンテキスト</span>では、普段より
                            「{(data.reduce((a, b) => a.tag > b.tag ? a : b).tag > data.reduce((a, b) => a.global > b.global ? a : b).global) ? '特定の要素' : '異なる傾向'}」を重視するように調整されました。
                        </>
                    ) : (
                        <>
                            あなたの好みが更新され、<span className="font-bold text-brand-orange-dark">より正確なレコメンド</span>が可能になりました。
                        </>
                    )}
                </p>

                {/* Global Experience Bar */}
                {globalExperience !== undefined && (
                    <ProficiencyCard
                        title="全体学習度"
                        experience={globalExperience}
                        isLevelUp={isGlobalLevelUp}
                        className="mb-2 bg-neutral-50"
                    />
                )}

                {/* Tag Experience Bar */}
                {tagExperience !== undefined && (
                    <ProficiencyCard
                        title={`${tagName} タグ学習度`}
                        experience={tagExperience}
                        isLevelUp={isTagLevelUp}
                        className="mb-2 bg-neutral-50"
                    />
                )}
            </div>
        </div>,
        document.body
    );
}
