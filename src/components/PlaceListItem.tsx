import { Place } from '@/types/schema';
import { Star, MapPin, ChevronRight, Loader2, Train, Scale, DollarSign, Sparkles, CheckCircle, Pencil } from 'lucide-react';
import { PlaceBadges } from '@/components/PlaceBadges';
import { SakuraBadge } from '@/components/ui/SakuraBadge';
import { updateStationInfo } from '@/server/actions/station';
import { useEffect, useState } from 'react';
import { ActionButtons } from '@/components/ActionButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useComparison } from '@/contexts/ComparisonContext';
import MemoModal from './MemoModal';

interface PlaceListItemProps {
    place: Place;
    onSelect: (placeId: string) => void;
    focusedAxes?: string[];
    focusedScenes?: string[];
    personalizedScore?: number;
    onActionComplete?: () => void;
    isVisited?: boolean;
    onToggleVisited?: (visited: boolean) => void;
    viewMode?: 'DEFAULT' | 'PROFILE'; // Explicit view context
    initialInteraction?: import('@/types/user').UserInteraction;

    // Memo Props
    memo?: string;
    repeat?: 'yes' | 'no' | 'maybe';
    onUpdateMemo?: (memo: string, repeat: 'yes' | 'no' | 'maybe') => Promise<void>;
}

