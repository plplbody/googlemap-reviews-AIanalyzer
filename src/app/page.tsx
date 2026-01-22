import { Metadata } from "next";
import { Suspense } from "react";
import ClientHomeWrapper from "@/components/ClientHomeWrapper";
import JsonLd from "@/components/seo/JsonLd";
import { searchPlaces, getPlaceDetails } from "@/server/actions/place";
import { Place } from "@/types/schema";

// Revalidate every hour for default lists, but search is dynamic
export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{
    view?: string;
    q?: string;
    id?: string;
    focus?: string;
    scenes?: string;
    tags?: string;
    from?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { view, q: query, id: placeId } = await searchParams;

  if (view === "DETAIL" && placeId) {
    try {
      const place = await getPlaceDetails(placeId);
      if (place) {
        return {
          title: `${place.name} - AI Concierge`,
          description: place.summary ? (Array.isArray(place.summary) ? place.summary[0] : place.summary) : `AIによる${place.name}の詳細分析結果です。`,
          openGraph: {
            title: `${place.name} | AI Concierge`,
            description: place.summary ? (Array.isArray(place.summary) ? place.summary.join(' ') : place.summary) : undefined,
            images: place.hotpepper?.imageUrl ? [place.hotpepper.imageUrl] : [],
          }
        };
      }
    } catch (e) {
      console.error("Metadata fetch failed", e);
    }
  }

  if (view === "LIST" && query) {
    return {
      title: `「${query}」の検索結果 - AI Concierge`,
      description: `AIが分析した「${query}」に関連する厳選レストランの検索結果です。`,
    };
  }

  return {
    title: "AI Concierge for グルメ | あなたに最適なお店をAIが探します",
    description: "Googleマップの口コミをAIが深層分析。あなたの好みやシーンに合わせた最適なレストランを提案する新しいグルメ検索サービス。",
  };
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const { view = "HOME", q: query, id: placeId } = resolvedParams;

  let initialPlaces: Place[] = [];
  let initialPlace: Place | null = null;
  let initialNextPageToken: string | undefined;

  // Server-Side Data Fetching
  try {
    if (view === "LIST" && query) {
      const result = await searchPlaces(query);
      initialPlaces = result.places;
      initialNextPageToken = result.nextPageToken;
    } else if (view === "DETAIL" && placeId) {
      initialPlace = await getPlaceDetails(placeId);
    }
  } catch (error) {
    console.error("Server-side fetch error:", error);
    // On error, we just render wrapper with empty initial data, client might retry or show error
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="animate-pulse text-brand-orange-dark font-bold text-lg">Loading...</div>
      </div>
    }>
      {view === "HOME" && <JsonLd type="WebSite" />}
      {view === "LIST" && <JsonLd type="ItemList" places={initialPlaces} query={query} />}
      {view === "DETAIL" && initialPlace && <JsonLd type="Restaurant" place={initialPlace} />}

      <ClientHomeWrapper
        initialPlaces={initialPlaces}
        initialPlace={initialPlace}
        // @ts-ignore
        initialViewMode={view as any}
        initialQuery={query}
        initialNextPageToken={initialNextPageToken}
      />
    </Suspense>
  );
}
