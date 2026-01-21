'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Place } from '@/types/schema';
import { getUserInteractions, toggleVisited, updateInteractionMemo, InteractionItem } from '@/server/actions/user';
import Header from '@/components/Header';
import PlaceListItem from '@/components/PlaceListItem';
import { Loader2, Heart, ArrowLeft, Search, MapPin } from 'lucide-react';
import { UserPreferenceRadar } from '@/components/UserPreferenceRadar';

type Tab = 'interested' | 'visited';

export default function ProfilePage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('interested');
    const [allItems, setAllItems] = useState<InteractionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    // Fetch Data
    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const res = await getUserInteractions(user.uid);
                setAllItems(res);
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

    // Handle Visit Toggle
    const handleToggleVisited = async (placeId: string, currentVisited: boolean) => {
        if (!user) return;

        // Optimistic Update
        setAllItems(prev => prev.map(item =>
            item.place.id === placeId
                ? { ...item, interaction: { ...item.interaction, isVisited: !currentVisited } }
                : item
        ));

        try {
            await toggleVisited(user.uid, placeId, !currentVisited);
        } catch (e) {
            console.error(e);
            // Revert
            setAllItems(prev => prev.map(item =>
                item.place.id === placeId
                    ? { ...item, interaction: { ...item.interaction, isVisited: currentVisited } }
                    : item
            ));
        }
    };

    // Handle Memo Update
    const handleUpdateMemo = async (placeId: string, memo: string, repeat: 'yes' | 'no' | 'maybe') => {
        if (!user) return;

        // Optimistic Update
        setAllItems(prev => prev.map(item =>
            item.place.id === placeId
                ? { ...item, interaction: { ...item.interaction, memo, repeat } }
                : item
        ));

        try {
            await updateInteractionMemo(user.uid, placeId, memo, repeat);
        } catch (e) {
            console.error(e);
        }
    };

    // Filter Logic
    const filteredItems = useMemo(() => {
        let items = allItems;

        // 1. Tab Filter
        switch (activeTab) {
            case 'interested':
                // Shows items Liked (Heart) or Legacy Saved
                items = items.filter(i => i.interaction.isSaved);
                break;
            case 'visited':
                items = items.filter(i => i.interaction.isVisited);
                break;
        }

        // 2. Search Filter
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            items = items.filter(i =>
                i.place.name.toLowerCase().includes(lowerQuery) ||
                i.place.summary?.toString().toLowerCase().includes(lowerQuery) ||
                i.place.nearestStation?.toLowerCase().includes(lowerQuery)
            );
        }

        // Sort by updatedAt (desc)
        return items.sort((a, b) => {
            // Type assertion: At runtime these are Dates or Strings due to server serialization
            const timeA = new Date(a.interaction.updatedAt as unknown as string).getTime();
            const timeB = new Date(b.interaction.updatedAt as unknown as string).getTime();
            return timeB - timeA;
        });
    }, [allItems, activeTab, searchQuery]);

    if (authLoading || (loading && user)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <Loader2 className="w-8 h-8 text-brand-orange-dark animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] ">
            <Header viewState="PROFILE" onResetHome={() => router.push('/')} />

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

                {/* Search & Tabs */}
                <div className="mb-8">
                    {/* Search Input */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-dark" />
                        <input
                            type="text"
                            placeholder="保存した店舗をキーワード（店名、駅名、要約）で検索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-brand-gray rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-orange-dark/20 transition-all text-brand-black"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-brand-gray overflow-x-auto pb-1">
                        <button
                            onClick={() => setActiveTab('interested')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'interested'
                                ? 'border-brand-orange-dark text-brand-orange-dark'
                                : 'border-transparent text-brand-black-light hover:text-brand-black cursor-pointer'
                                }`}
                        >
                            <Heart className="w-4 h-4" />
                            いいね
                        </button>
                        <button
                            onClick={() => setActiveTab('visited')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'visited'
                                ? 'border-brand-orange-dark text-brand-orange-dark'
                                : 'border-transparent text-brand-black-light hover:text-brand-black cursor-pointer'
                                }`}
                        >
                            <MapPin className="w-4 h-4" />
                            来店済み
                        </button>
                    </div>
                </div>

                {/* List */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredItems.map(({ place, interaction }) => (
                            <PlaceListItem
                                key={place.id}
                                place={place}
                                onSelect={(id) => router.push(`/?view=DETAIL&id=${id}&from=profile`)}
                                isVisited={interaction.isVisited}
                                onToggleVisited={(visited) => handleToggleVisited(place.id, interaction.isVisited)} // Use current state from interaction for toggle
                                viewMode="PROFILE"
                                memo={interaction.memo}
                                repeat={interaction.repeat}
                                onUpdateMemo={(memo, repeat) => handleUpdateMemo(place.id, memo, repeat)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-brand-black-light">
                        <p>
                            {searchQuery
                                ? "検索条件に一致する店舗は見つかりませんでした"
                                : activeTab === 'visited'
                                    ? "まだ来店記録がありません"
                                    : "「いいね」したお店はまだありません"
                            }
                        </p>
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
