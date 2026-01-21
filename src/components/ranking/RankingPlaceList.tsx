'use client';

import { Place } from '@/types/schema';
import PlaceListItem from '@/components/PlaceListItem';
import { useRouter } from 'next/navigation';

interface RankingPlaceListProps {
    places: Place[];
}

export default function RankingPlaceList({ places }: RankingPlaceListProps) {
    const router = useRouter();

    if (places.length === 0) {
        return (
            <div className="py-20 text-center bg-brand-gray-light/30 rounded-3xl border border-dashed border-brand-gray">
                <p className="text-brand-black-light font-bold">
                    該当する店舗が見つかりませんでした。<br />
                    条件を変更して検索してみてください。
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, index) => (
                <div key={place.id} className="relative">
                    {/* Rank Badge */}
                    <div className={`
                        absolute -top-3 -left-3 z-20 w-10 h-10 flex items-center justify-center 
                        text-white font-black text-lg rounded-full shadow-lg border-2 border-white
                        ${index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-200' :
                            index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 shadow-gray-200' :
                                index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-800 shadow-orange-200' :
                                    'bg-brand-black text-brand-gray border-brand-gray'}
                    `}>
                        {index + 1}
                    </div>

                    <div className="h-full transform transition-all hover:-translate-y-1">
                        <PlaceListItem
                            place={place}
                            onSelect={(id) => router.push(`/?view=DETAIL&id=${id}`)}
                        // Pass empty functions for interactive elements to prevent errors if they are required, 
                        // though PlaceListItem implementation seems to handle optionals gracefully.
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
