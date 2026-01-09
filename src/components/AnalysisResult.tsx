'use client';

import { Place } from '@/types/schema';
import { getPlaceDetails } from '@/server/actions/place';
import { getGoogleMapsApiKey } from '@/server/actions/config';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Loader2, Star, TrendingUp, DollarSign, Coffee, Smile, MapPin, Briefcase, Heart, User, Users, Award, RefreshCw, Map, Utensils, Wine, Accessibility, CreditCard, Check, X, Sparkles, ExternalLink, CheckCircle, Scale } from 'lucide-react';
import { PlaceBadges } from '@/components/PlaceBadges';
import { HotPepperCredit } from '@/components/HotPepperCredit';
import { ActionButtons } from '@/components/ActionButtons';
import { useAuth } from '@/lib/firebase/auth';
import { useComparison } from '@/contexts/ComparisonContext';

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

    const data = place.axisScores ? [
        { subject: '味', A: place.axisScores.taste, fullMark: 5 },
        { subject: '接客', A: place.axisScores.service, fullMark: 5 },
        { subject: '雰囲気', A: place.axisScores.atmosphere, fullMark: 5 },
        { subject: 'コスパ', A: place.axisScores.cost, fullMark: 5 },
    ] : [];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section: Name & Badges */}
            <div className="bg-white rounded-3xl shadow-xl border border-brand-gray p-6 md:p-8">
                <div className="flex flex-col gap-4">
                    {/* Name & Image Row */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {place.hotpepper?.imageUrl ? (
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-sm border border-brand-gray shrink-0 group">
                                <img
                                    src={place.hotpepper.imageUrl}
                                    alt={place.name}
                                    className="w-full h-full object-cover"
                                />
                                {isSelected && (
                                    <div className="absolute top-2 left-2 bg-brand-orange-dark text-white rounded-full p-1 shadow-md z-10">
                                        <CheckCircle className="w-4 h-4 fill-white text-brand-orange-dark" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-sm border border-brand-gray shrink-0 bg-brand-gray-light flex flex-col items-center justify-center text-brand-black-light group">
                                <span className="text-type-body font-bold">No Image</span>
                                {isSelected && (
                                    <div className="absolute top-2 left-2 bg-brand-orange-dark text-white rounded-full p-1 shadow-md z-10">
                                        <CheckCircle className="w-4 h-4 fill-white text-brand-orange-dark" />
                                    </div>
                                )}
                            </div>
                        )}
                        <h2 className="text-type-title text-brand-black-dark tracking-tight leading-tight">
                            {place.name}
                        </h2>
                    </div>

                    {/* Action Bar (Personalization) */}
                    <div className="flex items-center justify-between mt-1">
                        <PlaceBadges place={place} />
                        <div className="ml-auto flex items-center gap-3">
                            {/* Compare Toggle Button */}
                            <button
                                onClick={() => toggleSelection(place)}
                                className={`relative rounded-full text-type-button transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 group ${isSelected
                                    ? 'bg-brand-orange-dark text-white px-4 py-2 border border-brand-orange-dark'
                                    : 'p-[2px] bg-gradient-to-r from-orange-400 via-rose-300 to-orange-400 hover:from-brand-orange-dark hover:via-rose-400 hover:to-brand-orange-dark'
                                    }`}
                            >
                                {isSelected ? (
                                    <div className="flex items-center gap-1.5">
                                        <Scale className="w-4 h-4" />
                                        <span>選択済み</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full transition-colors w-full h-full">
                                        <Scale className="w-4 h-4 text-brand-orange-dark" />
                                        <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">トレイに追加</span>
                                    </div>
                                )}
                            </button>

                            <ActionButtons place={place} uid={user?.uid} />
                        </div>
                    </div>

                    {/* Contact Info (Address, Access, Map Link) */}
                    <div className="flex flex-col gap-2 text-type-memo text-brand-blac mt-1">
                        {place.address && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>{place.address}</span>
                            </div>
                        )}

                        {/* HotPepper Access Info */}
                        {/* Nearest Station Info (Prioritized) */}
                        {(place.nearestStation || place.hotpepper?.access) && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>{place.nearestStation || place.hotpepper?.access}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Map className="w-4 h-4 shrink-0" />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Google Mapで見る
                            </a>
                        </div>
                    </div>

                    {/* Actions: Reservations */}
                    <div className="text-type-button mt-1 flex flex-wrap gap-3">
                        {/* HotPepper */}
                        {place.hotpepper?.url && (
                            <a
                                href={place.hotpepper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0033] hover:bg-[#D9002B] text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <span>ホットペッパーで予約</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}

                        {/* Tabelog (Search) */}
                        <a
                            href={`https://tabelog.com/rstLst/?vs=1&sw=${encodeURIComponent(place.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFC107] hover:bg-[#FFB300] text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <span>食べログで予約</span>
                            <ExternalLink className="w-4 h-4 text-white" />
                        </a>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-brand-black-light text-type-memo mt-1">
                        <RefreshCw className="w-3 h-3" />
                        <span className="tabular-nums">最終更新: {formatDate(place.updatedAt)}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('evaluation')}
                    className={`px-6 py-3 text-type-button transition-colors relative ${activeTab === 'evaluation'
                        ? 'text-brand-orange-dark'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    評価
                    {activeTab === 'evaluation' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('map')}
                    className={`px-6 py-3 text-type-button transition-colors relative ${activeTab === 'map'
                        ? 'text-brand-orange-dark'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    地図
                    {activeTab === 'map' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark" />
                    )}
                </button>
            </div>

            {/* Map Tab Content */}
            {activeTab === 'map' && (
                <div className="bg-white rounded-xl shadow-sm border border-brand-gray p-4 h-[500px] w-full">
                    {apiKey ? (
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '0.75rem' }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place.id}`}
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    )}
                </div>
            )}

            {/* Evaluation Tab Content */}
            {activeTab === 'evaluation' && (
                <>
                    {/* Score Display (True Score vs Google Score) */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Unified AI Score (Left - Prominent) */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-brand-orange-dark flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange-dark to-brand-orange-dark/80"></div>
                            <h3 className="text-type-subtitle text-brand-orange-dark mb-2">AI分析スコア</h3>
                            <div className="flex items-baseline">
                                <span className="text-type-title text-brand-orange-dark tabular-nums">{yourScore.toFixed(1)}</span>
                                <span className="text-type-subtitle text-brand-orange-dark ml-1">/5.0</span>
                            </div>
                            <div className="flex items-center mt-2 text-brand-orange-dark">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.round(yourScore) ? 'fill-current' : 'text-brand-gray-dark'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-type-memo text-gray-400 mt-4 text-center">
                                ※信頼度の高い上位5件のレビューをもとに<br />算出しています
                            </p>
                        </div>

                        {/* Google Map Score (Right - Standard) */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
                            <h3 className="text-type-subtitle text-brand-black-light mb-2">Google Map</h3>
                            <div className="flex items-baseline">
                                <span className="text-type-title text-brand-black-light tabular-nums">{place.originalRating.toFixed(1)}</span>
                                <span className="text-type-subtitle text-brand-black-light ml-1">/5.0</span>
                            </div>
                            <div className="flex items-center mt-2 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.round(place.originalRating) ? 'fill-current' : 'text-brand-gray-dark'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-type-memo text-brand-black-light mt-2">
                                <span className="tabular-nums">{place.userRatingsTotal.toLocaleString()}</span> 件の評価
                            </p>
                        </div>
                    </div>

                    {/* 1. Charts & Metrics */}
                    {/* 1. Charts & Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                        {/* Radar Chart */}
                        <div className="col-span-1 lg:col-span-1 bg-white rounded-2xl md:rounded-3xl shadow-lg border border-brand-gray p-3 md:p-8 h-auto aspect-square md:aspect-auto md:h-96 flex flex-col justify-center">
                            <h3 className="text-type-body font-semibold text-brand-black mb-2 md:mb-6 text-center md:text-left">バランス分析</h3>
                            <div className="flex-1 w-full min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickLine={false} />
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

                        {/* Metric Cards */}
                        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 content-start">
                            <MetricCard icon={Utensils} label="味" value={place.axisScores?.taste} />
                            <MetricCard icon={Heart} label="接客" value={place.axisScores?.service} />
                            <MetricCard icon={Sparkles} label="雰囲気" value={place.axisScores?.atmosphere} />
                            <MetricCard icon={TrendingUp} label="コスパ" value={place.axisScores?.cost} />
                        </div>
                    </div>

                    {/* 2. Summary & Gap Reason */}
                    <div className="space-y-6 mt-6">
                        <div className="bg-white rounded-3xl shadow-lg border border-brand-gray p-8">
                            <h3 className="text-type-subtitle text-brand-black-dark mb-4">AI分析サマリー</h3>
                            <div className="flex flex-col gap-3">
                                {(Array.isArray(place.summary) ? place.summary : (place.summary as unknown as string).split('\n')).filter((line: string) => line.trim()).map((line: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 text-type-body text-brand-black">
                                        <Sparkles className="w-5 h-5 text-brand-orange-dark shrink-0 mt-1" />
                                        <span className="leading-relaxed">{line}</span>
                                    </div>
                                ))}
                            </div>

                            {place.gapReason && (
                                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                                    <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                                        <TrendingUp className="w-5 h-5" />
                                        スコア分析インサイト
                                    </h4>
                                    <p className="text-amber-900 text-type-body leading-relaxed">
                                        {place.gapReason}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. Detailed Analysis Matrix */}
                    {place.axisAnalysis && (
                        <div className="space-y-6">
                            <h3 className="text-type-subtitle font-bold text-brand-black-dark">評価軸別 詳細分析</h3>
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

                    {/* Usage Scores */}
                    <div className="bg-white rounded-3xl shadow-lg border border-brand-gray p-8 md:p-10">
                        <h3 className="text-type-subtitle text-brand-black-dark mb-8">どんなシーンにおすすめ？</h3>
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

                    {/* Basic Info Section */}
                    <BasicInfoSection place={place} />

                    {/* HotPepper Credit */}
                    {place.hotpepper && (
                        <div className="pb-8">
                            <HotPepperCredit />
                        </div>
                    )}
                </>
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

function MetricCard({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-white p-3 md:p-6 rounded-2xl border border-brand-gray shadow-sm hover:shadow-md transition-shadow flex items-center md:items-start gap-3 md:gap-4 h-full">
            <div className="p-2 md:p-3 rounded-xl bg-brand-gray-light text-brand-black shrink-0">
                <Icon className="w-4 h-4 md:w-6 md:h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-type-body font-semibold text-brand-black truncate mr-1">{label}</h4>
                    <span className="text-type-subtitle text-brand-black tabular-nums">{value?.toFixed(1)}</span>
                </div>
                <div className="h-1.5 md:h-2 bg-brand-gray rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-black rounded-full transition-all duration-1000"
                        style={{ width: `${(value / 5) * 100}%` }}
                    ></div>
                </div>
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




