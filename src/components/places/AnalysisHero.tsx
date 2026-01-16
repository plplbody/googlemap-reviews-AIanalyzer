'use client';

import { Place } from '@/types/schema';
import { PlaceBadges } from '@/components/PlaceBadges';
import { ActionButtons } from '@/components/ActionButtons';
import { useComparison } from '@/contexts/ComparisonContext';
import { useAuth } from '@/lib/firebase/auth';
import { Scale, CheckCircle, MapPin, ExternalLink, RefreshCw, Banknote, Train } from 'lucide-react';

interface AnalysisHeroProps {
    place: Place;
}

export function AnalysisHero({ place }: AnalysisHeroProps) {
    const { user } = useAuth();
    const { selectedPlaces, toggleSelection } = useComparison();
    const isSelected = selectedPlaces.some(p => p.id === place.id);

    // Dynamic background image or fallback gradient
    const bgStyle = place.hotpepper?.imageUrl
        ? { backgroundImage: `url(${place.hotpepper.imageUrl})` }
        : undefined;

    // Helper to format date safely
    const formatDate = (date: any) => {
        if (!date) return '-';
        try {
            // Handle Firestore Timestamp
            if (date.toDate && typeof date.toDate === 'function') {
                return date.toDate().toLocaleDateString('ja-JP');
            }
            // Handle native Date or string
            return new Date(date).toLocaleDateString('ja-JP');
        } catch (e) {
            return '-';
        }
    };

    return (
        <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-brand-gray group bg-white">
            {/* 1. Top Section: Title & Info with Background Image */}
            <div className="relative">
                {/* Background Image / Overlay */}
                <div className={`absolute inset-0 bg-cover bg-center ${!bgStyle ? 'bg-gradient-to-br from-brand-gray-dark via-brand-gray to-brand-orange' : ''}`} style={bgStyle}>
                    <div className="absolute inset-0 bg-black/70" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-6 md:p-8 text-white">
                    {/* Main Title Area */}
                    <div className="space-y-3">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                            {place.name}
                        </h1>

                        <div className="flex flex-col gap-2 text-type-memo text-brand-gray font-medium">
                            {/* Price Range */}
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                    <Banknote className="w-3.5 h-3.5" />
                                </div>
                                <span>
                                    {(() => {
                                        if (place.priceRange?.startPrice || place.priceRange?.endPrice) {
                                            const s = place.priceRange.startPrice?.units;
                                            const e = place.priceRange.endPrice?.units;
                                            return `${s ? '¥' + Number(s).toLocaleString() : ''}〜${e ? '¥' + Number(e).toLocaleString() : ''}`;
                                        }
                                        switch (place.priceLevel) {
                                            case 'PRICE_LEVEL_FREE': return '無料';
                                            case 'PRICE_LEVEL_INEXPENSIVE': return '〜¥1,000';
                                            case 'PRICE_LEVEL_MODERATE': return '¥1,000〜¥3,000';
                                            case 'PRICE_LEVEL_EXPENSIVE': return '¥3,000〜¥10,000';
                                            case 'PRICE_LEVEL_VERY_EXPENSIVE': return '¥10,000〜';
                                            default: return '予算不明';
                                        }
                                    })()}
                                </span>
                            </div>

                            {/* Station Info */}
                            {(place.hotpepper?.station || place.nearestStation || place.hotpepper?.access) && (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                        <Train className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{place.nearestStation || '不明'}</span>
                                </div>
                            )}

                            {/* Address */}
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                    <MapPin className="w-3.5 h-3.5" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span>{place.address || '住所情報なし'}</span>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sky-300 hover:text-sky-500"
                                    >
                                        Google Mapで見る
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Middle Section: Badges (White Background) */}
            <div className="bg-white px-4 py-2 border-brand-gray-light">
                <div className="flex flex-wrap items-center gap-2">
                    <PlaceBadges place={place} />
                </div>
            </div>

            {/* 3. Bottom Section: Action Buttons (White Background) */}
            <div className="bg-white px-4 pt-2 pb-6 border-t border-brand-gray-light">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
                    {/* Left: User Actions */}
                    <div className="flex items-center gap-3">
                        <ActionButtons place={place} uid={user?.uid} />

                        <button
                            onClick={() => toggleSelection(place)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm active:scale-95 ${isSelected
                                ? 'bg-brand-orange text-white border border-brand-orange-light shadow-md'
                                : 'bg-white border border-brand-gray text-brand-black hover:bg-brand-gray-light'
                                }`}
                        >
                            {isSelected ? <CheckCircle className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                            {isSelected ? '選択済み' : '比較する'}
                        </button>
                    </div>

                    {/* Right: Reservation Links */}
                    <div className="flex items-center gap-3">
                        {place.hotpepper?.url && (
                            <a
                                href={place.hotpepper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF0033] hover:bg-[#D9002B] text-brand-gray rounded-full text-type-button shadow-md transition-transform hover:-translate-y-0.5"
                            >
                                HotPepper
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                        <a
                            href={`https://tabelog.com/rstLst/?vs=1&sw=${encodeURIComponent(place.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-brand-gray-light rounded-full text-type-button shadow-md transition-transform hover:-translate-y-0.5"
                        >
                            食べログ
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
