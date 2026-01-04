import Link from 'next/link';
import { ArrowLeft, Sparkles, Sliders, ShieldCheck, Scale, Binary } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif pb-24">
            {/* Header */}
            <header className="bg-white border-b border-brand-gray sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-brand-black/80 hover:text-brand transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        トップに戻る
                    </Link>
                    <div className="font-bold tracking-wider">ABOUT</div>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </header>

            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="space-y-16">
                    {/* Intro */}
                    <section className="text-center space-y-6">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand">
                            AI Conciergeについて
                        </h1>
                        <p className="text-lg text-brand-black/80 leading-relaxed max-w-2xl mx-auto">
                            本サービスは、Googleマップの膨大な口コミデータを<br className="hidden md:inline" />
                            最新の生成AIが徹底的に分析し、<br className="hidden md:inline" />
                            あなたの好みや利用シーンに最適な飲食店を提案する<br className="hidden md:inline" />
                            次世代のグルメ検索プラットフォームです。
                        </p>
                    </section>

                    {/* AI Algorithm */}
                    <section id="ai-algorithm" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-gray">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-50 p-3 rounded-xl">
                                <Sparkles className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold">透明性の高いAI分析</h2>
                        </div>
                        <div className="space-y-6 text-brand-black/80 leading-relaxed">
                            <p>
                                当サービスでは、Google Cloudの最新鋭生成AIモデル <strong>Gemini 2.0 Flash</strong> を採用しています。
                                ブラックボックスになりがちなAIの判断プロセスですが、私たちは以下のロジックで「根拠のある評価」を行っています。
                            </p>
                            <ul className="list-disc pl-6 space-y-3 marker:text-brand">
                                <li>
                                    <strong>データの厳選:</strong> 直近のGoogleマップの口コミから、「サクラ」や「スパム」の疑いがある投稿、および情報量が極端に少ない投稿を自動的に除外します。
                                </li>
                                <li>
                                    <strong>文脈理解と根拠の抽出:</strong> 単に星の数を見るのではなく、レビュー内の「具体的なエピソード（例：店員の声掛けのタイミング、料理の提供温度）」を抽出・評価します。
                                </li>
                                <li>
                                    <strong>Evidence-Based Scoring:</strong> AIはスコアを算出する際、必ず「口コミ内のどの記述がその点数の根拠になったか」を内部的に特定しており、感情のみによるバイアスを抑制しています。
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Scoring Algorithm */}
                    <section id="scoring" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-gray">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-orange-50 p-3 rounded-xl">
                                <Scale className="w-8 h-8 text-brand" />
                            </div>
                            <h2 className="text-2xl font-bold">信頼できる評価フレームワーク</h2>
                        </div>
                        <div className="space-y-6 text-brand-black/80 leading-relaxed">
                            <p>
                                評価の基準となる4つの軸は、サービス品質評価の世界的なフレームワークである
                                <strong>『SERVQUAL』(Service Quality)</strong> をベースに、飲食店選びに不可欠な「味」と「コスト」の概念を統合して設計されました。
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                <div className="bg-brand-gray/20 p-6 rounded-2xl">
                                    <h3 className="font-bold flex items-center gap-2 mb-4 text-brand-black">
                                        <Sliders className="w-5 h-5" />
                                        科学的根拠に基づく4軸
                                    </h3>
                                    <ul className="space-y-3 text-sm">
                                        <li>
                                            <div className="flex justify-between font-bold mb-1"><span>味</span> <span className="text-brand-black/50">Core Product</span></div>
                                            <p className="text-xs text-brand-black/80">飲食店の本質的価値。提供される料理の質の絶対評価。</p>
                                        </li>
                                        <li>
                                            <div className="flex justify-between font-bold mb-1"><span>接客</span> <span className="text-brand-black/50">Empathy & Reliability</span></div>
                                            <p className="text-xs text-brand-black/80">SERVQUALの「共感性」「信頼性」に相当。スタッフの対応力。</p>
                                        </li>
                                        <li>
                                            <div className="flex justify-between font-bold mb-1"><span>雰囲気</span> <span className="text-brand-black/50">Tangibles</span></div>
                                            <p className="text-xs text-brand-black/80">SERVQUALの「有形性」。内装、清潔感、居心地の良さ。</p>
                                        </li>
                                        <li>
                                            <div className="flex justify-between font-bold mb-1"><span>コスパ</span> <span className="text-brand-black/50">Value for Money</span></div>
                                            <p className="text-xs text-brand-black/80">支払う対価に対する体験の納得感。単なる安さではありません。</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-brand-gray/20 p-6 rounded-2xl">
                                    <h3 className="font-bold flex items-center gap-2 mb-4 text-brand-black">
                                        <Binary className="w-5 h-5" />
                                        パーソナライズド・マッチ計算
                                    </h3>
                                    <p className="text-sm mb-4">
                                        さらに、あなたの「好み」や「利用シーン」に合わせて、最終的なスコアを動的に再計算します。
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-brand-black/80">Weighted Average (加重平均) 方式:</p>
                                        <div className="text-xs font-mono bg-white p-3 rounded-lg border border-brand-gray text-brand-black/80 overflow-x-auto">
                                            Score = (Σ(Score_i * Weight_i)) / Σ(Weight_i)
                                        </div>
                                    </div>
                                    <p className="text-xs mt-3 text-brand-black/80 leading-relaxed">
                                        あなたが「雰囲気が重要」と選択すれば、雰囲気のスコアが他項目の3倍の影響力を持ちます。「デート」シーンを選べば、デート向きの要素（ムード、座席間隔など）が重要視されます。
                                        これにより、<strong>「万人に受ける店」ではなく「あなたに合う店」</strong>を提案します。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Terms of Service */}
                    <section id="terms" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-gray">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="brand-gray p-3 rounded-xl">
                                <ShieldCheck className="w-8 h-8 text-brand-black/80" />
                            </div>
                            <h2 className="text-2xl font-bold">利用規約と私たちからのお願い</h2>
                        </div>
                        <div className="space-y-10 text-sm text-brand-black/80 leading-relaxed border-t border-brand-gray pt-8">

                            {/* Intro */}
                            <p className="font-medium text-brand-black/80">
                                AI Concierge for グルメをご利用いただき、ありがとうございます。<br />
                                皆様に快適かつ安全にサービスをご活用いただくために、いくつかのお約束事項（利用規約）を定めております。少し堅苦しい内容も含まれますが、トラブルを未然に防ぐためご一読いただけますと幸いです。
                            </p>

                            {/* Article 1 */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第1条（適用）</h3>
                                <p>
                                    この規約は、当サービスをご利用いただくすべての皆様に適用されます。サービスを使い始めた時点で、本規約の内容にご同意いただいたものとして大切にお取り扱いいたします。
                                </p>
                            </div>

                            {/* Article 2: Disclaimer */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第2条（AIの特性と免責について）</h3>
                                <div className="bg-brand-gray/20 rounded-xl p-5 space-y-4">
                                    <div>
                                        <strong className="block text-brand-black/80 mb-1">1. AI分析の限界</strong>
                                        <p>
                                            私たちは最新のGemini 2.0モデルを用い、可能な限り正確な情報を皆様にお届けできるよう努めています。しかし、生成AIは時として事実と異なる情報（ハルシネーション）を生成してしまう技術的な限界がまだ存在します。<br />
                                            そのため、AIの提示するスコアや要約はあくまで「参考情報」として受け取っていただき、最終的なご判断は公式サイト等でご確認いただきますようお願いいたします。
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="block text-brand-black/80 mb-1">2. 外部データの鮮度</strong>
                                        <p>
                                            営業日やメニュー価格などの情報は、Googleマップ等の外部サービスから取得しています。これらは日々更新されるため、当サイトの表示と現地の状況にズレが生じる場合がございます。何卒ご容赦ください。
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="block text-brand-black/80 mb-1">3. 実際の体験について</strong>
                                        <p>
                                            素晴らしい食事体験ができるよう全力でサポートしますが、実際の店舗での接客や料理の品質、あるいは不測のトラブル（食中毒等）について、当方では責任を負いかねます。お店選びのワクワクを提供するパートナーとして、ご理解いただけますと幸いです。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Article 3: IP */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第3条（知的財産権）</h3>
                                <p>
                                    このサービス独自のAI分析ロジックやデザインは、私たち開発チームが情熱を持って作り上げたものです。<br />
                                    個人的に楽しんでいただくのは大歓迎ですが、無断での商用利用や複製はお控えください。
                                </p>
                            </div>

                            {/* Article 4: Prohibited Acts */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第4条（禁止事項）</h3>
                                <p>すべてのユーザー様に安定したサービスを提供するため、以下の行為はご遠慮ください。</p>
                                <ul className="list-disc pl-5 mt-3 space-y-2 bg-brand-gray/20 p-4 rounded-xl text-brand-black/80">
                                    <li>サーバーに過度な負担をかける行為（スクレイピング等による大量アクセス）</li>
                                    <li>サービスの仕組みを不正に解析すること（リバースエンジニアリング）</li>
                                    <li>その他、他の方への迷惑となる行為</li>
                                </ul>
                            </div>

                            {/* Article 5: Changes */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第5条（サービスの変更）</h3>
                                <p>
                                    より良い体験を提供するために、機能の追加や変更、あるいは一時的なメンテナンスを行うことがあります。その際は、可能な限りスムーズに対応いたしますが、予告なく変更が生じる場合があることをご了承ください。
                                </p>
                            </div>

                            {/* Article 6: Jurisdiction */}
                            <div>
                                <h3 className="font-bold text-brand-black mb-3 text-base">第6条（準拠法と管轄）</h3>
                                <p>
                                    本規約は日本法に基づいて解釈されます。<br />
                                    もし何か問題が生じた場合は、まずは誠実に対話で解決したいと考えていますが、法的な手続きが必要となった場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とさせていただきます。
                                </p>
                            </div>

                            <div className="bg-brand/5 border border-brand/20 p-5 rounded-xl mt-6">
                                <h4 className="font-bold text-brand mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    最後に
                                </h4>
                                <p className="text-brand-black/80 leading-relaxed">
                                    私たちは、このサービスが皆様の「美味しい出会い」のきっかけになることを心から願っています。<br />
                                    技術の限界やリスクを正直にお伝えしましたが、それ以上に、AIが生み出す新しい発見を楽しんでいただければ幸いです。
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
