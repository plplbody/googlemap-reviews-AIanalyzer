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
            {/* 1. Top Section: Title & Info with Background Image */}
            <div className="relative h-64 md:h-80 w-full bg-brand-gray-dark">
                {/* Background Image */}
                {place.hotpepper?.imageUrl ? (
                    <img
                        src={place.hotpepper.imageUrl}
                        alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-gray-light text-brand-black-light">
                        <span className="text-sm font-bold">No Image</span>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

                {/* Content Container (Bottom Aligned) */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-md mb-3">
                        {place.name}
                    </h1>

                    <div className="flex flex-col gap-2 text-white/95 font-medium text-sm md:text-base">
                        {/* Price Range */}
                        {(() => {
                            let priceText = '';
                            if (place.priceRange?.startPrice || place.priceRange?.endPrice) {
                                const s = place.priceRange.startPrice?.units;
                                const e = place.priceRange.endPrice?.units;
                                priceText = `${s ? '¥' + Number(s).toLocaleString() : ''}〜${e ? '¥' + Number(e).toLocaleString() : ''}`;
                            } else {
                                switch (place.priceLevel) {
                                    case 'PRICE_LEVEL_FREE': priceText = '無料'; break;
                                    case 'PRICE_LEVEL_INEXPENSIVE': priceText = '〜¥1,000'; break;
                                    case 'PRICE_LEVEL_MODERATE': priceText = '¥1,000〜¥3,000'; break;
                                    case 'PRICE_LEVEL_EXPENSIVE': priceText = '¥3,000〜¥10,000'; break;
                                    case 'PRICE_LEVEL_VERY_EXPENSIVE': priceText = '¥10,000〜'; break;
                                    default: priceText = '予算不明'; break;
                                }
                            }
                            return (
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                        <Banknote className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{priceText}</span>
                                </div>
                            );
                        })()}

                        {/* Station Info */}
                        {(place.hotpepper?.station || place.nearestStation || place.hotpepper?.access) && (
                            <div className="flex items-center gap-2">
                                <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                    <Train className="w-3.5 h-3.5" />
                                </div>
                                <span>{place.nearestStation || place.hotpepper?.station || place.hotpepper?.access || '不明'}</span>
                            </div>
                        )}

                        {/* Address */}
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <div className='flex items-center gap-3'>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-orange-light hover:text-brand-orange underline text-xs md:text-sm"
                                >
                                    Google Map
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Section: Action Buttons (White Background) */}
            <div className="bg-white px-4 pt-4 pb-4 border-t border-brand-gray-light">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
                    {/* Left: User Actions */}
                    <div className="flex items-center gap-3">
                        <ActionButtons place={place} uid={user?.uid} />

                        <button
                            onClick={() => toggleSelection(place)}
                            className={`rounded-full px-4 py-2 text-type-memo font-bold transition-all duration-300 shadow-sm border flex items-center gap-2 ${isSelected
                                ? 'bg-brand-orange-dark text-white border-brand-orange-dark'
                                : 'bg-white text-brand-black-light border-brand-gray hover:border-brand-orange-dark hover:text-brand-orange-dark'
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
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#FF0033] hover:bg-[#D9002B] text-brand-gray rounded-full text-type-button shadow-md transition-transform hover:-translate-y-0.5"
                            >
                                HotPepper
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                        <a
                            href={`https://tabelog.com/rstLst/?vs=1&sw=${encodeURIComponent(place.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-brand-gray-light rounded-full text-type-button shadow-md transition-transform hover:-translate-y-0.5"
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
