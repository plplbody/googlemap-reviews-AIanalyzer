'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserScenarios, deleteCustomScenario } from '@/server/actions/user';
import { UserScenario } from '@/types/user';
import { ArrowLeft, Trash2, Plus, Sparkles, Loader2, AlertCircle, X, Crown, Layers } from 'lucide-react';
import Link from 'next/link';
import TagCreationForm from '@/components/TagCreationForm';
import Header from '@/components/Header';
import ProficiencyCard from '@/components/ProficiencyCard';

export default function TagManagementPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [scenarios, setScenarios] = useState<UserScenario[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Initial Load
    useEffect(() => {
        if (!user?.uid) return;
        loadScenarios();
    }, [user?.uid]);

    const loadScenarios = async () => {
        if (!user?.uid) return;
        setLoading(true);
        try {
            const data = await getUserScenarios(user.uid);
            setScenarios(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`タグ「${name}」を削除しますか？\nこのタグに関連する学習データも削除されます（元に戻せません）。`)) {
            return;
        }

        setDeletingId(id);
        try {
            if (user?.uid) {
                await deleteCustomScenario(user.uid, id);
                setScenarios(prev => prev.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("削除に失敗しました");
        } finally {
            setDeletingId(null);
        }
    };

    if (!user) {
        return <div className="p-8 text-center">ログインが必要です</div>;
    }

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] ">
            <Header viewState="PROFILE" onResetHome={() => router.push('/')} />

            <div className="pt-32 pb-24 container mx-auto px-6 max-w-2xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        戻る
                    </button>
                </div>

                <h1 className="text-2xl font-bold text-brand-black-dark mb-8">AIタグ管理</h1>

                {/* Intro Card */}
                <div className="bg-white rounded-xl shadow-sm border border-brand-gray p-6 mb-8 text-center">
                    <div className="bg-brand-orange-light/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-8 h-8 text-brand-orange" />
                    </div>
                    <h2 className="text-lg font-bold text-brand-black mb-2">こだわりたい「テーマ」ごとに、AIに好みを学習させる</h2>
                    <p className="text-sm text-brand-black-light leading-relaxed max-w-md mx-auto">
                        「ラーメン」「接待」「休日ランチ」など、あなたがこだわりたいテーマを自由に作成してください。<br />
                        タグを選択するだけで、AIがそのテーマ専用の好みに切り替わります。
                    </p>
                </div>

                {/* Create New Section */}
                <div className="mb-8">
                    {!isCreating ? (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="w-full py-4 rounded-xl border-2 border-dashed border-brand-gray-dark text-brand-black-light hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange-light/5 transition-all flex items-center justify-center gap-2 font-bold"
                        >
                            <Plus className="w-5 h-5" />
                            新しいAIタグを作成する
                        </button>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md border border-brand-gray overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="px-5 py-3 border-b border-brand-gray bg-brand-gray-light/30 flex justify-between items-center">
                                <span className="font-bold text-sm text-brand-black">新規作成</span>
                                <button onClick={() => setIsCreating(false)}><X className="w-4 h-4 text-brand-black-light" /></button>
                            </div>
                            <TagCreationForm
                                uid={user.uid}
                                onSuccess={(newScenario) => {
                                    setScenarios(prev => [newScenario, ...prev]);
                                    setIsCreating(false);
                                }}
                                onCancel={() => setIsCreating(false)}
                            />
                        </div>
                    )}
                </div>

                {/* Tag List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="font-bold text-brand-black-light text-sm">登録済みタグ ({scenarios.length})</h3>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-8 text-brand-gray">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : scenarios.length === 0 ? (
                        <div className="text-center py-12 px-4 rounded-xl border-2 border-dashed border-brand-gray-light bg-neutral-50/50">
                            <p className="text-brand-gray font-medium mb-2">まだタグが作成されていません</p>
                            <p className="text-sm text-brand-black-light">まずは「ラーメン」や「デート」など、<br />よく使うテーマを作ってみませんか？</p>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {scenarios.map((scenario) => {
                                const xp = scenario.experience || 0;
                                return (
                                    <div key={scenario.id} className="flex items-center gap-2 group">
                                        <div className="flex-1">
                                            <ProficiencyCard
                                                title={scenario.name}
                                                experience={xp}
                                                className="bg-white shadow-sm border-brand-gray"
                                            />
                                        </div>
                                        {scenario.isCustom && (
                                            <button
                                                onClick={() => handleDelete(scenario.id, scenario.name)}
                                                disabled={!!deletingId}
                                                className="p-3 text-brand-black-light hover:text-brand-orange-dark hover:bg-brand-orange-light/5 rounded-xl transition-colors border border-transparent hover:border-brand-orange flex-shrink-0"
                                                title="削除"
                                            >
                                                {deletingId === scenario.id ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-5 h-5" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main >
    );
}
