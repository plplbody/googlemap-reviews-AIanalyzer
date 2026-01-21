import Link from 'next/link';
import { CITIES, getCityName } from '@/constants/seo-areas';

interface AreaFilterProps {
    currentPrefecture: string;
    currentCity: string;
    currentScene: string;
}

export default function AreaFilter({ currentPrefecture, currentCity, currentScene }: AreaFilterProps) {
    // @ts-ignore
    const cities = CITIES[currentPrefecture] || [];

    if (cities.length === 0) return null;

    return (
        <section className="mb-8">
            <h3 className="text-xs font-bold text-brand-black-light mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-orange rounded-full"></span>
                エリアから探す ({getCityName(currentPrefecture, currentCity)}周辺)
            </h3>
            <div className="flex flex-wrap gap-2">
                {cities.map((city: any) => {
                    const isActive = city.id === currentCity;
                    return (
                        <Link
                            key={city.id}
                            href={`/rankings/${currentPrefecture}/${city.id}/${currentScene}`}
                            className={`
                px-4 py-2 rounded-full text-sm font-bold transition-all border
                ${isActive
                                    ? 'bg-brand-black text-white border-brand-black shadow-md'
                                    : 'bg-white text-brand-black-light border-brand-gray hover:border-brand-orange hover:text-brand-orange'}
              `}
                        >
                            {city.name}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
