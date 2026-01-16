import SearchInput from "@/components/ui/SearchInput";

interface HeroSectionProps {
    onSearchStart: () => void;
    onSearchComplete: (query: string) => void;
}

export default function HeroSection({ onSearchStart, onSearchComplete }: HeroSectionProps) {
    return (
        <section className="relative pt-32 pb-16 w-full flex flex-col items-center justify-center">
            {/* 背景画像 */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fine Dining"
                    className="w-full h-full object-cover brightness-[0.4]"
                />
            </div>

            {/* メインコンテンツ */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center gap-8">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-gray-dark tracking-tight text-shadow-lg leading-tight">
                        あなた専属の、<br />
                        <span className="text-brand-orange-dark">AIグルメコンシェルジュ</span>
                    </h1>
                    <p className="text-brand-gray text-type-body tracking-wide max-w-2xl mx-auto leading-relaxed">
                        口コミをAIが分析し、客観的に評価。<br />
                        あなたの好みに合わせて、<span className="text-brand-gray-dark font-medium">最適なお店</span>をご提案します。
                    </p>
                </div>

                <div className="mt-8 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <SearchInput
                        onSearchStart={onSearchStart}
                        onSearchComplete={onSearchComplete}
                    />
                </div>
            </div>
        </section>
    );
}
