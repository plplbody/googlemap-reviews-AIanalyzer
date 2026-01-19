"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebase/client";

import Header from "@/components/Header";
import { ComparisonTray } from '@/components/ComparisonTray';
import { Place } from "@/types/schema";
import { UserScenario } from "@/types/user";
import {
  searchPlaces,
  getPlaceDetails,
} from "@/server/actions/place";
import { getUserScenarios } from "@/server/actions/user";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRealtimePlaces } from "@/hooks/useRealtimePlaces";

// Extracted Hooks
import { useFilterParams } from "@/hooks/useFilterParams";
import { usePersonalizedScores } from "@/hooks/usePersonalizedScores";
import { usePlaceSorter } from "@/hooks/usePlaceSorter";

// Extracted Components
import HeroSection from "@/components/home/HeroSection";
import ServiceBenefits from "@/components/home/ServiceBenefits";
import PlaceListView from "@/components/places/PlaceListView";
import PlaceDetailView from "@/components/places/PlaceDetailView";

type ViewState = "HOME" | "LIST" | "DETAIL";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL State Derivation
  const viewState = (searchParams.get("view") as ViewState) || "HOME";
  const query = searchParams.get("q") || "";
  const placeId = searchParams.get("id");

  // Global Contexts
  const { cachedResults, cachedNextPageToken, cachedQuery, setCache, appendResults } = useSearch();
  const { user, profile, signInWithGoogle } = useAuth();
  const { places: realtimePlaces } = useRealtimePlaces(cachedResults.map(p => p.id));

  // Local State
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState<'ai' | 'google'>('ai');
  const [userTags, setUserTags] = useState<UserScenario[]>([]);

  // 1. Custom Hook: Filter Logic (URL Sync)
  const {
    focusedAxes,
    focusedScenes,
    focusedTags,
    handleAxisToggle,
    handleSceneToggle,
    handleTagToggle
  } = useFilterParams();

  // 2. Custom Hook: Personalization Logic
  const [isAutoPersonalize, setIsAutoPersonalize] = useState(false); // Default false, synced with Auth below

  // Sync AutoPersonalize with Auth
  useEffect(() => {
    setIsAutoPersonalize(!!user);
  }, [user]);

  // Fetch User Tags
  useEffect(() => {
    if (user?.uid) {
      getUserScenarios(user.uid).then(scenarios => {
        const reserved = ['solo', 'group', 'date', 'business', 'family'];
        const tags = scenarios.filter(s => !reserved.includes(s.id));
        setUserTags(tags);
      });
    } else {
      setUserTags([]);
    }
  }, [user?.uid]);

  const {
    pScores,
    effectivePrefs,
    isScoreOutdated,
    fetchScores, // Exposed if needed manually
    handleActionComplete,
    handleRecalculate
  } = usePersonalizedScores({
    userUid: user?.uid,
    isAutoPersonalize,
    focusedAxes,
    focusedScenes,
    focusedTags,
    places: cachedResults
  });

  // 3. Custom Hook: Sort Logic
  // Auto-switch to AI sort on interaction
  useEffect(() => {
    if (focusedAxes.length > 0 || focusedScenes.length > 0 || focusedTags.length > 0 || isAutoPersonalize) {
      setSortBy('ai');
    }
  }, [focusedAxes.length, focusedScenes.length, focusedTags.length, isAutoPersonalize]);

  const sortedPlaces = usePlaceSorter({
    cachedResults,
    realtimePlaces,
    pScores,
    sortBy
  });

  // Navigation Handlers
  const handleSearchStart = () => setLoading(true);

  const handleSearchComplete = (newQuery: string) => {
    const params = new URLSearchParams();
    params.set("view", "LIST");
    params.set("q", newQuery);
    router.push(`/?${params.toString()}`);
  };

  const handlePlaceSelect = (selectedPlaceId: string, from?: string) => {
    const params = new URLSearchParams();
    params.set("view", "DETAIL");
    params.set("id", selectedPlaceId);
    if (query) params.set("q", query);
    if (focusedAxes.length > 0) params.set("focus", focusedAxes.join(","));
    if (focusedScenes.length > 0) params.set("scenes", focusedScenes.join(","));
    if (focusedTags.length > 0) params.set("tags", focusedTags.join(","));
    if (from) params.set("from", from); // Pass 'from' context (e.g. 'profile')

    router.push(`/?${params.toString()}`);
  };

  const resetHome = () => router.push("/");

  const handleLoadMore = useCallback(async (tokenOverride?: string) => {
    const token = tokenOverride || cachedNextPageToken;
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

  // Data Fetching & Routing Effect
  useEffect(() => {
    const fetchData = async () => {
      if (viewState === "LIST" && query) {
        if (query === cachedQuery && cachedResults.length > 0) return;

        setLoading(true);
        try {
          const response = await searchPlaces(query);
          setCache(query, response.places, response.nextPageToken);
          setLoading(false);

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
  }, [viewState, query, placeId, cachedQuery, cachedResults.length, setCache, handleLoadMore]);

  // Detail View: Scroll Top
  useEffect(() => {
    if (viewState === "DETAIL") {
      window.scrollTo(0, 0);
    }
  }, [viewState]);

  // Detail View: Realtime Listener
  useEffect(() => {
    if (viewState !== "DETAIL" || !placeId) return;

    console.log(`Start listening for place: ${placeId}`);
    const unsubscribe = onSnapshot(doc(firestore, "places", placeId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as Place;
        setPlace({ ...data, id: docSnapshot.id });
      } else {
        console.log("Place not found in Firestore");
      }
    }, (error) => {
      console.error("Firestore listen error:", error);
    });

    return () => unsubscribe();
  }, [viewState, placeId]);


  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-serif selection:bg-brand-orange-dark/20">
      <Header viewState={viewState} onResetHome={resetHome} />

      {viewState === "HOME" && (
        <>
          <HeroSection
            onSearchStart={handleSearchStart}
            onSearchComplete={handleSearchComplete}
          />
          <ServiceBenefits />
        </>
      )}

      {viewState === "LIST" && (
        <PlaceListView
          sortedPlaces={sortedPlaces}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={!!cachedNextPageToken}
          onSearchStart={handleSearchStart}
          onSearchComplete={handleSearchComplete}
          cachedQuery={cachedQuery}
          onResetHome={resetHome}
          onSelectPlace={handlePlaceSelect}
          onLoadMore={() => handleLoadMore()}
          user={user}
          profile={profile}
          effectivePrefs={effectivePrefs}
          isAutoPersonalize={isAutoPersonalize}
          setIsAutoPersonalize={setIsAutoPersonalize}
          focusedAxes={focusedAxes}
          handleAxisToggle={handleAxisToggle}
          focusedScenes={focusedScenes}
          handleSceneToggle={handleSceneToggle}
          focusedTags={focusedTags}
          handleTagToggle={handleTagToggle}
          userTags={userTags}
          setUserTags={setUserTags}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onSignIn={signInWithGoogle}
          pScores={pScores}
          onActionComplete={handleActionComplete}
          isScoreOutdated={isScoreOutdated}
          onRecalculate={handleRecalculate}
        />
      )}

      {viewState === "DETAIL" && place && (
        <PlaceDetailView
          place={place}
          onBack={() => {
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
            if (focusedTags.length > 0) params.set("tags", focusedTags.join(","));
            router.push(`/?${params.toString()}`);
          }}
          onNext={() => {
            const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
            const nextPlace = currentIndex !== -1 && currentIndex < sortedPlaces.length - 1
              ? sortedPlaces[currentIndex + 1]
              : null;
            if (nextPlace) handlePlaceSelect(nextPlace.id);
          }}
          onPrev={() => {
            const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
            const prevPlace = currentIndex !== -1 && currentIndex > 0
              ? sortedPlaces[currentIndex - 1]
              : null;
            if (prevPlace) handlePlaceSelect(prevPlace.id);
          }}
          hasPrev={(() => {
            const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
            return currentIndex !== -1 && currentIndex > 0;
          })()}
          hasNext={(() => {
            const currentIndex = sortedPlaces.findIndex(p => p.id === place.id);
            return currentIndex !== -1 && currentIndex < sortedPlaces.length - 1;
          })()}
          focusedAxes={focusedAxes}
          focusedScenes={focusedScenes}
          onToggleAxis={handleAxisToggle}
          onToggleScene={handleSceneToggle}
          isAutoMode={isAutoPersonalize}
          personalScore={pScores[place.id]}
        />
      )}

      {(viewState === "LIST" || viewState === "DETAIL") && (
        <ComparisonTray focusedScenes={focusedScenes} />
      )}
    </main>
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
