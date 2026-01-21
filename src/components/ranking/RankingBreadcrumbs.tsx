import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getPrefectureName, getCityName, getSceneName } from '@/constants/seo-areas';

interface RankingBreadcrumbsProps {
    prefecture: string;
    city: string;
    scene: string;
}

export default function RankingBreadcrumbs({ prefecture, city, scene }: RankingBreadcrumbsProps) {
    const prefName = getPrefectureName(prefecture);
    const cityName = getCityName(prefecture, city);
    const sceneName = getSceneName(scene);

    return (
        <nav className="flex items-center text-sm text-brand-black-light mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-brand-orange transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>Top</span>
            </Link>

            <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />

            <span className="font-medium text-brand-black">{prefName}</span>

            <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />

            <span className="font-medium text-brand-black">{cityName}</span>

            <ChevronRight className="w-4 h-4 mx-2 text-brand-gray-dark" />

            <span className="font-bold text-brand-orange-dark">{sceneName}</span>
        </nav>
    );
}
