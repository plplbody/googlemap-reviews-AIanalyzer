'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { Place } from '@/types/schema';
import { UserProfile } from '@/types/user';

const db = getFirestore();

export interface PersonalizedScore {
    placeId: string;
    trueScore: number; // Raw AI Score (Quality)
    matchScore: number; // Embedding Similarity (0-5)
    finalScore: number; // Hybrid (0-5)
    isPersonalized: boolean; // True if user data was used
}

// Vector Math Helpers
const dotProduct = (v1: number[], v2: number[]) => {
    return v1.reduce((sum, val, i) => sum + (val * (v2[i] || 0)), 0);
};

const magnitude = (v: number[]) => {
    return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
};

const cosineSimilarity = (v1: number[], v2: number[]) => {
    const m1 = magnitude(v1);
    const m2 = magnitude(v2);
    if (m1 === 0 || m2 === 0) return 0;
    return dotProduct(v1, v2) / (m1 * m2);
};

export async function getPersonalizedScores(
    placeIds: string[],
    uid?: string
): Promise<Record<string, PersonalizedScore>> {
    const results: Record<string, PersonalizedScore> = {};

    if (!placeIds || placeIds.length === 0) return results;

    // 1. Fetch User Data (if uid provided)
    let userProfile: UserProfile | null = null;
    if (uid) {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            userProfile = userDoc.data() as UserProfile;
        }
    }

    // 2. Fetch Places Data
    // Firestore "in" query limited to 10-30 items usually. 
    // If placeIds > 30, we should chunk. Assuming typical page size 20.
    const placesRefs = placeIds.map(id => db.collection('places').doc(id));
    const placesDocs = await db.getAll(...placesRefs);

    for (const doc of placesDocs) {
        if (!doc.exists) continue;
        const place = doc.data() as Place;

        // Default Quality Score (AI Analysis)
        // If analysis not done, fallback to Google Rating or 3.0
        const S_quality = place.trueScore || place.originalRating || 3.0;

        // Personalization Logic
        let S_match = 3.0; // Default Neutral
        let isPersonalized = false;

        if (userProfile && place.embeddingVector && userProfile.preferenceVector) {
            // Check dimensions
            if (place.embeddingVector.length === userProfile.preferenceVector.length) {
                const sim = cosineSimilarity(userProfile.preferenceVector, place.embeddingVector);
                // Map -1.0~1.0 to 0.0~5.0
                // -1 -> 0, 0 -> 2.5, 1 -> 5.0
                S_match = (sim + 1.0) * 2.5;
                isPersonalized = true;
            }
        } else if (userProfile && place.featureVector && userProfile.featureAffinities) {
            // Fallback to Legacy Feature Vector if Embedding missing
            // (Logic omitted for brevity, focusing on Hybrid Embedding)
        }

        // Weighted Quality Score (if User has Axis Preferences)
        let S_weighted = S_quality;
        if (userProfile && userProfile.aiPreferences && place.axisScores) {
            // Calculate Normalized Weights from aiPreferences (Softmax-like or just shifts)
            // Spec says: S_weighted = Sum(w_i * S_place[i])
            // Simplification: We use S_quality as base and adjust by axis preference?
            // Actually, the spec defines Step 1: Axis Weighting.
            // But for now, let's use S_quality directly if Axis Scores are integrated in it?
            // No, TrueScore is usually an average.

            // Let's rely on S_quality being the "Objective Quality"
            // And we might adjust S_quality based on Axis Preferences if we implemented that logic.
            // For strict F-04 spec:
            // S_weighted = Sum(w * score)
            // Let's implement this if place has axisScores.

            const prefs = userProfile.aiPreferences;
            const axes = ['taste', 'service', 'atmosphere', 'cost'] as const;

            // Softmax weights? 
            // Logic in spec: w_i = e^L_i / sum(e^L)
            const expWeights = axes.map(k => Math.exp(prefs[k] || 0));
            const sumExp = expWeights.reduce((a, b) => a + b, 0);
            const normalizedWeights = expWeights.map(v => v / sumExp);

            let weightedSum = 0;
            axes.forEach((k, idx) => {
                const score = place.axisScores?.[k] || 3.0;
                weightedSum += score * normalizedWeights[idx];
            });

            S_weighted = weightedSum;
        }

        // Hybrid Score Calculation
        // Spec: S_final = 0.4 * S_weighted + 0.6 * S_match
        // If not personalized (no vector), S_final = S_quality

        let S_final = S_quality;
        if (isPersonalized) {
            S_final = (0.4 * S_weighted) + (0.6 * S_match);
        }

        results[place.id] = {
            placeId: place.id,
            trueScore: Number(S_quality.toFixed(2)),
            matchScore: Number(S_match.toFixed(2)),
            finalScore: Number(S_final.toFixed(2)),
            isPersonalized
        };
    }

    return results;
}
