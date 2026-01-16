'use client';

import { Place } from '@/types/schema';
import { getPlaceDetails } from '@/server/actions/place';
import { getGoogleMapsApiKey } from '@/server/actions/config';
import { useState, useEffect } from 'react';

import { Loader2, Star, TrendingUp, DollarSign, Coffee, Smile, MapPin, Briefcase, Heart, User, Users, Award, RefreshCw, Map, Utensils, Wine, Accessibility, CreditCard, Check, X, Sparkles, ExternalLink, CheckCircle, Scale } from 'lucide-react';
import { PlaceBadges } from '@/components/PlaceBadges';
import { HotPepperCredit } from '@/components/HotPepperCredit';
import { ActionButtons } from '@/components/ActionButtons';
import { useAuth } from '@/lib/firebase/auth';
import { useComparison } from '@/contexts/ComparisonContext';
import { AnalysisHero } from './places/AnalysisHero';
import { AnalysisVerdictCard } from './places/AnalysisVerdictCard';

interface AnalysisResultProps {
    place: Place;
    focusedAxes?: string[];
    focusedScenes?: string[];
    onToggleAxis?: (axis: string) => void;
    onToggleScene?: (scene: string) => void;
    isAutoMode?: boolean;
    personalScore?: {
        trueScore: number;
        matchScore: number;
        finalScore: number;
        isPersonalized: boolean; // True if user data was used
    } | null;
}

