import Link from 'next/link';
import { REGULATIONS, PREFECTURES } from '@/constants/seo-areas';

// ... (inside Footer component)

{/* Areas Grouped by Region */ }
{
    REGULATIONS.map((region) => (
        <div key={region.id}>
            <h4 className="font-bold mb-3 border-b border-gray-700 pb-2 text-sm text-gray-300">{region.name}</h4>
            {region.prefs.map((prefId) => {
                const pref = PREFECTURES.find(p => p.id === prefId);
                if (!pref) return null;
                return (
                    <Link
                        key={pref.id}
                        href={`/rankings/${pref.id}`}
                        className="text-gray-400 hover:text-brand-orange transition-colors text-xs"
                    >
                        {pref.name}
                    </Link>
                );
            })}
        </div>
    ))
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-black text-white pt-4 pb-4 border-t border-brand-gray-dark">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Area Search Link */}
                <Link
                    href="/rankings"
                    className="font-bold text-type-memo text-white/80 hover:text-brand-orange transition-colors inline-flex items-center"
                >
                    エリアから探す
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>

                <div className="mt-2 text-type-memo text-brand-black-light">
                    <p>&copy; {currentYear} AI Concierge for Gourmet. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
