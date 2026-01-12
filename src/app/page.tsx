"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";
import SearchInput from "@/components/ui/SearchInput";
import AnalysisResult from "@/components/AnalysisResult";

import Header from "@/components/Header";
import PlaceList from '@/components/PlaceList';
import { ComparisonTray } from '@/components/ComparisonTray';
import { SelectionButton } from '@/components/ui/SelectionButton';
import { Place, UsageScores } from "@/types/schema";
import { UserProfile } from "@/types/user";
import {
  searchPlaces,
  getPlaceDetails,
  PlaceSearchResult,
} from "@/server/actions/place";
import { getPersonalizedScores, PersonalizedScore } from "@/server/actions/personalize";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimePlaces } from "@/hooks/useRealtimePlaces";
import { Utensils, Award, Sparkles, TrendingUp, ArrowLeft, Heart, Star, User as UserIcon, Loader2, MapPin } from "lucide-react";
import { UserPreferenceRadar } from "@/components/UserPreferenceRadar";

type ViewState = "HOME" | "LIST" | "DETAIL";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLパラメータから状態を導出
  const viewState = (searchParams.get("view") as ViewState) || "HOME";
  const query = searchParams.get("q") || "";
  const placeId = searchParams.get("id");

  // Global Search State
  const { cachedResults, cachedNextPageToken, cachedQuery, setCache, appendResults } = useSearch();

  // Local UI State
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // Auth for Personalization
  const { user, profile, signInWithGoogle } = useAuth();
  const [pScores, setPScores] = useState<Record<string, PersonalizedScore>>({});
  const [effectivePrefs, setEffectivePrefs] = useState<UserProfile['aiPreferences'] | undefined>(undefined);

  // Auto Personalize Toggle
  // Default to true if user is logged in, false otherwise
  const [isAutoPersonalize, setIsAutoPersonalize] = useState(false);

  // Sync AutoPersonalize with User state
  useEffect(() => {
    if (user) {
      setIsAutoPersonalize(true);
    } else {
      setIsAutoPersonalize(false);
    }
  }, [user]);

  // Sort State
  const [sortBy, setSortBy] = useState<'ai' | 'google'>('ai');

  // Initialize state from URL on first load
  const [focusedAxes, setFocusedAxes] = useState<string[]>(() => {
    const focusParam = searchParams.get("focus");
    return focusParam ? focusParam.split(",").filter(Boolean) : [];
  });

  const [focusedScenes, setFocusedScenes] = useState<string[]>(() => {
    const scenesParam = searchParams.get("scenes");
    return scenesParam ? scenesParam.split(",").filter(Boolean) : [];
  });

  // Realtime Data Hook
  const { places: realtimePlaces } = useRealtimePlaces(cachedResults.map(p => p.id));

  // Fetch Personalized Scores (Refactored for reuse)
  const fetchScores = useCallback(async (ids: string[], mode: 'auto' | 'manual', axes: string[], scenes: string[]) => {
    try {
      if (ids.length === 0) return;
      const scores = await getPersonalizedScores(ids, user?.uid, {
        mode,
        focusedAxes: axes,
        scenarioIds: scenes
      });
      setPScores(scores);

      // Extract effective preferences from the first result (they are context-based, so identical for all places in this batch)
      const firstResult = Object.values(scores)[0];
      if (firstResult?.effectivePreferences) {
        setEffectivePrefs(firstResult.effectivePreferences);
      } else {
        setEffectivePrefs(undefined); // Fallback/Reset
      }

    } catch (e) {
      console.error("Failed to fetch personalized scores", e);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (cachedResults.length > 0) {
      // Always fetch scores based on current mode/selection
      const mode = isAutoPersonalize ? 'auto' : 'manual';
      fetchScores(cachedResults.map(p => p.id), mode, focusedAxes, focusedScenes);
    }
  }, [cachedResults, fetchScores, isAutoPersonalize, focusedAxes, focusedScenes]);

  // Handler for action completion (e.g. Save/Good/Bad)
  const [isScoreOutdated, setIsScoreOutdated] = useState(false);

  // Handler for action completion (e.g. Save/Good/Bad)
  const handleActionComplete = async () => {
    // Mark scores as outdated but do NOT automatically refetch to prevent reordering
    setIsScoreOutdated(true);
  };

  const handleRecalculate = async () => {
    if (cachedResults.length > 0) {
      const mode = isAutoPersonalize ? 'auto' : 'manual';
      await fetchScores(cachedResults.map(p => p.id), mode, focusedAxes, focusedScenes);
      setIsScoreOutdated(false);
    }
  };


  // Merge & Sort Logic
  const sortedPlaces = (() => {
    // 1. Merge
    const merged = cachedResults.map(initial => {
      const real = realtimePlaces[initial.id];

      const base = real || {
        id: initial.id,
        name: initial.name,
        originalRating: initial.rating,
        userRatingsTotal: initial.userRatingsTotal,
        address: initial.vicinity,
        status: 'pending', // Default
      } as Place;

      // Inject Personalized Score for UI if needed (though Place type doesn't have it explicitly, we look it up from pScores)
      // We can attach it to a temporary object or just use pScores in sort
      return base;
    });

    // 2. Sort
    return merged.sort((a, b) => {
      let valA = 0, valB = 0;
      if (sortBy === 'ai') {
        // Use Server Calculated Final Score exclusively
        valA = pScores[a.id]?.finalScore ?? (a.trueScore || 0);
        valB = pScores[b.id]?.finalScore ?? (b.trueScore || 0);

        // Tie-breaker
        if (Math.abs(valA - valB) < 0.01) {
          valA = a.trueScore ?? -999;
          valB = b.trueScore ?? -999;
        }
      } else { // google
        valA = a.originalRating ?? 0;
        valB = b.originalRating ?? 0;
      }
      return valB - valA; // Descending
    });
  })();



  // Update Sort when Focused Axes/Scenes change (Manual Mode) or Auto Mode
  // Force "Recommended" (AI) view on interaction to show relevant results immediately.
  useEffect(() => {
    if (focusedAxes.length > 0 || focusedScenes.length > 0 || isAutoPersonalize) {
      setSortBy('ai');
    }
  }, [focusedAxes.length, focusedScenes.length, isAutoPersonalize]);

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

  // Move handleLoadMore here to be accessible by fetchData
  const handleLoadMore = useCallback(async (tokenOverride?: string) => {
    const token = tokenOverride || cachedNextPageToken;
    // Note: checking cachedNextPageToken in closure might be stale if called immediately?
    // But tokenOverride solves this.
    if (!token || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await searchPlaces(query, token);
      appendResults(response.places, response.nextPageToken);
    } catch (error) {
      console.error("Failed to load more", error);
    } finally {
      setLoadingMore(false);
    }
  }, [cachedNextPageToken, loadingMore, query, appendResults]);

  // URLパラメータの変更を監視してデータを取得
  useEffect(() => {
    const fetchData = async () => {
      if (viewState === "LIST" && query) {
        // Cache Hit Check: If query matches cached query and we have results, skip
        if (query === cachedQuery && cachedResults.length > 0) {
          return;
        }

        setLoading(true);
        try {
          const response = await searchPlaces(query);
          setCache(query, response.places, response.nextPageToken);
          setLoading(false); // Immediate interaction allowed

          // Chain 2nd page load
          if (response.nextPageToken) {
            handleLoadMore(response.nextPageToken);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else if (viewState === "DETAIL" && placeId) {
        setLoading(true);
        try {
          await getPlaceDetails(placeId);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (viewState === "HOME") {
        setPlace(null);
      }
    };

    fetchData();
  }, [viewState, query, placeId, cachedQuery, cachedResults.length, setLoading, setCache, searchPlaces, handleLoadMore, getPlaceDetails, setPlace]);

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
    <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif selection:bg-brand-orange-dark/20">
      <Header viewState={viewState} onResetHome={resetHome} />

      {/* ヒーローセクション（ホーム画面でのみ表示） */}
      {viewState === "HOME" && (
        <>
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
                  onSearchStart={handleSearchStart}
                  onSearchComplete={handleSearchComplete}
                />
              </div>
            </div>
          </section>

          {/* サービスの価値提案（メリット） */}
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


        </>
      )}

      {/* リスト表示（検索結果） */}
      {viewState === "LIST" && (
        <div className="pt-32 pb-24 min-h-screen bg-brand-gray-light">
          <div className="container mx-auto px-6 mb-8">
            <div className="flex flex-col gap-6">
              <button
                onClick={resetHome}
                className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors w-fit font-medium"
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

                {/* Auto Personalize Toggle */}
                <div className="w-full border border-brand-gray pl-3 pr-3 rounded-xl bg-white/50 overflow-hidden shadow-sm">
                  <div className="pt-5">
                    <p className={"text-type-body font-semibold text-brand-black text-center mb-6"}>あなたが重視するポイントに合わせて、スコアを最適化します。</p>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-0 border-b border-brand-gray w-full">
                      <div className="flex gap-8 relative">
                        <button
                          onClick={() => setIsAutoPersonalize(false)}
                          className={`pb-3 px-2 text-type-button transition-all relative ${!isAutoPersonalize ? 'text-brand-orange-dark' : 'text-brand-black-light hover:text-brand-black'}`}
                        >
                          手動選択
                          {!isAutoPersonalize && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-t-full" />
                          )}
                        </button>

                        <div className="flex items-center gap-3 relative">

                          <button
                            onClick={() => {
                              if (!user) {
                                signInWithGoogle();
                                return;
                              }
                              setIsAutoPersonalize(true);
                            }}
                            className={`pb-3 px-2 text-type-button transition-all relative flex items-center gap-2 ${isAutoPersonalize ? 'text-brand-orange-dark' : 'text-brand-black-light hover:text-brand-orange'}`}
                          >
                            <Sparkles className={`w-3.5 h-3.5`} />
                            {!user ? "ログインして傾向を自動反映" : "傾向を自動反映"}
                            {isAutoPersonalize && (
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange-dark rounded-t-full" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {!isAutoPersonalize ? (
                      <div className="flex flex-col py-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        {/* 1. Axes */}
                        <div className="flex flex-col gap-3">
                          <h3 className="text-type-memo font-bold text-brand-black-light uppercase tracking-wider text-center">重視するポイント</h3>
                          <div className="flex  flex-wrap gap-2 justify-center">
                            {[
                              { id: 'taste', label: '味', icon: Utensils },
                              { id: 'service', label: '接客', icon: Heart },
                              { id: 'atmosphere', label: '雰囲気', icon: Sparkles },
                              { id: 'cost', label: 'コスパ', icon: TrendingUp },
                            ].map((axis) => (
                              <SelectionButton
                                key={axis.id}
                                isSelected={focusedAxes.includes(axis.id)}
                                onClick={() => handleAxisToggle(axis.id)}
                                label={axis.label}
                                icon={axis.icon}
                                variant="chip"
                              />
                            ))}
                          </div>
                        </div>

                        {/* 2. Manual Scenarios */}
                        <div className="flex flex-col gap-3 mt-4 border-t border-brand-gray pt-4">
                          <h3 className="text-type-memo font-bold text-brand-black-light uppercase tracking-wider text-center">利用シーン</h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {[
                              { id: 'solo', label: '少人数' },
                              { id: 'group', label: '団体' },
                              { id: 'date', label: 'デート' },
                              { id: 'business', label: 'ビジネス' },
                              { id: 'family', label: 'ファミリー' }
                            ].map((scene) => (
                              <SelectionButton
                                key={scene.id}
                                isSelected={focusedScenes.includes(scene.id)}
                                onClick={() => handleSceneToggle(scene.id)}
                                label={scene.label}
                                variant="chip"
                              />
                            ))}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 w-full mb-6">
                        {/* Chart Container */}
                        <h3 className="text-type-memo font-bold text-brand-black-light uppercase tracking-wider text-center mt-4">AIが学習したあなたの傾向</h3>
                        <div className="w-full max-w-sm">
                          {/* Use effectivePrefs if available, otherwise global profile */}
                          <UserPreferenceRadar preferences={effectivePrefs || profile?.aiPreferences} compact />
                        </div>
                        <p className="text-type-memo text-brand-black-light mt-2 mb-2 text-center">
                          💡 「いいね」をしてAIの精度を上げましょう
                        </p>

                        {/* 3. Auto Scenarios */}
                        <div className="flex flex-col gap-3 mt-4 border-t border-brand-gray pt-4">
                          <h3 className="text-type-memo font-bold text-brand-black-light uppercase tracking-wider text-center">利用シーン</h3>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {[
                              { id: 'solo', label: '少人数' },
                              { id: 'group', label: '団体' },
                              { id: 'date', label: 'デート' },
                              { id: 'business', label: 'ビジネス' },
                              { id: 'family', label: 'ファミリー' }

                            ].map((scene) => (
                              <SelectionButton
                                key={scene.id}
                                isSelected={focusedScenes.includes(scene.id)}
                                onClick={() => handleSceneToggle(scene.id)} // Shared Handler
                                label={scene.label}
                                variant="chip"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Global Scenarios (Removed from here) */}


              </div>

              {/* Sort Controls */}
              <div className="flex flex-col items-center mt-6 gap-2">
                <span className="text-type-body font-semibold text-brand-black">並び替え</span>
                <div className="bg-white p-1 rounded-full border border-brand-gray flex shadow-sm">
                  <SelectionButton
                    isSelected={sortBy === 'ai'}
                    onClick={() => setSortBy('ai')}
                    label="AI分析スコア"
                    icon={Sparkles}
                    variant="segment"
                  />
                  <SelectionButton
                    isSelected={sortBy === 'google'}
                    onClick={() => setSortBy('google')}
                    label="Google評価"
                    icon={Star}
                    variant="segment"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full min-w-0">
            {loading && sortedPlaces.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-brand-black animate-pulse bg-white/50 rounded-xl border border-dashed border-brand-gray">
                <MapPin className="mb-4 w-10 h-10 text-brand-black-light" />
                <p className="font-bold text-lg">Googleマップから最新情報を検索中...</p>
                <p className="text-sm mt-2">※AI分析はバックグラウンドで行われます</p>
              </div>
            ) : (
              <PlaceList
                places={sortedPlaces}
                onSelect={handlePlaceSelect}
                onLoadMore={() => handleLoadMore()}
                hasMore={!!cachedNextPageToken}
                loadingMore={loadingMore}
                focusedAxes={focusedAxes}
                focusedScenes={focusedScenes}
                personalizedScores={pScores}
                onActionComplete={handleActionComplete}
                isScoreOutdated={isScoreOutdated}
                onRecalculate={handleRecalculate}
                query={cachedQuery}
              />
            )}
          </div>
        </div>
      )
      }

      {/* 詳細表示（分析結果） */}
      {
        viewState === "DETAIL" && place && (
          <div className="pt-32 pb-24 container mx-auto px-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => {
                  const from = searchParams.get("from");
                  if (from === 'profile') {
                    router.back();
                    return;
                  }
                  const params = new URLSearchParams();
                  params.set("view", "LIST");
                  if (query) params.set("q", query);
                  if (focusedAxes.length > 0) params.set("focus", focusedAxes.join(","));
                  if (focusedScenes.length > 0) params.set("scenes", focusedScenes.join(","));
                  router.push(`/?${params.toString()}`);
                }}
                className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                戻る
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
                      className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
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
                      className="flex items-center gap-2 text-brand-black hover:text-brand-orange-dark transition-colors font-medium"
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
              isAutoMode={isAutoPersonalize}
              personalScore={pScores[place.id]}
            />
          </div>
        )}
      {(viewState === "LIST" || viewState === "DETAIL") && <ComparisonTray focusedScenes={focusedScenes} />}
    </main >
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-pulse text-brand-orange-dark">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
