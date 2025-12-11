"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";
import SearchInput from "@/components/ui/SearchInput";
import AnalysisResult from "@repo/ui/src/AnalysisResult";
import { getGoogleMapsApiKey } from "@/server/actions/config";


import ListingCard from "@/components/ui/ListingCard";
import PlaceList from "@/components/PlaceList";
import { Place } from "@/types/schema";
import {
  searchPlaces,
  searchAndAnalyze,
  PlaceSearchResult,
} from "@/server/actions/place";
import { useRealtimePlaces } from "@/hooks/useRealtimePlaces";
import { Utensils, Award, Sparkles, TrendingUp, ArrowLeft, Heart, ListFilter, Star } from "lucide-react";

// プレミアム表示用のモックデータ（デモ用）
// 実際のアプリではデータベースから取得しますが、ここでは固定データを使用しています
const FEATURED_PLACES = [
  {
    id: "1",
    title: "鮨 銀座 おのでら",
    location: "東京都中央区銀座",
    rating: 4.85,
    price: "¥30,000~",
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop",
    tags: ["寿司", "ミシュラン", "個室あり"],
  },
  {
    id: "2",
    title: "L'Effervescence",
    location: "東京都港区西麻布",
    rating: 4.92,
    price: "¥50,000~",
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1374&auto=format&fit=crop",
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
  {
    id: "4",
    title: "NARISAWA",
    location: "東京都港区南青山",
    rating: 4.88,
    price: "¥45,000~",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1470&auto=format&fit=crop",
    tags: ["イノベーティブ", "自然派", "世界の名店"],
  },
];

type ViewState = "HOME" | "LIST" | "DETAIL";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLパラメータから状態を導出
  const viewState = (searchParams.get("view") as ViewState) || "HOME";
  const query = searchParams.get("q") || "";
  const placeId = searchParams.get("id");

  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // Sort State
  const [sortBy, setSortBy] = useState<'match' | 'ai' | 'google'>('ai');
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    getGoogleMapsApiKey().then(setApiKey);
  }, []);

  // Initialize state from URL on first load
  const [focusedAxes, setFocusedAxes] = useState<string[]>(() => {
    const focusParam = searchParams.get("focus");
    return focusParam ? focusParam.split(",") : [];
  });

  // Realtime Data Hook
  const { places: realtimePlaces } = useRealtimePlaces(searchResults.map(p => p.id));

  // Merge & Sort Logic
  const sortedPlaces = (() => {
    // 1. Merge
    const merged = searchResults.map(initial => {
      const real = realtimePlaces[initial.id];
      if (real) return real;

      // Fallback if not yet in Firestore
      return {
        id: initial.id,
        name: initial.name,
        originalRating: initial.rating,
        userRatingsTotal: initial.userRatingsTotal,
        address: initial.vicinity,
        status: 'pending', // Default
      } as Place;
    });

    // 2. Score Helper
    const getMatchScore = (p: Place) => {
      if (!p.axisScores || focusedAxes.length === 0) return -1;
      const scores = p.axisScores;
      const axesMap: Record<string, number> = {
        'taste': scores.taste, 'service': scores.service, 'atmosphere': scores.atmosphere, 'cost': scores.cost
      };
      let total = 0, weight = 0;
      ['taste', 'service', 'atmosphere', 'cost'].forEach(ax => {
        const w = focusedAxes.includes(ax) ? 3 : 1;
        total += (axesMap[ax] || 0) * w;
        weight += w;
      });
      return total / weight;
    };

    // 3. Sort
    return merged.sort((a, b) => {
      let valA = 0, valB = 0;
      if (sortBy === 'match') {
        valA = getMatchScore(a);
        valB = getMatchScore(b);
        // Fallback to AI score if match scores are equal (or both -1)
        if (Math.abs(valA - valB) < 0.1) {
          valA = a.trueScore ?? -999;
          valB = b.trueScore ?? -999;
        }
      } else if (sortBy === 'ai') {
        valA = a.trueScore ?? -999;
        valB = b.trueScore ?? -999;
      } else { // google
        valA = a.originalRating ?? 0;
        valB = b.originalRating ?? 0;
      }
      return valB - valA; // Descending
    });
  })();

  // Update Sort when Focused Axes change
  useEffect(() => {
    if (focusedAxes.length > 0) {
      setSortBy('match');
    } else {
      // If we were sorting by match and axes become empty, fallback to AI
      if (sortBy === 'match') setSortBy('ai');
    }
  }, [focusedAxes.length]);

  const handleAxisToggle = (axisId: string) => {
    let newAxes: string[];
    if (focusedAxes.includes(axisId)) {
      newAxes = focusedAxes.filter(id => id !== axisId);
    } else {
      if (focusedAxes.length >= 2) {
        newAxes = focusedAxes; // Max 2 selected
      } else {
        newAxes = [...focusedAxes, axisId];
      }
    }

    setFocusedAxes(newAxes);

    // Sync to URL
    const params = new URLSearchParams(searchParams.toString());
    if (newAxes.length > 0) {
      params.set("focus", newAxes.join(","));
    } else {
      params.delete("focus");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Also sync state if URL changes externally (e.g. back button)
  useEffect(() => {
    const focusParam = searchParams.get("focus");
    const axes = focusParam ? focusParam.split(",") : [];
    // Only update if different to avoid excess renders/loops
    setFocusedAxes(prev => {
      if (prev.length === axes.length && prev.every(v => axes.includes(v))) return prev;
      return axes;
    });
  }, [searchParams]);

  // URLパラメータの変更を監視してデータを取得
  useEffect(() => {
    const fetchData = async () => {
      if (viewState === "LIST" && query) {
        setLoading(true);
        // Reset results when query changes (handled by router but safe to ensure)
        try {
          const response = await searchPlaces(query);
          setSearchResults(response.places);
          setNextPageToken(response.nextPageToken);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (viewState === "DETAIL" && placeId) {
        setLoading(true);
        try {
          // 詳細表示の場合は、まず分析/取得アクションを呼ぶ（必要なら）
          // ただし、Firestoreのリスナーでデータ同期するため、ここではIDセットのみで良い場合もあるが、
          // 初回分析トリガーのために searchAndAnalyze を呼ぶ必要がある
          await searchAndAnalyze(placeId);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (viewState === "HOME") {
        setSearchResults([]);
        setNextPageToken(undefined);
        setPlace(null);
      }
    };

    fetchData();
  }, [viewState, query, placeId]);

  // 詳細表示時のリアルタイムリスナー
  useEffect(() => {
    if (viewState !== "DETAIL" || !placeId) return;

    console.log(`Start listening for place: ${placeId}`);
    const unsubscribe = onSnapshot(doc(firestore, "places", placeId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as Place;
        // status check or error handling could be here
        setPlace({ ...data, id: docSnapshot.id });
      } else {
        console.log("Place not found in Firestore");
      }
    }, (error) => {
      console.error("Firestore listen error:", error);
    });

    return () => unsubscribe();
  }, [viewState, placeId]);

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await searchPlaces(query, nextPageToken);
      setSearchResults(prev => [...prev, ...response.places]);
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.error("Failed to load more", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // 検索開始時の処理
  const handleSearchStart = () => {
    setLoading(true);
  };

  const handleSearchComplete = async (newQuery: string) => {
    // URLを更新して遷移
    const params = new URLSearchParams();
    params.set("view", "LIST");
    params.set("q", newQuery);
    router.push(`/?${params.toString()}`);
  };

  const handlePlaceSelect = async (selectedPlaceId: string) => {
    // URLを更新して遷移
    const params = new URLSearchParams();
    params.set("view", "DETAIL");
    params.set("id", selectedPlaceId);
    // 検索クエリも保持
    if (query) params.set("q", query);
    // 重視ポイントも詳細画面へ引き継ぐ
    if (focusedAxes.length > 0) {
      params.set("focus", focusedAxes.join(","));
    }

    router.push(`/?${params.toString()}`);
  };

  const resetHome = () => {
    router.push("/");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif selection:bg-[#E65100]/20">
      {/* ナビゲーションバー */}
      <nav className={`absolute top-0 w-full z-50 p-6 flex justify-between items-center transition-colors duration-300 ${viewState === 'HOME' ? 'text-white' : 'text-slate-900'}`}>
        <div
          className="text-2xl font-bold tracking-widest cursor-pointer"
          onClick={resetHome}
        >
          GASTRONOMY AI
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <span className="cursor-pointer hover:text-[#E65100] transition-colors">
            COLLECTIONS
          </span>
          <span className="cursor-pointer hover:text-[#E65100] transition-colors">
            ABOUT
          </span>
          <span className="cursor-pointer hover:text-[#E65100] transition-colors">
            LOGIN
          </span>
        </div>
      </nav>

      {/* ヒーローセクション（ホーム画面でのみ表示） */}
      {viewState === "HOME" && (
        <>
          <section className="relative h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden">
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
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight text-shadow-lg leading-tight">
                  真実の<span className="text-[#E65100]">美味</span>を、
                  <br />
                  見極める。
                </h1>
                <p className="text-gray-200 text-lg md:text-xl font-sans font-light tracking-wide max-w-2xl mx-auto">
                  AIが数千の口コミを分析し、隠された名店と真の評価を明らかにします。
                </p>
              </div>

              <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <SearchInput
                  onSearchStart={handleSearchStart}
                  onSearchComplete={handleSearchComplete}
                />
              </div>
            </div>
          </section>

          {/* サービスの価値提案（メリット） */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors">
                    <Sparkles className="w-8 h-8 text-[#E65100]" />
                  </div>
                  <h3 className="text-xl font-bold">AI分析</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    膨大な口コミから感情を読み解き、
                    <br />
                    数値だけでは見えない魅力を抽出。
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors">
                    <Award className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <h3 className="text-xl font-bold">真のスコア</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    サクラや偏見を排除した、
                    <br />
                    純粋な味とサービスの評価を算出。
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors">
                    <TrendingUp className="w-8 h-8 text-[#1A1A1A]" />
                  </div>
                  <h3 className="text-xl font-bold">トレンド予測</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    次に流行る店、予約困難になる店を
                    <br />
                    いち早くキャッチ。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 厳選されたコレクション */}
          <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Curated Selection</h2>
                  <p className="text-gray-500 font-sans">
                    AIが高く評価した、今行くべき名店
                  </p>
                </div>
                <button className="text-[#E65100] font-sans font-medium hover:underline">
                  View All
                </button>
              </div>

              {/* 幅が300px以上確保できる限り横に並べ、無理なら折り返す設定 */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {FEATURED_PLACES.map((item) => (
                  <ListingCard
                    key={item.id}
                    {...item}
                    onClick={() => console.log("Clicked", item.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* リスト表示（検索結果） */}
      {viewState === "LIST" && (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50">
          <div className="container mx-auto px-6 mb-8">
            <div className="flex flex-col gap-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors w-fit font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
              <div className="w-full max-w-4xl mx-auto mb-4">
                <SearchInput
                  onSearchStart={handleSearchStart}
                  onSearchComplete={handleSearchComplete}
                />
              </div>

              {/* Axis Selection UI */}
              <div className="flex flex-col items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-sm text-slate-500 font-medium">重視するポイントを最大2つ選択してください。あなたへのマッチ度を計算します。</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { id: 'taste', label: '味・料理', icon: Utensils },
                    { id: 'service', label: '接客・サービス', icon: Heart },
                    { id: 'atmosphere', label: '雰囲気・空間', icon: Sparkles },
                    { id: 'cost', label: 'コスパ', icon: TrendingUp },
                  ].map((axis) => {
                    const isSelected = focusedAxes.includes(axis.id);
                    return (
                      <button
                        key={axis.id}
                        onClick={() => handleAxisToggle(axis.id)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                          ${isSelected
                            ? 'bg-[#E65100] text-white border-[#E65100] shadow-md transform scale-105'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#E65100] hover:text-[#E65100]'
                          }
                        `}
                      >
                        <axis.icon className="w-4 h-4" />
                        {axis.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-col items-center mt-6 gap-2">
                <span className="text-sm text-slate-500 font-medium">並び替え</span>
                <div className="bg-white p-1 rounded-full border border-slate-200 flex shadow-sm">
                  <button
                    onClick={() => setSortBy('match')}
                    disabled={focusedAxes.length === 0}
                    className={`
                            px-4 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1
                            ${sortBy === 'match'
                        ? 'bg-[#E65100] text-white shadow-sm'
                        : focusedAxes.length === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50 hover:text-[#E65100]'
                      }
                          `}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    あなたへのマッチ度
                  </button>
                  <button
                    onClick={() => setSortBy('ai')}
                    className={`
                            px-4 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1
                            ${sortBy === 'ai'
                        ? 'bg-[#E65100] text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#E65100]'
                      }
                          `}
                  >
                    AI分析スコア
                  </button>
                  <button
                    onClick={() => setSortBy('google')}
                    className={`
                            px-4 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1
                            ${sortBy === 'google'
                        ? 'bg-[#E65100] text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#E65100]'
                      }
                          `}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Google評価
                  </button>
                </div>
              </div>

            </div>
          </div>
          <PlaceList
            places={sortedPlaces}
            onSelect={handlePlaceSelect}
            onLoadMore={handleLoadMore}
            hasMore={!!nextPageToken}
            loadingMore={loadingMore}
            focusedAxes={focusedAxes}
          />
        </div>
      )}

      {/* 詳細表示（分析結果） */}
      {viewState === "DETAIL" && place && (
        <div className="pt-32 pb-24 container mx-auto px-6 animate-in fade-in duration-500">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </button>
          <AnalysisResult
            place={place}
            focusedAxes={focusedAxes}
            onToggleAxis={handleAxisToggle}
            onRetry={() => searchAndAnalyze(place.id)}
            googleMapsApiKey={apiKey}
          />
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-pulse text-[#E65100]">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
