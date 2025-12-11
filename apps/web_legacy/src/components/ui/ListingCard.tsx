'use client';

import { Star } from 'lucide-react';

interface ListingCardProps {
    title: string;
    location: string;
    rating: number;
    price?: string;
    distance?: string;
    imageUrl: string;
    tags?: string[];
    onClick?: () => void;
}

export default function ListingCard({
    title,
    location,
    rating,
    price,
    imageUrl,
    tags,
    onClick
}: ListingCardProps) {
    return (
        <div
            className="group cursor-pointer flex flex-col gap-4"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
                {/* 画像表示エリア */}
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                    </div>
                )}

                {/* オーバーレイグラデーション（ホバー時の視認性向上） */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col gap-1">
                {/* タグリスト */}
                {tags && tags.length > 0 && (
                    <div className="flex gap-2 mb-1">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider font-medium text-[#E65100] border border-[#E65100]/20 px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#E65100] transition-colors duration-300 line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0 bg-[#FAFAFA] px-2 py-0.5 rounded-full border border-gray-100">
                        <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                        <span className="text-sm font-medium text-gray-700">{rating.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 font-sans">
                    <p>{location}</p>
                    <p className="font-medium text-gray-900">{price}</p>
                </div>
            </div>
        </div>
    );
}
