import { Sparkles, Heart, Award } from "lucide-react";

export default function ServiceBenefits() {
    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-[repeat(3,minmax(0,300px))] gap-4 text-center justify-center">
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-brand-gray-light flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-brand-orange-dark" />
                        </div>
                        <h3 className="text-type-body font-bold text-brand-black">客観的なAI評価</h3>
                        <p className="text-type-memo text-brand-black-light leading-relaxed">
                            AIが口コミを公平に分析します。
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-brand-gray-light flex items-center justify-center">
                            <Heart className="w-8 h-8 text-rose-500" />
                        </div>
                        <h3 className="text-type-body font-bold text-brand-black">あなただけのマッチ度</h3>
                        <p className="text-type-memo text-brand-black-light leading-relaxed">
                            AIがあなたの好みと相性を瞬時に計算します。
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 group">
                        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-brand-gray-light flex items-center justify-center">
                            <Award className="w-8 h-8 text-[#C5A059]" />
                        </div>
                        <h3 className="text-type-body font-bold text-brand-black">失敗しないお店選び</h3>
                        <p className="text-type-memo text-brand-black-light leading-relaxed">
                            AIが利用シーンに合わせて最適なお店を提案します。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
