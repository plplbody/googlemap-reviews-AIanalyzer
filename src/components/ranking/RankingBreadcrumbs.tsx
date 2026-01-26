import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getPrefectureName, getCityName, getSceneName } from '@/constants/seo-areas';

interface RankingBreadcrumbsProps {
    prefecture: string;
    city?: string;
    scene?: string;
}

export default function RankingBreadcrumbs({ prefecture, city, scene }: RankingBreadcrumbsProps) {
    const prefName = getPrefectureName(prefecture);
    const cityName = city ? getCityName(prefecture, city) : undefined;
    const sceneName = scene ? getSceneName(scene) : undefined;

    return (
        <nav className="flex items-center text-sm text-brand-black-light mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>Top</span>
            </Link>

            <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />

            {city ? (
                <Link href={`/rankings/${prefecture}`} className="hover:text-brand-orange transition-colors">
                    <span className="font-medium text-brand-black">{prefName}</span>
                </Link>
            ) : (
                <span className="font-bold text-brand-orange-dark">{prefName}</span>
            )}

            {cityName && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />
                    {scene ? (
                        // City level link or text? Usually we don't have a dedicated City page (it redirects).
                        // But conceptually it exists as a directory node.
                        // However, checking `src/app/rankings/[prefecture]/[city]/page.tsx`, it redirects to root.
                        // So we should probably just render text, OR link to a city-specific directory if we had one.
                        // Since we don't have a City hub page active, we'll just render text for now, 
                        // OR we render it as text if it's the leaf, or link if we implement City Hub later.
                        // For now, let's keep it simple: Text.
                        // Wait, previous impl has city as text.
                        <span className="font-medium text-brand-black">{cityName}</span>
                    ) : (
                        <span className="font-bold text-brand-orange-dark">{cityName}</span>
                    )}
                </>
            )}

            {sceneName && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />
                    <span className="font-bold text-brand-orange-dark">{sceneName}</span>
                </>
            )}
        </nav>
    );
}
