import { View, ScrollView, Text, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { PlaceListItem, SearchInput, FeatureCard } from '@repo/ui';
import { Place } from '@repo/lib';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Award, TrendingUp, ArrowLeft, Utensils, Heart, Star } from 'lucide-react-native';
import { ClientOnly } from '../src/components/ClientOnly';

const FEATURED_PLACES = [
    {
        id: "1",
        title: "鮨 銀座 おのでら",
        location: "東京都中央区銀座",
        rating: 4.85,
        price: "¥30,000~",
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop",
        tags: ["寿司", "ミシュラン", "個室あり"],
    },
    {
        id: "2",
        title: "L'Effervescence",
        location: "東京都港区西麻布",
        rating: 4.92,
        price: "¥50,000~",
        imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1374&auto=format&fit=crop",
        tags: ["フレンチ", "隠れ家", "記念日"],
    },
    {
        id: "3",
        title: "鳥しき",
        location: "東京都品川区上大崎",
        rating: 4.75,
        price: "¥15,000~",
        imageUrl:
            "https://images.unsplash.com/photo-1625937751876-4515cd8e7752?q=80&w=1374&auto=format&fit=crop",
        tags: ["焼き鳥", "予約困難", "カウンター"],
    },
];

export default function Home() {
    const router = useRouter();
    const params = useLocalSearchParams<{ q?: string; focus?: string }>();

    const [query, setQuery] = useState(params.q || '');
    const [searchResults, setSearchResults] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);

    // Sort & Filter
    const [focusedAxes, setFocusedAxes] = useState<string[]>(params.focus ? params.focus.split(',') : []);
    const [sortBy, setSortBy] = useState<'match' | 'ai' | 'google'>('ai');

    // Trigger search when query param changes
    useEffect(() => {
        if (params.q) {
            handleSearch(params.q as string);
            setQuery(params.q as string);
        } else {
            setSearchResults([]);
        }
    }, [params.q]);

    const handleSearch = async (text: string) => {
        if (!text.trim()) return;
        setLoading(true);
        // SPA Mode: Call API or Mock
        // Since Expo API Route is disabled, we use Mock for UI verification.
        // In production, this should call a Firebase Function or external API.
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network

            // Mock Data matching API response structure
            const mockData = [
                {
                    id: "mock1",
                    name: "鮨 銀座 おのでら (Mock)",
                    address: "東京都中央区銀座 5-15-8",
                    rating: 4.8,
                    userRatingsTotal: 320,
                    originalRating: 4.8,
                    status: 'completed', // analyzed
                    trueScore: 4.5,
                    axisScores: { taste: 4.8, service: 4.6, atmosphere: 4.2, cost: 3.5 },
                    reviews: ["最高のお寿司でした。"]
                },
                {
                    id: "mock2",
                    name: "鳥しき (Mock)",
                    address: "東京都品川区上大崎 2-14-12",
                    rating: 4.7,
                    userRatingsTotal: 890,
                    originalRating: 4.7,
                    status: 'pending',
                }
            ];

            const filtered = mockData.filter(d => d.name.includes(text) || text === 'Sushi' || text === 'All');
            // If empty query or random, just show mock
            setSearchResults(filtered.length > 0 ? filtered : mockData);

        } catch (e) {
            console.error("Search failed", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchComplete = (text: string) => {
        router.push(`/?q=${encodeURIComponent(text)}`);
    };

    const handleAxisToggle = (axisId: string) => {
        let newAxes: string[];
        if (focusedAxes.includes(axisId)) {
            newAxes = focusedAxes.filter(id => id !== axisId);
        } else {
            if (focusedAxes.length >= 2) {
                newAxes = focusedAxes;
            } else {
                newAxes = [...focusedAxes, axisId];
            }
        }
        setFocusedAxes(newAxes);
        // Sync URL if possible, or just local state for mobile
        router.setParams({ focus: newAxes.join(',') });
    };

    // Sort Logic (Client Side for now)
    const sortedPlaces = [...searchResults].sort((a, b) => {
        // Mock Sort Logic until we have real scores from AI
        // Fallback to google rating
        return (b.originalRating || 0) - (a.originalRating || 0);
    });

    const isHome = !params.q && searchResults.length === 0;

    return (
        <ClientOnly>
            <SafeAreaView className="flex-1 bg-[#FAFAFA]" edges={['top']}>
                <Stack.Screen options={{ headerShown: false }} />

                <ScrollView className="flex-1">
                    {isHome ? (
                        /* HERO SECTION */
                        <View>
                            <ImageBackground
                                source={{ uri: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" }}
                                className="h-[500px] justify-center items-center"
                                imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
                            >
                                <View className="px-6 items-center w-full">
                                    <Text className="text-4xl font-bold text-white text-center mb-2 shadow-sm">
                                        真実の<Text className="text-[#E65100]">美味</Text>を、
                                    </Text>
                                    <Text className="text-4xl font-bold text-white text-center mb-6 shadow-sm">
                                        見極める。
                                    </Text>
                                    <Text className="text-white text-center mb-8 opacity-90">
                                        AIが数千の口コミを分析し、{"\n"}隠された名店と真の評価を明らかにします。
                                    </Text>

                                    <SearchInput
                                        onSearchComplete={handleSearchComplete}
                                    />
                                </View>
                            </ImageBackground>

                            {/* Features */}
                            <View className="py-12 px-6 bg-white flex-row justify-around flex-wrap gap-8">
                                <View className="items-center w-[30%] min-w-[100px]">
                                    <View className="w-12 h-12 bg-slate-50 rounded-full items-center justify-center mb-2">
                                        <Sparkles size={24} color="#E65100" />
                                    </View>
                                    <Text className="font-bold mb-1">AI分析</Text>
                                    <Text className="text-[10px] text-gray-500 text-center">感情を読み解く</Text>
                                </View>
                                <View className="items-center w-[30%] min-w-[100px]">
                                    <View className="w-12 h-12 bg-slate-50 rounded-full items-center justify-center mb-2">
                                        <Award size={24} color="#C5A059" />
                                    </View>
                                    <Text className="font-bold mb-1">真のスコア</Text>
                                    <Text className="text-[10px] text-gray-500 text-center">サクラを排除</Text>
                                </View>
                                <View className="items-center w-[30%] min-w-[100px]">
                                    <View className="w-12 h-12 bg-slate-50 rounded-full items-center justify-center mb-2">
                                        <TrendingUp size={24} color="#1A1A1A" />
                                    </View>
                                    <Text className="font-bold mb-1">トレンド</Text>
                                    <Text className="text-[10px] text-gray-500 text-center">流行を予測</Text>
                                </View>
                            </View>

                            {/* Curated */}
                            <View className="py-12 px-6 bg-[#FAFAFA]">
                                <Text className="text-2xl font-bold mb-6 text-slate-800">Curated Selection</Text>
                                <View className="flex-row flex-wrap gap-4">
                                    {FEATURED_PLACES.map((item) => (
                                        <View key={item.id} className="w-full md:w-[48%]">
                                            <FeatureCard {...item} />
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    ) : (
                        /* SEARCH LIST SECTION */
                        <View className="min-h-screen bg-slate-50 pt-4 px-4 pb-24">
                            <View className="mb-6">
                                <TouchableOpacity onPress={() => router.push('/')} className="mb-4">
                                    <View className="flex-row items-center gap-1">
                                        <ArrowLeft size={16} color="#64748B" />
                                        <Text className="text-slate-500 font-medium">Back to Home</Text>
                                    </View>
                                </TouchableOpacity>

                                <SearchInput
                                    initialQuery={query}
                                    onSearchComplete={(q) => {
                                        setQuery(q);
                                        handleSearchComplete(q);
                                    }}
                                />
                            </View>

                            {/* Axis Selection */}
                            <View className="mb-6">
                                <Text className="text-xs text-slate-500 text-center mb-2">重視するポイント (最大2つ)</Text>
                                <View className="flex-row flex-wrap justify-center gap-2">
                                    {[
                                        { id: 'taste', label: '味', icon: Utensils },
                                        { id: 'service', label: '接客', icon: Heart },
                                        { id: 'atmosphere', label: '雰囲気', icon: Sparkles },
                                        { id: 'cost', label: 'コスパ', icon: TrendingUp },
                                    ].map((axis) => {
                                        const isSelected = focusedAxes.includes(axis.id);
                                        return (
                                            <TouchableOpacity
                                                key={axis.id}
                                                onPress={() => handleAxisToggle(axis.id)}
                                                className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full border ${isSelected ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-200'}`}
                                            >
                                                <axis.icon size={12} color={isSelected ? 'white' : '#64748B'} />
                                                <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>{axis.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>

                            {/* Results */}
                            {loading ? (
                                <View className="py-20 items-center">
                                    <ActivityIndicator size="large" color="#E65100" />
                                    <Text className="mt-4 text-slate-400">検索中...</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text className="text-xl font-bold mb-4 text-slate-800">検索結果</Text>
                                    {sortedPlaces.map((place) => (
                                        <PlaceListItem
                                            key={place.id}
                                            place={place}
                                            onSelect={(id) => router.push(`/${id}`)}
                                            focusedAxes={focusedAxes}
                                        />
                                    ))}
                                    {sortedPlaces.length === 0 && (
                                        <View className="py-20 items-center">
                                            <Text className="text-slate-400">見つかりませんでした</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </ClientOnly>
    );
}
