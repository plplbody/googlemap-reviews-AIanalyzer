'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Place } from '@/types/schema';
import { getUserInteractions } from '@/server/actions/user';
import Header from '@/components/Header';
import PlaceListItem from '@/components/PlaceListItem';
import { Loader2, Bookmark, ThumbsUp, ThumbsDown, ArrowLeft, User as UserIcon } from 'lucide-react';
import { UserPreferenceRadar } from '@/components/UserPreferenceRadar';

type Tab = 'saved' | 'good' | 'bad';

export default function ProfilePage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('saved');
    const [data, setData] = useState<{ saved: Place[], good: Place[], bad: Place[] }>({ saved: [], good: [], bad: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const res = await getUserInteractions(user.uid);
                setData(res);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    if (authLoading || (loading && user)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <Loader2 className="w-8 h-8 text-brand-orange-dark animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const currentPlaces = data[activeTab];

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif">
            <Header viewState="HOME" onResetHome={() => router.push('/')} />

            <div className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
                <div className="mb-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        戻る
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-brand-black-dark">マイページ</h1>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-gray mb-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="w-20 h-20 rounded-full brand-gray overflow-hidden shrink-0">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-brand-black-light">
                                    {user.displayName?.[0] || "U"}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-brand-black-dark">{user.displayName}</h2>
                            <p className="text-brand-black text-sm">{user.email}</p>
                        </div>
                    </div>

                    {/* Preference Summary Radar */}
                    <div className="w-full md:w-64 md:ml-auto border-t md:border-t-0 md:border-l border-brand-gray pt-6 md:pt-0 md:pl-6">
                        <p className="text-xs font-bold text-brand-black-light mb-2 text-center md:text-left">あなたの好み傾向</p>
                        <UserPreferenceRadar preferences={profile?.aiPreferences} compact />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-brand-gray">
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'saved'
                            ? 'border-brand-orange-dark text-brand-orange-dark'
                            : 'border-transparent text-brand-black hover:text-brand-black-dark cursor-pointer'
                            }`}
                    >
                        <Bookmark className="w-4 h-4" />
                        保存済み ({data.saved.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('good')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'good'
                            ? 'border-brand-orange-dark text-brand-orange-dark'
                            : 'border-transparent text-brand-black hover:text-brand-black-dark cursor-pointer'
                            }`}
                    >
                        <ThumbsUp className="w-4 h-4" />
                        Good ({data.good.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bad')}
                        className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === 'bad'
                            ? 'border-brand-orange-dark text-brand-orange-dark'
                            : 'border-transparent text-brand-black hover:text-brand-black-dark cursor-pointer'
                            }`}
                    >
                        <ThumbsDown className="w-4 h-4" />
                        Bad ({data.bad.length})
                    </button>
                </div>

                {/* List */}
                {currentPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentPlaces.map(place => (
                            <PlaceListItem
                                key={place.id}
                                place={place}
                                onSelect={(id) => router.push(`/?view=DETAIL&id=${id}&from=profile`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-brand-black-light">
                        <p>リストは空です</p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-4 text-brand-orange-dark font-bold hover:underline"
                        >
                            お店を探す
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