export default function AnalysisResult({ place, focusedAxes = [], focusedScenes = [], onToggleAxis, onToggleScene, isAutoMode = false, personalScore }: AnalysisResultProps) {
    const [activeTab, setActiveTab] = useState<'evaluation' | 'map'>('evaluation');
    const [apiKey, setApiKey] = useState('');
    const [isRetrying, setIsRetrying] = useState(false);

    // Comparison
    const { selectedPlaces, toggleSelection } = useComparison();
    const isSelected = selectedPlaces.some(p => p.id === place.id);

    // Auth for Personalization
    const { user } = useAuth();

    useEffect(() => {
        getPlaceDetails(place.id).catch(e => console.error(e));
        getGoogleMapsApiKey().then(key => {
            console.log('API Key fetched:', !!key);
            setApiKey(key);
        });
    }, [place.id]);

    const handleRetry = async () => {
        setIsRetrying(true);
        try {
            await getPlaceDetails(place.id);
        } catch (error) {
            console.error("Retry failed:", error);
            setIsRetrying(false);
        }
    };

    if (place.status === 'pending' || place.status === 'processing' || isRetrying) {
        // ...
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 animate-pulse">
                <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
                <p className="text-type-subtitle text-brand-black">AIが分析中...</p>
                <p className="text-type-body text-brand-black">口コミを分析しています</p>
            </div>
        );
    }

    if (place.status === 'error') {
        // ...
        return (
            <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-center shadow-sm flex flex-col items-center gap-4">
                <p className="text-red-600 text-type-subtitle">分析に失敗しました。時間をおいて再度お試しください。</p>
                <button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="text-type-body flex items-center gap-2 px-6 py-2 bg-white border border-red-200 text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                    再試行する
                </button>
            </div>
        );
    }

    // Unified Score Logic: Prop (Personalized/Final) > TrueScore
    const yourScore = personalScore?.finalScore ?? place.trueScore ?? 0;

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Hero Section (Compact) */}
            <AnalysisHero place={place} />

            {/* Tabs (No Sticky) */}
            <div className="bg-transparent -mx-4 px-4  mt-8 border-b border-gray-200 transition-all">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('evaluation')}
                        className={`pb-3 text-sm md:text-base font-bold transition-all relative whitespace-nowrap ${activeTab === 'evaluation'
                            ? 'text-brand-orange-dark'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        AI評価レポート
                        {activeTab === 'evaluation' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`pb-3 text-sm md:text-base font-bold transition-all relative whitespace-nowrap ${activeTab === 'map'
                            ? 'text-brand-orange-dark'
                            : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        地図・アクセス
                        {activeTab === 'map' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-full" />
                        )}
                    </button>
                </div>
            </div>

            {/* Map Tab Content */}
            {activeTab === 'map' && (
                <div className="space-y-6 mt-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-sm border border-brand-gray p-1 h-[600px] w-full relative group">
                        {apiKey ? (
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1.25rem' }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place.id}`}
                                className="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                                <Loader2 className="w-8 h-8 animate-spin" />
                            </div>
                        )}
                    </div>
                    {/* Basic Info for Map Context */}
                    <BasicInfoSection place={place} />
                </div>
            )}

            {/* Evaluation Tab Content */}
            {activeTab === 'evaluation' && (
                <div className="space-y-6 mt-6 animate-in fade-in duration-300">

                    {/* 2. Verdict Card (Unified Conclusion) */}
                    <AnalysisVerdictCard place={place} personalScore={personalScore} />

                    {/* 3. Detailed Analysis Matrix */}
                    {place.axisAnalysis && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2 px-2">
                                <div className="h-8 w-1 bg-brand-orange-dark rounded-full"></div>
                                <h3 className="text-xl font-bold text-brand-black-dark">評価軸別 詳細分析</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AxisAnalysisCard
                                    title="味"
                                    icon={Utensils}
                                    data={place.axisAnalysis.taste}
                                    color="rose"
                                />
                                <AxisAnalysisCard
                                    title="接客"
                                    icon={Heart}
                                    data={place.axisAnalysis.service}
                                    color="blue"
                                />
                                <AxisAnalysisCard
                                    title="雰囲気"
                                    icon={Sparkles}
                                    data={place.axisAnalysis.atmosphere}
                                    color="purple"
                                />
                                <AxisAnalysisCard
                                    title="コストパフォーマンス"
                                    icon={TrendingUp}
                                    data={place.axisAnalysis.cost}
                                    color="emerald"
                                />
                            </div>
                        </div>
                    )}

                    {/* 4. Usage Scores */}
                    <div className="bg-white rounded-3xl shadow-lg border border-brand-gray p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-1 bg-brand-orange-dark rounded-full"></div>
                            <h3 className="text-xl font-bold text-brand-black-dark">どんなシーンにおすすめ？</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <UsageCard label="少人数" subLabel="ランチ・サク飲み" value={place.usageScores?.solo} />
                            <UsageCard label="団体" subLabel="宴会・飲み会" value={place.usageScores?.group} />
                            <UsageCard label="デート" subLabel="記念日・カップル" value={place.usageScores?.date} />
                            <UsageCard label="ビジネス" subLabel="接待・会食" value={place.usageScores?.business} />
                            <UsageCard label="ファミリー" subLabel="お子様連れ" value={place.usageScores?.family} />
                        </div>
                        {place.usageSummary && (
                            <div className="mt-6 bg-brand-gray-light border border-brand-gray rounded-2xl p-4 text-type-body text-brand-black leading-relaxed">
                                <span className="text-type-body font-semibold text-brand-black mr-2">💡 シーン分析:</span>
                                {place.usageSummary}
                            </div>
                        )}
                    </div>

                    {/* 5. Basic Info Section */}
                    <BasicInfoSection place={place} />

                    {/* HotPepper Credit */}
                    {place.hotpepper && (
                        <div className="pb-8 opacity-60 hover:opacity-100 transition-opacity">
                            <HotPepperCredit />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function BasicInfoSection({ place }: { place: Place }) {
    const { detailedInfo } = place;
    if (!detailedInfo) return null;

    const { paymentOptions, serviceOptions, offerings, amenities, diningOptions } = detailedInfo;

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-brand-gray p-8 md:p-10">
            <h3 className="text-type-subtitle text-brand-black-dark mb-8">基本情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Service Options */}
                <InfoGroup title="サービスオプション" icon={Utensils}>
                    <InfoItem label="デリバリー" value={serviceOptions?.delivery} />
                    <InfoItem label="テイクアウト" value={serviceOptions?.takeout} />
                    <InfoItem label="イートイン" value={serviceOptions?.dineIn} />
                    <InfoItem label="予約可" value={serviceOptions?.reservable} />
                </InfoGroup>

                {/* Offerings */}
                <InfoGroup title="提供メニュー" icon={Wine}>
                    <InfoItem label="アルコール" value={offerings?.servesBeer || offerings?.servesWine} />
                    <InfoItem label="ベジタリアン料理" value={offerings?.servesVegetarianFood} />
                    <InfoItem label="コーヒー" value={offerings?.servesCoffee} />
                    <InfoItem label="朝食" value={diningOptions?.servesBreakfast} />
                    <InfoItem label="ランチ" value={diningOptions?.servesLunch} />
                    <InfoItem label="ディナー" value={diningOptions?.servesDinner} />
                </InfoGroup>

                {/* Amenities */}
                <InfoGroup title="設備・環境" icon={Accessibility}>
                    <InfoItem label="トイレ" value={amenities?.restroom} />
                    <InfoItem label="子供連れOK" value={amenities?.goodForChildren} />
                    <InfoItem label="団体OK" value={amenities?.goodForGroups} />
                </InfoGroup>

                {/* Payment Options */}
                <InfoGroup title="決済方法" icon={CreditCard}>
                    {paymentOptions && paymentOptions.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {paymentOptions.map((p, i) => (
                                <span key={i} className="px-2 py-1 brand-gray text-brand-black text-type-body rounded-md border border-brand-gray">
                                    {formatPaymentOption(p)}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-type-body text-brand-black-light">情報なし</span>
                    )}
                </InfoGroup>
            </div>
        </div>
    );
}

function InfoGroup({ title, icon: Icon, children }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-black border-b border-brand-gray pb-2">
                <Icon className="w-5 h-5 text-brand-black-light" />
                <h4 className="text-type-body font-semibold">{title}</h4>
            </div>
            <div className="space-y-2 pl-2">
                {children}
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string, value?: boolean }) {
    if (value === undefined) return null;
    return (
        <div className="flex items-center gap-2 text-type-body">
            {value ? (
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
                <X className="w-4 h-4 text-brand-black-light shrink-0" />
            )}
            <span className={value ? 'text-brand-black font-medium' : 'text-brand-black-light'}>{label}</span>
        </div>
    );
}

function formatPaymentOption(option: string): string {
    // Simple formatter, can be expanded
    return option.replace(/_/g, ' ').replace('PAYMENT_OPTION_', '');
}

function UsageCard({ label, subLabel, value }: any) {
    const score = value || 0;
    const isHigh = score >= 4.0;

    return (
        <div className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${isHigh ? 'bg-white border-rose-100 hover:border-rose-200' : 'bg-brand-gray-light border-transparent'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="text-brand-black text-type-body font-semibold">{label}</div>
                    <div className="text-type-memo text-brand-black mt-1">{subLabel}</div>
                </div>
                <div className={`text-type-subtitle ${isHigh ? 'text-rose-500' : 'text-brand-black-light'}`}>
                    {score.toFixed(1)}
                </div>
            </div>
            <div className="h-2 brand-gray rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ${isHigh ? 'bg-rose-500' : 'bg-brand-black-light'}`}
                    style={{ width: `${(score / 5) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}



function AxisAnalysisCard({ title, icon: Icon, data, color }: any) {
    const colorClasses: any = {
        rose: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-800', dot: 'bg-rose-500' },
        blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
    };
    const c = colorClasses[color] || colorClasses.rose;

    return (
        <div className={`rounded-3xl border ${c.bg} ${c.border} p-6 h-full`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl bg-white/60 ${c.text}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h4 className={`text-type-subtitle ${c.text}`}>{title}</h4>
            </div>

            <p className="text-type-body text-brand-black font-medium mb-4 leading-relaxed bg-white/50 p-3 rounded-xl">
                {data?.summary}
            </p>

            <div className="space-y-4">
                <div>
                    <div className="text-type-body font-semibold text-brand-black uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Smile className="w-3 h-3" /> 評価ポイント
                    </div>
                    <ul className="space-y-2">
                        {data?.pros?.map((p: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-type-body text-brand-black">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="text-type-body font-semibold text-brand-black uppercase tracking-wider mb-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 rotate-180" /> 懸念ポイント
                    </div>
                    <ul className="space-y-2">
                        {data?.cons?.map((c: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-type-body text-brand-black">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-black-light shrink-0" />
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function formatDate(date: any): string {
    if (!date) return '不明';
    try {
        // Handle Firestore Timestamp (seconds, nanoseconds)
        if (date.seconds) {
            return new Date(date.seconds * 1000).toLocaleDateString('ja-JP');
        }
        // Handle string or Date object
        return new Date(date).toLocaleDateString('ja-JP');
    } catch (e) {
        return '不明';
    }
}




