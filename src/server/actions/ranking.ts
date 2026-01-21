'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { Place } from '@/types/schema';
import { CITIES, PREFECTURES } from '@/constants/seo-areas';
import { calculatePlaceScore } from '@/server/services/scoring';

import { cache } from 'react';

// Memoized version of getRankingPlaces for Request De-duplication (S5-Impl-02)
export const getRankingPlaces = cache(async (prefecture: string, city: string, scene: string): Promise<Place[]> => {
    const db = getFirestore();
    const placesRef = db.collection('places');

    // 1. Resolve Area Name
    // @ts-ignore
    const targetCity = CITIES[prefecture]?.find((c: any) => c.id === city);

    if (!targetCity) return [];

    const areaName = targetCity.name;

    // 2. Query Firestore
    // Query: Area array contains 'areaName' AND Status is 'completed'
    // Limit: Removed limit for accuracy (S5-Impl-03)
    try {
        const snapshot = await placesRef
            .where('area', 'array-contains', areaName)
            .where('status', '==', 'completed')
            .get(); // No limit

        const places: Place[] = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            places.push({
                ...data,
                id: doc.id,
                // Convert Timestamps to Dates to avoid serialization errors
                createdAt: (data.createdAt as any)?.toDate?.() || new Date(data.createdAt),
                updatedAt: (data.updatedAt as any)?.toDate?.() || new Date(data.updatedAt),
                lastAnalyzedAt: (data.lastAnalyzedAt as any)?.toDate?.() || (data.lastAnalyzedAt ? new Date(data.lastAnalyzedAt) : undefined),
            } as Place);
        });

        // 3. Sort by Weighted Score (Manual Mode with Scene Focus)
        // This approximates the logic used in the main search list for anonymous users

        // Calculate scores first to avoid repeated calculations during sort
        const placesWithScores = places.map(p => {
            const result = calculatePlaceScore(p, null, null, {
                mode: 'manual',
                focusedScenes: [scene]
            });
            return { place: p, score: result.finalScore };
        });

        placesWithScores.sort((a, b) => b.score - a.score);

        // 4. Return Top 100 (expanded for SEO/Discoverability "100選")
        return placesWithScores.slice(0, 100).map(item => ({
            ...item.place,
            trueScore: item.score
        }));

    } catch (e) {
        console.error('Failed to fetch ranking places:', e);
        return [];
    }
});

/**
 * Returns a set of valid "city:scene" keys that have at least 3 results.
 * Used for Link Pruning on Directory Pages (ISR).
 * This aggregates counts in-memory after fetching all places in the prefecture.
 * (Efficient enough for < 10k items per pref)
 */
export async function getPrefectureStats(prefectureSlug: string): Promise<Set<string>> {
    const db = getFirestore();

    // In the new system, we use 'prefectureSlug' as the ID (e.g., 'hokkaido')
    // Stats are pre-calculated by /api/cron/stats

    try {
        const docRef = db.collection('stats').doc(prefectureSlug);
        const doc = await docRef.get();

        if (!doc.exists) {
            // Fallback: If no stats found (e.g. before first cron run), return empty set
            // or we could trigger a calculation, but returning empty is safer for performance.
            console.warn(`No stats found for ${prefectureSlug}. Run /api/cron/stats to generate.`);
            return new Set();
        }

        const data = doc.data();
        const counts = data?.counts as Record<string, number> || {};
        const validKeys = new Set<string>();

        // Filter for >= 3
        for (const [key, count] of Object.entries(counts)) {
            if (count >= 3) {
                validKeys.add(key);
            }
        }

        return validKeys;

    } catch (e) {
        console.error('Failed to get prefecture stats:', e);
        return new Set();
    }
}
