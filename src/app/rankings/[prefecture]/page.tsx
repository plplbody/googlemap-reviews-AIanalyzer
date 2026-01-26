import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { validateRankingParams } from '@/utils/seo-helpers';
import { getRankingPlaces, getPrefectureStats } from '@/server/actions/ranking';
import { PREFECTURES, CITIES, SCENES, getPrefectureName } from '@/constants/seo-areas';
import { GOJYUON_ROWS, getGojyuonRow, normalizeForSort } from '@/utils/jp-formatting';
import { ChevronRight, MapPin } from 'lucide-react';
import RankingBreadcrumbs from '@/components/ranking/RankingBreadcrumbs';

interface PageProps {
    params: Promise<{
        prefecture: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const { prefecture } = resolvedParams;
    const isValid = validateRankingParams(prefecture);

    if (!isValid) {
        notFound();
    }

    const prefName = getPrefectureName(prefecture);

    return {
        title: `${prefName}のグルメ・レストランランキング - AI Concierge`,
        description: `${prefName}の厳選されたレストランをAIが分析。デート、一人メシ、接待など、利用シーンに合わせて最適な一軒をご提案します。`,
    };
}

export function generateStaticParams() {
    return PREFECTURES.map((pref) => ({
        prefecture: pref.id,
    }));
}

// ISR: Revalidate every 24 hours to update link validity based on new data
export const revalidate = 86400;

export default async function PrefectureDirectoryPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { prefecture } = resolvedParams;

    if (!validateRankingParams(prefecture)) {
        notFound();
    }

    const prefName = getPrefectureName(prefecture);
    // @ts-ignore
    const citiesInPref = CITIES[prefecture] || [];

    // Fetch stats for Link Pruning (SEO Best Practice)
    // Only generate links for pages with 3+ items.
    const validKeys = await getPrefectureStats(prefecture);

    return (
        <div className="min-h-screen bg-brand-gray-light pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <RankingBreadcrumbs prefecture={prefecture} />

                <div className="bg-white rounded-xl shadow-sm border border-brand-gray p-8">
                    <header className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-brand-black mb-4">
                            {prefName}の厳選グルメ
                        </h1>
                        <p className="text-gray-500">
                            AIが分析した{prefName}のレストランを、エリアと利用シーンから探せます。
                        </p>
                    </header>

                    {/* City List */}
                    {citiesInPref.length > 0 ? (
                        (() => {
                            // Group and Sort
                            const grouped = citiesInPref.reduce((acc: Record<string, any[]>, city: any) => {
                                const row = getGojyuonRow(city.id);
                                if (!acc[row.label]) acc[row.label] = [];
                                acc[row.label].push(city);
                                return acc;
                            }, {} as Record<string, typeof citiesInPref>);

                            const rowKeys = GOJYUON_ROWS.map(r => r.label).filter(l => grouped[l]?.length > 0);

                            // Sort cities within groups
                            rowKeys.forEach(key => {
                                grouped[key].sort((a: any, b: any) => normalizeForSort(a.id).localeCompare(normalizeForSort(b.id)));
                            });

                            return (
                                <>
                                    {/* 50-on Index */}
                                    <div className="flex flex-wrap gap-2 mb-12 p-6 bg-brand-gray-light/30 rounded-xl border border-brand-gray/50">
                                        <div className="text-sm font-bold text-gray-500 mr-2 py-1">五十音：</div>
                                        {GOJYUON_ROWS.map((row) => {
                                            const hasCities = grouped[row.label]?.length > 0;
                                            if (!hasCities) return (
                                                <span key={row.label} className="px-3 py-1 text-sm text-gray-300 select-none">
                                                    {row.label.charAt(0)}
                                                </span>
                                            );
                                            return (
                                                <a
                                                    key={row.label}
                                                    href={`#row-${row.id}`}
                                                    className="px-3 py-1 text-sm font-medium text-brand-black bg-white border border-brand-gray rounded-md hover:border-brand-orange hover:text-brand-orange transition-colors"
                                                >
                                                    {row.label}
                                                </a>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-16">
                                        {rowKeys.map(label => {
                                            const rowDef = GOJYUON_ROWS.find(r => r.label === label);
                                            return (
                                                <div key={label} id={`row-${rowDef?.id}`} className="scroll-mt-24">
                                                    <h3 className="text-lg font-bold text-gray-400 border-b border-gray-200 pb-2 mb-6">
                                                        {label}
                                                    </h3>
                                                    <div className="space-y-12">
                                                        {grouped[label].map((city: any) => (
                                                            <section key={city.id} className="border-b border-gray-100 last:border-0 pb-12 last:pb-0">
                                                                <h2 className="flex items-center text-xl font-bold text-brand-black mb-6">
                                                                    <MapPin className="w-5 h-5 text-brand-orange mr-2" />
                                                                    {city.name}
                                                                </h2>

                                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                                                    {SCENES.map((scene) => {
                                                                        const key = `${city.id}:${scene.slug}`;
                                                                        const isValid = validKeys.has(key);

                                                                        if (isValid) {
                                                                            return (
                                                                                <Link
                                                                                    key={scene.slug}
                                                                                    href={`/rankings/${prefecture}/${city.id}/${scene.slug}`}
                                                                                    className="group flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all"
                                                                                >
                                                                                    <span className="text-sm font-medium text-brand-black group-hover:text-brand-orange">
                                                                                        {scene.label}
                                                                                    </span>
                                                                                </Link>
                                                                            );
                                                                        } else {
                                                                            // Link Pruning: Render as non-link text for SEO safety
                                                                            return (
                                                                                <div
                                                                                    key={scene.slug}
                                                                                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-gray-100 bg-gray-50/50 cursor-default"
                                                                                >
                                                                                    <span className="text-sm font-medium text-gray-300">
                                                                                        {scene.label}
                                                                                    </span>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    })}
                                                                </div>
                                                            </section>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            );
                        })()
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            現在、このエリアの登録済みエリアはありません。
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
