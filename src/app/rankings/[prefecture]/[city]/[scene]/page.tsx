import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { validateRankingParams, generateStaticParams } from '@/utils/seo-helpers';
import { getRankingPlaces, getPrefectureStats } from '@/server/actions/ranking';


import { getPrefectureName, getCityName, getSceneName } from '@/constants/seo-areas';
import RankingPlaceList from '@/components/ranking/RankingPlaceList';
import RankingBreadcrumbs from '@/components/ranking/RankingBreadcrumbs';
import RankingHeaderWrapper from '@/components/ranking/RankingHeaderWrapper';
import RankingNavigation from '@/components/ranking/RankingNavigation';
import { ComparisonTray } from '@/components/ComparisonTray';

import { Place } from '@/types/schema';

interface PageProps {
    params: Promise<{
        prefecture: string;
        city: string;
        scene: string;
    }>;
}

// ISR Configuration (24 hours)
export const revalidate = 86400;
export const dynamicParams = true; // Allow paths not returned by generateStaticParams (On-demand ISR)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { prefecture, city, scene } = await params;
    if (!validateRankingParams(prefecture, city, scene)) {
        notFound();
    }

    const prefName = getPrefectureName(prefecture);
    const cityName = getCityName(prefecture, city);
    const sceneName = getSceneName(scene);

    // Check availability for SEO (NoIndex strategy)
    // We strictly check count to avoid indexing low quality pages.
    const places = await getRankingPlaces(prefecture, city, scene);
    // Optimization: If getRankingPlaces is cached or lightweight, this is fine.
    // If expensive, consider a lightweight 'count' query, but we need data later anyway.
    // Next.js Request Memoization might dedup this call if it matches exactly.
    // However, server actions are POST by default and not memoized like GET fetch.
    // We assume the DB cost is acceptable for the SEO benefit or use React cache (future opt).

    const isLowQuality = places.length < 3;
    const robots = isLowQuality ? { index: false, follow: true } : { index: true, follow: true };

    const title = `${cityName}の${sceneName}向きレストランランキングTOP100【AI分析】 | AI Concierge`;
    const description = `AIが分析した${cityName}（${prefName}）の${sceneName}に最適な厳選レストランランキング。Googleマップの口コミを深層分析し、本当に満足度の高いお店だけを提案します。`;

    return {
        title,
        description,
        robots,
    };
}

// Generate all valid paths at build time (Empty now for ISR)
export { generateStaticParams };

export default async function RankingPage({ params }: PageProps) {
    const { prefecture, city, scene } = await params;

    // 1. Validation
    if (!validateRankingParams(prefecture, city, scene)) {
        notFound();
    }

    // 2. Fetch Data
    const places = await getRankingPlaces(prefecture, city, scene);

    // Fetch stats for internal link validation
    const validStats = await getPrefectureStats(prefecture);



    // 3. Empty State SEO Handling
    const isLowQuality = places.length < 3;

    // ...


    const prefName = getPrefectureName(prefecture);
    const cityName = getCityName(prefecture, city);
    const sceneName = getSceneName(scene);

    // 4. Generate JSON-LD (Schema.org/ItemList)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': `${cityName}の${sceneName}向きレストランランキングTOP100`,
        'description': `AIが選定した${cityName}の${sceneName}におすすめのレストランランキング。`,
        'itemListElement': places.map((place, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Restaurant',
                'name': place.name,
                'image': place.hotpepper?.imageUrl || undefined,
                'address': place.address || undefined
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <RankingHeaderWrapper />
            <div className="container mx-auto px-4 py-8 pt-24 max-w-5xl">
                {/* Breadcrumbs */}
                <RankingBreadcrumbs prefecture={prefecture} city={city} scene={scene} />

                {/* Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-type-title font-extrabold text-brand-black mb-4 leading-tight">
                        <span className="text-brand-orange block text-type-subtitle font-bold mb-2 tracking-widest">AI分析スコアランキング</span>
                        {cityName}の<span className="text-brand-orange-dark">{sceneName}</span>で失敗しないお店TOP100
                    </h1>
                    <p className="text-brand-black-light text-type-body max-w-2xl mx-auto">
                        AIが数千件の口コミを読み込み、味・接客・雰囲気をスコアリング。<br />
                        {cityName}で失敗しない{sceneName}のお店を厳選しました。
                    </p>
                </header>

                {/* Data Availability Check */}
                {isLowQuality ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center my-12">
                        <div className="text-4xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">現在データを収集中です</h3>
                        <p className="text-gray-500 mb-6">
                            申し訳ありません。このエリア・条件でのランキングは現在作成中です。<br />
                            近隣のエリアや他の条件でお探しください。
                        </p>
                    </div>
                ) : (
                    /* Ranking List */
                    <RankingPlaceList places={places} />
                )}

                {/* Internal Navigation (Nearby Areas/Scenes) */}
                <RankingNavigation
                    currentPrefecture={prefecture}
                    currentCity={city}
                    currentScene={scene}
                    validStats={validStats}
                />
            </div>

            <ComparisonTray focusedScenes={[scene]} />
        </>
    );
}
