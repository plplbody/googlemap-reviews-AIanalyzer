'use client';

import { useState } from 'react';
import { Place } from '@/types/schema';
import { UserInteraction } from '@/types/user';
import { X, Check } from 'lucide-react';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: Place;
    evaluationType: 'good' | 'bad';
    onSubmit: (evaluation: NonNullable<UserInteraction['evaluation']>) => void;
}

// Helper for Master Features
const MASTER_FEATURES = [
    {
        axis: 'taste', label: '味', color: 'rose',
        features: [
            { key: 'flavor_strength', label: '味の濃淡', high: 'こってりしすぎ', low: 'あっさりしすぎ' },
            { key: 'spiciness', label: '辛さ・甘さ', high: '辛すぎる', low: '甘すぎる' },
            { key: 'volume', label: 'ボリューム', high: '多すぎる', low: '少なすぎる' },
            { key: 'innovation', label: '創作性', high: '変わり種すぎ', low: '平凡すぎ' },
            { key: 'visual_impact', label: '映え度', high: '見た目だけ', low: '地味すぎ' }
        ]
    },
    {
        axis: 'service', label: '接客', color: 'orange',
        features: [
            { key: 'staff_distance', label: '接客距離', high: '馴れ馴れしい', low: '冷たい・放置' },
            { key: 'service_speed', label: '提供速度', high: '早すぎて急かされる', low: '遅すぎる' },
            { key: 'formality', label: 'フォーマル度', high: '堅苦しい', low: '砕けすぎ' }
        ]
    },
    {
        axis: 'atmosphere', label: '雰囲気', color: 'purple',
        features: [
            { key: 'noise_level', label: '賑わい度', high: 'うるさすぎ', low: '静かすぎ' },
            { key: 'lighting', label: '照明', high: '明るすぎ', low: '暗すぎ' },
            { key: 'interior_style', label: '新旧感', high: '新しすぎて落ち着かない', low: '古くて汚い' },
            { key: 'privacy', label: '開放感', high: 'オープンすぎ', low: '閉鎖的すぎ' }
        ]
    },
    {
        axis: 'cost', label: '価格・コスパ', color: 'emerald',
        features: [
            { key: 'price_class', label: '価格帯', high: '高すぎる', low: '安っぽすぎる' }
        ]
    }
] as const;

export function FeedbackModal({ isOpen, onClose, place, evaluationType, onSubmit }: FeedbackModalProps) {
    // For Good: just selectedTags (optional, or empty as requested)
    // For Bad: map feature key to direction
    const [negativeFeedback, setNegativeFeedback] = useState<Record<string, 'too_high' | 'too_low'>>({});

    if (!isOpen) return null;

    const toggleNegative = (key: string, direction: 'too_high' | 'too_low') => {
        setNegativeFeedback(prev => {
            const current = prev[key];
            if (current === direction) {
                // Untoggle
                const next = { ...prev };
                delete next[key];
                return next;
            }
            return { ...prev, [key]: direction };
        });
    };

    const handleSubmit = () => {
        onSubmit({
            type: evaluationType,
            timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } as any,
            selectedFeatureKeys: Object.keys(negativeFeedback),
            negativeFeedback: evaluationType === 'bad' ? negativeFeedback : undefined
        });
        onClose();
        setNegativeFeedback({});
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className={`p-4 flex items-center justify-between ${evaluationType === 'good' ? 'bg-rose-50' : 'bg-brand-gray-light'}`}>
                    <h3 className={`text-lg font-bold ${evaluationType === 'good' ? 'text-rose-700' : 'text-brand-black'}`}>
                        {evaluationType === 'good' ? '良かった点' : '気になった点は？'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full">
                        <X size={20} className="text-brand-black" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-8">

                    {/* Only Bad Evaluation Supported in Modal Now */}
                    {/* Directional Feedback */}
                    <div className="space-y-6">
                        <p className="text-sm font-medium text-brand-black">
                            期待と違った点を選択してください（具体的に）
                        </p>
                        {MASTER_FEATURES.map((group) => (
                            <div key={group.axis} className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider border-b pb-1 text-brand-black border-brand-gray">
                                    {group.label}
                                </h4>
                                <div className="grid gap-3">
                                    {group.features.map((feature) => {
                                        const currentVal = negativeFeedback[feature.key];
                                        return (
                                            <div key={feature.key} className="flex flex-col gap-2">
                                                <div className="text-xs font-bold text-brand-black">{feature.label}</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => toggleNegative(feature.key, 'too_low')}
                                                        className={`px-2 py-2 text-xs rounded border transition-colors ${currentVal === 'too_low'
                                                            ? 'bg-brand-black-dark text-white border-brand-black-dark'
                                                            : 'bg-white border-brand-gray text-brand-black hover:bg-brand-gray-light'
                                                            }`}
                                                    >
                                                        {feature.low}
                                                    </button>
                                                    <button
                                                        onClick={() => toggleNegative(feature.key, 'too_high')}
                                                        className={`px-2 py-2 text-xs rounded border transition-colors ${currentVal === 'too_high'
                                                            ? 'bg-brand-black-dark text-white border-brand-black-dark'
                                                            : 'bg-white border-brand-gray text-brand-black hover:bg-brand-gray-light'
                                                            }`}
                                                    >
                                                        {feature.high}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-brand-gray bg-brand-gray-light flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white shadow-md transition-transform active:scale-95 ${evaluationType === 'good' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-brand-black hover:bg-brand-black-dark'
                            }`}
                    >
                        <Check size={18} />
                        送信する
                    </button>
                </div>
            </div>
        </div>
    );
}
