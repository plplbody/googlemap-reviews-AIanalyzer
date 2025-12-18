"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";
import { useAuth } from "@/contexts/AuthContext";
import SearchInput from "@/components/ui/SearchInput";
import AnalysisResult from "@/components/AnalysisResult";

import PlaceList from "@/components/PlaceList";
import { Place } from "@/types/schema";
import {
  searchPlaces,
  searchAndAnalyze,
  PlaceSearchResult,
} from "@/server/actions/place";
import { useRealtimePlaces } from "@/hooks/useRealtimePlaces";
import { Utensils, Award, Sparkles, TrendingUp, ArrowLeft, Heart, ListFilter, Star, Menu, X } from "lucide-react";



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
  // Sort State
  const [sortBy, setSortBy] = useState<'match' | 'ai' | 'google'>('ai');
  // Mobile Menu & Auth State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();

  // Initialize state from URL on first load
  const [focusedAxes, setFocusedAxes] = useState<string[]>(() => {
    const focusParam = searchParams.get("focus");
    return focusParam ? focusParam.split(",") : [];
  });
  const [focusedScenes, setFocusedScenes] = useState<string[]>(() => {
    const sceneParam = searchParams.get("scenes");
    return sceneParam ? sceneParam.split(",") : [];
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
      if (!p.axisScores || (focusedAxes.length === 0 && focusedScenes.length === 0)) return -1;
      const scores = p.axisScores;
      const usage = p.usageScores || {};

      const axesMap: Record<string, number> = {
        'taste': scores.taste, 'service': scores.service, 'atmosphere': scores.atmosphere, 'cost': scores.cost
      };
      let total = 0, weight = 0;

      // Standard Axes
      ['taste', 'service', 'atmosphere', 'cost'].forEach(ax => {
        const w = focusedAxes.includes(ax) ? 3 : 1;
        total += (axesMap[ax] || 0) * w;
        weight += w;
      });

      // Usage Scenarios
      ['business', 'date', 'solo', 'family', 'group'].forEach(scene => {
        if (focusedScenes.includes(scene)) {
          const score = usage[scene as keyof typeof usage] || 0;
          const w = 3;
          total += score * w;
          weight += w;
        }
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

  // Update Sort when Focused Axes/Scenes change
  useEffect(() => {
    if (focusedAxes.length > 0 || focusedScenes.length > 0) {
      setSortBy('match');
    } else {
      // If we were sorting by match and axes/scenes become empty, fallback to AI
      if (sortBy === 'match') setSortBy('ai');
    }
  }, [focusedAxes.length, focusedScenes.length]);

  const handleAxisToggle = (axisId: string) => {
    let newAxes: string[];
    if (focusedAxes.includes(axisId)) {
      newAxes = focusedAxes.filter(id => id !== axisId);
    } else {
      newAxes = [...focusedAxes, axisId];
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

  const handleSceneToggle = (sceneId: string) => {
    let newScenes: string[];
    if (focusedScenes.includes(sceneId)) {
      newScenes = focusedScenes.filter(id => id !== sceneId);
    } else {
      newScenes = [...focusedScenes, sceneId];
    }

    setFocusedScenes(newScenes);

    // Sync to URL
    const params = new URLSearchParams(searchParams.toString());
    if (newScenes.length > 0) {
      params.set("scenes", newScenes.join(","));
    } else {
      params.delete("scenes");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Also sync state if URL changes externally (e.g. back button)
  useEffect(() => {
    const focusParam = searchParams.get("focus");
    const axes = focusParam ? focusParam.split(",") : [];

    const sceneParam = searchParams.get("scenes");
    const scenes = sceneParam ? sceneParam.split(",") : [];

    setFocusedAxes(prev => {
      if (prev.length === axes.length && prev.every(v => axes.includes(v))) return prev;
      return axes;
    });

    setFocusedScenes(prev => {
      if (prev.length === scenes.length && prev.every(v => scenes.includes(v))) return prev;
      return scenes;
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
    fetchData();
  }, [viewState, query, placeId]);

  // Scroll to top when switching to DETAIL view
  useEffect(() => {
    if (viewState === "DETAIL") {
      window.scrollTo(0, 0);
    }
  }, [viewState]);

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
    if (focusedScenes.length > 0) {
      params.set("scenes", focusedScenes.join(","));
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
          AI Concierge <span className="text-xs font-normal opacity-80 ml-1">for グルメ</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide items-center">
          <Link href="/about" className="cursor-pointer hover:text-[#E65100] transition-colors">
            ABOUT
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs opacity-80">{user.displayName}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-full border border-[#E65100] text-[#E65100] hover:bg-[#E65100] hover:text-white transition-all text-xs font-bold"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="cursor-pointer hover:text-[#E65100] transition-colors font-bold"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-2 duration-200">
            <Link href="/about" className="text-slate-900 font-bold tracking-wider cursor-pointer hover:text-[#E65100]" onClick={() => setIsMobileMenuOpen(false)}>
              ABOUT
            </Link>
            {user ? (
              <div className="flex flex-col gap-4 border-t pt-4 border-slate-200">
                <span className="text-sm text-slate-500">Login as {user.displayName}</span>
                <button
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                  className="text-left text-[#E65100] font-bold tracking-wider cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <span
                className="text-slate-900 font-bold tracking-wider cursor-pointer hover:text-[#E65100]"
                onClick={() => { signInWithGoogle(); setIsMobileMenuOpen(false); }}
              >
                LOGIN
              </span>
            )}
          </div>
        )}
      </nav>

      {/* ヒーローセクション（ホーム画面でのみ表示） */}
      {viewState === "HOME" && (
        <>
          <section className="relative h-[80vh] w-full flex flex-col items-center justify-center">
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
                <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight text-shadow-lg leading-tight">
                  あなた専属の、<br />
                  <span className="text-[#E65100]">AIグルメコンシェルジュ</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl font-sans font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
                  口コミをAIが分析し、客観的に評価。<br className="hidden md:block" />
                  あなたの好みや価値観に合わせて、<span className="text-white font-medium">最適なお店</span>をご提案します。
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
                  <h3 className="text-xl font-bold">客観的なAI評価</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    口コミを公平に分析。<br />
                    サクラやノイズを排除し、<br />
                    お店の本来の実力を数値化します。
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors">
                    <Heart className="w-8 h-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">あなただけのマッチ度</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    味、雰囲気、サービスの好みや<br />
                    利用シーンに合わせて、<br />
                    あなたとの相性を瞬時に計算。
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center group-hover:bg-[#E65100]/10 transition-colors">
                    <Award className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <h3 className="text-xl font-bold">失敗しないお店選び</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    ビジネスからデートまで。<br />
                    熟練のコンシェルジュのように、<br />
                    その日の目的に最適解を導きます。
                  </p>
                </div>
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
                onClick={resetHome}
                className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors w-fit font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                ホーム
              </button>
              <div className="w-full max-w-4xl mx-auto mb-4">
                <SearchInput
                  onSearchStart={handleSearchStart}
                  onSearchComplete={handleSearchComplete}
                />
              </div>

              {/* Filter Selection UI */}
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500 w-full max-w-4xl mx-auto">
                <p className="text-sm text-slate-500 font-medium text-center">重視するポイントや利用シーンを選択してください。あなたへのマッチ度を計算します。</p>

                <div className="flex flex-col gap-8">
                  {/* 1. Axes */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">重視するポイント <span className="text-xs font-normal opacity-70">(複数選択可)</span></h3>
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

                  {/* 2. Scenarios */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center">利用シーン <span className="text-xs font-normal opacity-70">(複数選択可)</span></h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        { id: 'business', label: 'ビジネス' },
                        { id: 'date', label: 'デート' },
                        { id: 'solo', label: 'お一人様' },
                        { id: 'family', label: 'ファミリー' },
                        { id: 'group', label: '団体' },
                      ].map((scene) => {
                        const isSelected = focusedScenes.includes(scene.id);
                        return (
                          <button
                            key={scene.id}
                            onClick={() => handleSceneToggle(scene.id)}
                            className={`
                                    flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 border
                                    ${isSelected
                                ? 'bg-rose-600 text-white border-rose-600 shadow-md transform scale-105'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-rose-600 hover:text-rose-600'
                              }
                                    `}
                          >
                            {scene.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-col items-center mt-6 gap-2">
                <span className="text-sm text-slate-500 font-medium">並び替え</span>
                <div className="bg-white p-1 rounded-full border border-slate-200 flex shadow-sm">
                  <button
                    onClick={() => setSortBy('match')}
                    disabled={focusedAxes.length === 0 && focusedScenes.length === 0}
                    className={`
                            px-4 py-1.5 rounded-full text-sm font-bold transition-all flex items-center gap-1
                            ${sortBy === 'match'
                        ? 'bg-[#E65100] text-white shadow-sm'
                        : (focusedAxes.length === 0 && focusedScenes.length === 0) ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50 hover:text-[#E65100]'
                      }
                          `}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    マッチ度
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
            focusedScenes={focusedScenes}
          />
        </div>
      )}

      {/* 詳細表示（分析結果） */}
      {viewState === "DETAIL" && place && (
        <div className="pt-32 pb-24 container mx-auto px-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                const params = new URLSearchParams();
                params.set("view", "LIST");
                if (query) params.set("q", query);
                if (focusedAxes.length > 0) params.set("focus", focusedAxes.join(","));
                if (focusedScenes.length > 0) params.set("scenes", focusedScenes.join(","));
                router.push(`/?${params.toString()}`);
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              一覧
            </button>

            <div className="flex gap-4">
              {(() => {
                const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
                const prevPlace = currentIndex !== -1 && currentIndex > 0
                  ? sortedPlaces[currentIndex - 1]
                  : null;

                if (!prevPlace) return null;

                return (
                  <button
                    onClick={() => handlePlaceSelect(prevPlace.id)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors font-medium"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    前の店
                  </button>
                );
              })()}

              {(() => {
                const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
                const nextPlace = currentIndex !== -1 && currentIndex < sortedPlaces.length - 1
                  ? sortedPlaces[currentIndex + 1]
                  : null;

                if (!nextPlace) return null;

                return (
                  <button
                    onClick={() => handlePlaceSelect(nextPlace.id)}
                    className="flex items-center gap-2 text-slate-500 hover:text-[#E65100] transition-colors font-medium"
                  >
                    次の店
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                );
              })()}
            </div>
          </div>
          <AnalysisResult
            place={place}
            focusedAxes={focusedAxes}
            focusedScenes={focusedScenes}
            onToggleAxis={handleAxisToggle}
            onToggleScene={handleSceneToggle}
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
