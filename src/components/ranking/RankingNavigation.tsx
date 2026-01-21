import Link from 'next/link';
import { CITIES, SCENES, getPrefectureName } from '@/constants/seo-areas';

interface RankingNavigationProps {
    currentPrefecture: string;
    currentCity: string;
    currentScene: string;
    validStats?: Set<string>;
}

export default function RankingNavigation({ currentPrefecture, currentCity, currentScene, validStats }: RankingNavigationProps) {
    const prefName = getPrefectureName(currentPrefecture);
    // @ts-ignore
    const cities = CITIES[currentPrefecture] || [];

    // Filter useful scenes (maybe limit to popular ones if too many, but currently small set)
    const scenes = SCENES;

    // Find nearby cities? (Just listing all cities in pref for now, or random subset if too many)
    const otherCities = cities.filter((c: any) => c.id !== currentCity).slice(0, 10);

    // Other scenes
    const otherScenes = scenes.filter(s => s.slug !== currentScene);

    // Helper to check validity
    const isValid = (cityId: string, sceneSlug: string) => {
        if (!validStats) return true; // If no stats provided, assume all valid (or false? Safe to show links usually)
        return validStats.has(`${cityId}:${sceneSlug}`);
    };

    const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            className="px-3 py-2 bg-white border border-brand-gray rounded-lg text-sm text-brand-black-light hover:border-brand-orange-dark hover:text-brand-orange-dark transition-colors"
        >
            {children}
        </Link>
    );

    return (
        <div className="mt-16 pt-10 border-t border-brand-gray-light">
            <h2 className="text-xl font-bold mb-6 text-brand-black">「{prefName}」の他のランキングを見る</h2>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Same City, Other Scenes */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-brand-orange-dark rounded-full"></span>
                        同じエリアで他のシーン
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {otherScenes.map(scene => {
                            if (!isValid(currentCity, scene.slug)) return null;
                            return (
                                <LinkButton
                                    key={scene.slug}
                                    href={`/rankings/${currentPrefecture}/${currentCity}/${scene.slug}`}
                                >
                                    {scene.label}
                                </LinkButton>
                            );
                        })}
                    </div>
                </div>

                {/* Other Cities, Same Scene */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-brand-orange-dark rounded-full"></span>
                        周辺エリアで探す
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {otherCities.map((city: any) => {
                            if (!isValid(city.id, currentScene)) return null;
                            return (
                                <LinkButton
                                    key={city.id}
                                    href={`/rankings/${currentPrefecture}/${city.id}/${currentScene}`}
                                >
                                    {city.name}
                                </LinkButton>
                            );
                        })}
                        <Link
                            href={`/rankings/${currentPrefecture}`}
                            className="px-3 py-2 bg-brand-gray-light text-brand-black-light rounded-lg text-sm hover:bg-brand-gray transition-colors"
                        >
                            全てのエリアを見る
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
