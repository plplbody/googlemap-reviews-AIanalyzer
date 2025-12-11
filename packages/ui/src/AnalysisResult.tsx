import React, { useState } from 'react';
import { Place } from '@repo/lib';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Platform, Linking } from 'react-native';
import { Settings, MapPin, ChevronRight, Loader2, Star, TrendingUp, DollarSign, Coffee, Smile, Map as MapIcon, Utensils, Wine, CreditCard, User, Users, Heart, Briefcase, Award, RefreshCw, Sparkles, Check, X } from 'lucide-react-native';
import RadarChart from './components/RadarChart';

interface AnalysisResultProps {
    place: Place;
    focusedAxes?: string[];
    onToggleAxis?: (axis: string) => void;
    onRetry?: () => void;
    googleMapsApiKey?: string;
}

export default function AnalysisResult({ place, focusedAxes = [], onToggleAxis, onRetry, googleMapsApiKey }: AnalysisResultProps) {
    const [activeTab, setActiveTab] = useState<'evaluation' | 'map'>('evaluation');
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = async () => {
        if (onRetry) {
            setIsRetrying(true);
            try {
                await onRetry();
            } finally {
                setIsRetrying(false);
            }
        }
    };

    if (place.status === 'pending' || place.status === 'processing' || isRetrying) {
        return (
            <View className="flex-1 items-center justify-center p-12 gap-4">
                <ActivityIndicator size="large" color="#f43f5e" />
                <Text className="text-xl text-slate-800 font-medium">AIが分析中...</Text>
                <Text className="text-sm text-slate-500">数千件のレビューから真実を抽出しています</Text>
            </View>
        );
    }

    if (place.status === 'error') {
        return (
            <View className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-100 rounded-3xl items-center gap-4">
                <Text className="text-red-600 font-medium">分析に失敗しました。時間をおいて再度お試しください。</Text>
                {onRetry && (
                    <TouchableOpacity
                        onPress={handleRetry}
                        disabled={isRetrying}
                        className="flex-row items-center gap-2 px-6 py-2 bg-white border border-red-200 rounded-full"
                    >
                        <RefreshCw size={16} color="#ef4444" />
                        <Text className="text-red-600 font-medium">再試行する</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    // Personalized Score Calculation
    const calculatePersonalizedScore = () => {
        if (!place.axisScores || focusedAxes.length === 0) return null;

        const scores = place.axisScores;
        let totalScore = 0;
        let totalWeight = 0;

        const axesMap: Record<string, number> = {
            'taste': scores.taste,
            'service': scores.service,
            'atmosphere': scores.atmosphere,
            'cost': scores.cost
        };

        ['taste', 'service', 'atmosphere', 'cost'].forEach(axis => {
            const score = axesMap[axis] || 0;
            const weight = focusedAxes.includes(axis) ? 3 : 1;
            totalScore += score * weight;
            totalWeight += weight;
        });

        return totalScore / totalWeight;
    };

    const yourScore = calculatePersonalizedScore();

    const data = place.axisScores ? [
        { subject: '味', A: place.axisScores.taste, fullMark: 5 },
        { subject: '接客', A: place.axisScores.service, fullMark: 5 },
        { subject: '雰囲気', A: place.axisScores.atmosphere, fullMark: 5 },
        { subject: 'コスパ', A: place.axisScores.cost, fullMark: 5 },
    ] : [];

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="p-4 md:p-8 space-y-6">

                {/* Header Section */}
                <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                    <View className="flex-row items-center gap-2 mb-2">
                        <MapPin size={14} color="#64748b" />
                        <Text className="text-slate-500 text-sm font-medium">Google Maps 掲載店</Text>
                    </View>
                    <Text className="text-3xl font-extrabold text-slate-900 mb-4">{place.name}</Text>

                    {/* Badges */}
                    <View className="flex-row flex-wrap gap-2 mb-4">
                        {/* Price Level Badges (Simplified for mobile) */}
                        {place.priceLevel && (
                            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                                <DollarSign size={12} color="#475569" />
                                <Text className="text-xs font-bold text-slate-700">{place.priceLevel.replace('PRICE_LEVEL_', '')}</Text>
                            </View>
                        )}
                        {/* Logic for high scores */}
                        {place.usageScores?.date && place.usageScores.date >= 4.0 && (
                            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 shadow-sm">
                                <Heart size={12} color="white" fill="white" />
                                <Text className="text-white text-xs font-bold">デート</Text>
                            </View>
                        )}
                        {place.usageScores?.business && place.usageScores.business >= 4.0 && (
                            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 shadow-sm">
                                <Briefcase size={12} color="white" />
                                <Text className="text-white text-xs font-bold">ビジネス</Text>
                            </View>
                        )}
                    </View>

                    {/* Contact & Map Link */}
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`)}
                        className="flex-row items-center gap-2 mt-2"
                    >
                        <MapIcon size={16} color="#475569" />
                        <Text className="text-blue-600 font-medium">Google Mapで見る</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-2 mt-4">
                        <RefreshCw size={12} color="#94a3b8" />
                        <Text className="text-slate-400 text-xs">最終更新: {new Date().toLocaleDateString()}</Text>
                    </View>
                </View>

                {/* Tabs (Simple Toggle for Mobile) */}
                <View className="flex-row border-b border-gray-200 mb-6">
                    <TouchableOpacity
                        onPress={() => setActiveTab('evaluation')}
                        className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'evaluation' ? 'border-orange-600' : 'border-transparent'}`}
                    >
                        <Text className={`font-bold ${activeTab === 'evaluation' ? 'text-orange-600' : 'text-gray-500'}`}>評価</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActiveTab('map')}
                        className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'map' ? 'border-orange-600' : 'border-transparent'}`}
                    >
                        <Text className={`font-bold ${activeTab === 'map' ? 'text-orange-600' : 'text-gray-500'}`}>地図</Text>
                    </TouchableOpacity>
                </View>

                {/* Map Content */}
                {activeTab === 'map' && (
                    <View className="bg-slate-100 rounded-xl h-64 items-center justify-center border border-slate-200">
                        {Platform.OS === 'web' && googleMapsApiKey ? (
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '0.75rem' }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=place_id:${place.id}`}
                            />
                        ) : (
                            <View className="items-center gap-2">
                                <MapIcon size={32} color="#94a3b8" />
                                <Text className="text-slate-500 font-medium">地図を表示するにはGoogle Mapを開いてください</Text>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`)}
                                    className="mt-2 px-4 py-2 bg-blue-600 rounded-full"
                                >
                                    <Text className="text-white font-bold text-sm">アプリで開く</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}

                {/* Evaluation Content */}
                {activeTab === 'evaluation' && (
                    <View className="gap-6">
                        {/* Axis Select */}
                        <View className="bg-slate-50 rounded-2xl p-4 border border-slate-100 items-center">
                            <Text className="text-sm font-bold text-slate-500 mb-3">重視するポイントを選択（最大2つ）</Text>
                            <View className="flex-row flex-wrap justify-center gap-2">
                                {[
                                    { id: 'taste', label: '味', icon: Utensils },
                                    { id: 'service', label: '接客', icon: Smile },
                                    { id: 'atmosphere', label: '雰囲気', icon: Sparkles },
                                    { id: 'cost', label: 'コスパ', icon: TrendingUp },
                                ].map((axis) => {
                                    const isSelected = focusedAxes.includes(axis.id);
                                    return (
                                        <TouchableOpacity
                                            key={axis.id}
                                            onPress={() => onToggleAxis && onToggleAxis(axis.id)}
                                            className={`flex-row items-center gap-1.5 px-3 py-2 rounded-full border ${isSelected
                                                    ? 'bg-[#E65100] border-[#E65100]'
                                                    : 'bg-white border-slate-200'
                                                }`}
                                        >
                                            <axis.icon size={14} color={isSelected ? 'white' : '#475569'} />
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>{axis.label}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        {/* Scores */}
                        <View className="gap-4">
                            {/* Personalized Score */}
                            {yourScore ? (
                                <View className="bg-white p-6 rounded-2xl shadow-sm border border-[#E65100] items-center">
                                    <Text className="text-[#E65100] font-bold mb-1">あなたへのマッチ度</Text>
                                    <View className="flex-row items-baseline">
                                        <Text className="text-5xl font-black text-[#E65100]">{yourScore.toFixed(1)}</Text>
                                        <Text className="text-xl text-orange-300 ml-1">/5.0</Text>
                                    </View>
                                    <View className="flex-row mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={20} fill={i < Math.round(yourScore) ? '#F97316' : 'none'} color={i < Math.round(yourScore) ? '#F97316' : '#fdba74'} />
                                        ))}
                                    </View>
                                </View>
                            ) : (
                                <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 items-center">
                                    <Text className="text-slate-500 font-bold mb-1">AI分析スコア</Text>
                                    <View className="flex-row items-baseline">
                                        <Text className="text-5xl font-black text-slate-800">{place.trueScore?.toFixed(1)}</Text>
                                        <Text className="text-xl text-slate-300 ml-1">/5.0</Text>
                                    </View>
                                    <View className="flex-row mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={20} fill={i < Math.round(place.trueScore || 0) ? '#F97316' : 'none'} color={i < Math.round(place.trueScore || 0) ? '#F97316' : '#cbd5e1'} />
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Radar Chart */}
                        <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 items-center">
                            <Text className="text-lg font-bold text-slate-900 mb-4">バランス分析</Text>
                            <RadarChart data={data} width={250} height={250} />
                        </View>

                        {/* Summary */}
                        <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                            <Text className="text-lg font-bold text-slate-900 mb-4">AI分析サマリー</Text>
                            <Text className="text-slate-700 leading-relaxed">{place.summary}</Text>
                        </View>

                        {/* Usage Scores Grid */}
                        <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                            <Text className="text-lg font-bold text-slate-900 mb-4">おすすめシーン</Text>
                            <View className="flex-row flex-wrap gap-3">
                                <UsagePill label="ビジネス" value={place.usageScores?.business} />
                                <UsagePill label="デート" value={place.usageScores?.date} />
                                <UsagePill label="お一人様" value={place.usageScores?.solo} />
                                <UsagePill label="ファミリー" value={place.usageScores?.family} />
                                <UsagePill label="団体" value={place.usageScores?.group} />
                            </View>
                        </View>

                    </View>
                )}
            </View>
        </ScrollView>
    );
}

function UsagePill({ label, value }: { label: string, value?: number }) {
    if (!value) return null;
    const isHigh = value >= 4.0;
    return (
        <View className={`px-4 py-2 rounded-xl border flex-grow items-center ${isHigh ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100'}`}>
            <Text className="text-xs text-slate-500 mb-1">{label}</Text>
            <Text className={`text-lg font-black ${isHigh ? 'text-orange-500' : 'text-slate-400'}`}>{value.toFixed(1)}</Text>
        </View>
    );
}