export default function PlaceListItem({
    place,
    onSelect,
    focusedAxes = [],
    focusedScenes = [],
    onActionComplete,
    isVisited = false,
    onToggleVisited,
    viewMode = 'DEFAULT',
    memo,
    repeat,
    onUpdateMemo,
    ...props
}: PlaceListItemProps) {
    const { user } = useAuth();
    const { selectedPlaces, toggleSelection } = useComparison();
    const [isMemoOpen, setIsMemoOpen] = useState(false);

    // Check if selected
    const isSelected = selectedPlaces.some(p => p.id === place.id);

    const isAnalyzed = place.status === 'completed' && place.trueScore !== undefined;
    const isAnalyzing = place.status === 'pending' || place.status === 'processing';

    // Unified Score: Use Personalized if avail, else fallback to AI Score (trueScore), else 0
    const yourScore = props.personalizedScore ?? place.trueScore ?? 0;

    // Async trigger for station info
    useEffect(() => {
        if (!place.id || !place.location || place.nearestStation !== undefined) return;
        updateStationInfo(place.id, place.location.lat, place.location.lng);
    }, [place.id, place.location, place.nearestStation]);

    return (
        <div
            onClick={() => onSelect(place.id)}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border transition-all duration-300 cursor-pointer group flex flex-col h-full select-none active:scale-[0.98] active:bg-brand-gray-light relative overflow-hidden ${isSelected ? 'border-brand-orange-dark ring-1 ring-brand-orange-dark' : 'border-brand-gray'}`}
        >
            {/* 1. Hero Section (Background Image + Info) */}
            <div className="relative min-h-48 bg-brand-gray-dark transition-all duration-500">
                {/* Background Image */}
                {place.hotpepper?.imageUrl ? (
                    <img
                        src={place.hotpepper.imageUrl}
                        alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-gray-light text-brand-black-light">
                        <span className="text-type-memo font-bold">No Image</span>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />


                {/* Hero Content Wrapper (Flex Layout) */}
                <div className="relative z-10 h-full flex flex-col justify-between p-4">

                    {/* Top: Profile Context Section */}
                    <div className="flex justify-start">
                        {viewMode === 'PROFILE' && (
                            <div className="max-w-full">
                                <div className="mb-4 flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        {/* Visited Toggle */}
                                        {onToggleVisited && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleVisited(!isVisited);
                                                }}
                                                className={`h-12 px-4 rounded-full shadow-sm border transition-all flex items-center gap-2 text-type-button ${isVisited
                                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                                    : 'bg-white border-brand-gray text-brand-black-light hover:bg-emerald-50 hover:border-emerald-200'
                                                    }`}
                                            >
                                                {isVisited ? (
                                                    <>
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                        <span>来店済</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-gray-dark" />
                                                        <span>来店したらチェック</span>
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        {/* Edit Memo Button */}
                                        {isVisited && onUpdateMemo && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsMemoOpen(true);
                                                }}
                                                className={`flex items-center gap-2 h-12 px-4 rounded-full shadow-sm border transition-all text-type-button ${memo || repeat
                                                    ? 'bg-white border-brand-orange-light text-brand-orange-dark'
                                                    : 'bg-white border-brand-gray text-brand-black-light hover:bg-brand-orange-light/50 hover:border-brand-orange-light hover:text-brand-orange-dark'
                                                    }`}
                                            >
                                                <Pencil className="w-3 h-3" />
                                                <span>{memo || repeat ? 'メモ編集' : 'メモ記入'}</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Memo Content Display */}
                                    {(memo || repeat) && isVisited && (
                                        <div className="bg-white p-2 rounded-md flex flex-col">
                                            <div className="flex gap-2 text-type-body">
                                                {repeat && (
                                                    <div className="flex gap-1 shrink-0 items-center">
                                                        {repeat === 'yes' && <span className="px-2 py-1 bg-brand-orange/10 text-brand-orange-dark rounded rounded-md text-type-memo font-bold border border-brand-orange/20 whitespace-nowrap">リピートあり</span>}
                                                        {repeat === 'maybe' && <span className="px-2 py-1 bg-brand-orange/10 text-brand-orange-dark rounded rounded-md text-type-memo font-bold border border-brand-orange/20 whitespace-nowrap">迷う</span>}
                                                        {repeat === 'no' && <span className="px-2 py-1 bg-brand-gray-dark text-brand-black rounded rounded-md text-type-memo font-bold border border-brand-gray-dark whitespace-nowrap">リピートなし</span>}
                                                    </div>
                                                )}
                                                {memo && (
                                                    <div className="text-brand-black-dark leading-snug break-words max-h-20 overflow-y-auto w-full min-w-0">
                                                        {memo}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom: Title & Info */}
                    <div className="text-white mt-auto pt-4">
                        <h3 className="text-type-subtitle font-bold leading-tight mb-2 shadow-sm text-white drop-shadow-md">
                            {place.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-type-memo font-normal text-white/90">
                            {/* Price */}
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5" />
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
                            {/* Station */}
                            {place.nearestStation && (
                                <div className="flex items-center gap-1">
                                    <Train className="w-3.5 h-3.5" />
                                    <span>{place.nearestStation}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body Section */}
            <div className="p-4 flex flex-col flex-1 gap-4">


                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                    <SakuraBadge score={place.avgSakuraScore} />
                    <PlaceBadges place={place} />
                </div>

                {/* AI Analysis Score Section (Simplified) */}
                <div className="p-4 border-t border-brand-gray-dark relative">
                    {isAnalyzed ? (
                        <div className="flex flex-col gap-3">
                            {/* Unified Score Display Row */}
                            <div className="flex justify-between items-end">
                                {/* AI Score (Left - Prominent) */}
                                <div>
                                    <span className="text-type-memo font-bold block mb-1 text-brand-orange-dark uppercase tracking-wider">AI分析スコア</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-type-title font-black text-brand-orange-dark leading-none tracking-tight">
                                            {yourScore?.toFixed(1) || '0.0'}
                                        </span>
                                        <div className="flex text-brand-orange-dark">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.round(yourScore || 0) ? 'fill-current' : 'text-brand-gray-dark'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Google Score (Right - Subtle) */}
                                <div className="text-right">
                                    <span className="text-[10px] block mb-0.5 text-brand-black-light font-normal">Google評価</span>
                                    <div className="flex items-center justify-end gap-1">
                                        <Star className="w-3.5 h-3.5 text-brand-yellow fill-current" />
                                        <span className="text-type-memo tabular-nums text-brand-black-light font-bold">
                                            {place.originalRating?.toFixed(1) || '0.0'}
                                        </span>
                                        <span className="text-[10px] text-brand-black-light">({place.userRatingsTotal.toLocaleString()})</span>
                                    </div>
                                </div>
                            </div>

                            {/* AI Summary */}
                            {place.summary && (
                                <div className="flex flex-col gap-1 text-type-memo text-brand-black leading-relaxed">
                                    {(Array.isArray(place.summary) ? place.summary : (place.summary as unknown as string).split('\n')).filter((line: string) => line.trim()).map((line: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <Sparkles className="w-3.5 h-3.5 text-brand-orange-dark shrink-0 mt-0.5" />
                                            <span className="">{line}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : isAnalyzing ? (
                        <div className="flex items-center justify-center py-4 gap-2 text-brand-orange-dark">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="text-type-body font-normal">AI分析中...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-4 text-brand-black-light text-type-body font-normal">
                            分析待ち
                        </div>
                    )}
                </div>

                {/* Footer Action Area (Simplified) */}
                <div className="mt-auto flex items-center justify-between">
                    {/* Action Buttons */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <ActionButtons
                            place={place}
                            uid={user?.uid}
                            onActionComplete={onActionComplete}
                            initialInteraction={props.initialInteraction}
                        />
                    </div>

                    {/* Compare Toggle (Chip Style) */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSelection(place);
                        }}
                        className={`rounded-full px-4 py-2 text-type-memo font-bold transition-all duration-300 shadow-sm border ${isSelected
                            ? 'bg-brand-orange-dark text-white border-brand-orange-dark'
                            : 'bg-white text-brand-black-light border-brand-gray hover:border-brand-orange-dark hover:text-brand-orange-dark'
                            }`}
                    >
                        {isSelected ? (
                            <div className="flex items-center gap-2">
                                <Scale className="w-3.5 h-3.5" />
                                <span>選択中</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Scale className="w-3.5 h-3.5" />
                                <span>比較する</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Profile Context Memo Display (Inline in Body if needed, or Overlay?) */}
            {/* User logic for Memo in previous Profile was a bit complex. Simplified here: If pure visual, maybe show memo icon in hero. */}
            {/* If there's a specific memo to display, let's put it in the body? Or keep it hidden until clicked? */}
            {/* Keeping it simple as per "Minimalist" request. The edit button is enough to verify existence. */}

            {/* Memo Modal */}
            {onUpdateMemo && (
                <MemoModal
                    isOpen={isMemoOpen}
                    onClose={() => setIsMemoOpen(false)}
                    onSave={onUpdateMemo}
                    initialMemo={memo}
                    initialRepeat={repeat}
                />
            )}
        </div>
    );
}
