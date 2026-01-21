import Link from 'next/link';
import { Metadata } from 'next';
import { REGULATIONS, PREFECTURES } from '@/constants/seo-areas';
import { ChevronRight, Map } from 'lucide-react';

export const metadata: Metadata = {
    title: '全国のグルメ・レストランランキング - AI Concierge',
    description: 'AIが分析した日本全国のレストランランキング。北海道から沖縄まで、47都道府県の厳選グルメをエリアと利用シーンから探せます。',
};

export default function RankingsHubPage() {
    return (
        <div className="min-h-screen bg-brand-gray-light pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-brand-orange transition-colors">Top</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="font-medium text-brand-black" aria-current="page">全国エリア一覧</span>
                </nav>

                <div className="bg-white rounded-xl shadow-sm border border-brand-gray p-8 md:p-12">
                    <header className="mb-12 text-center">
                        <h1 className="text-3xl font-bold text-brand-black mb-4">
                            全国の厳選グルメ
                        </h1>
                        <p className="text-gray-500">
                            AIが分析した日本全国のレストランを、47都道府県から探せます。
                        </p>
                    </header>

                    {/* Regions List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {REGULATIONS.map((region) => (
                            <section key={region.id} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0 md:border-b-0 md:pb-0">
                                <h2 className="flex items-center text-xl font-bold text-brand-black mb-4 border-l-4 border-brand-orange pl-3">
                                    {region.name}
                                </h2>

                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {region.prefs.map(prefId => {
                                        const pref = PREFECTURES.find(p => p.id === prefId);
                                        if (!pref) return null;
                                        return (
                                            <Link
                                                key={pref.id}
                                                href={`/rankings/${pref.id}`}
                                                className="flex items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-brand-orange/10 text-brand-black/80 hover:text-brand-orange text-sm font-medium transition-colors"
                                            >
                                                {pref.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
