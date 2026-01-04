'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { Place } from '@/types/schema';

export interface ComparisonResult {
    winnerId: string;
    reason: string;
    scores: Record<string, number>; // Match scores (0-100)
    matrix: Record<string, {
        taste: { score: string; pros: string[]; cons: string[] };
        service: { score: string; pros: string[]; cons: string[] };
        atmosphere: { score: string; pros: string[]; cons: string[] };
        cost: { score: string; pros: string[]; cons: string[] };
    }>;
}

// Helper: Cosine Similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function comparePlaces(placeIds: string[], userId?: string): Promise<ComparisonResult> {
    if (placeIds.length < 2) {
        throw new Error("比較には最低2店舗必要です");
    }

    // 1. Fetch Data & User Profile
    const db = getFirestore();
    const refs = placeIds.map(id => db.collection('places').doc(id));

    // Also fetch user profile if userId provided
    let userVector: number[] | null = null;
    if (userId) {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            userVector = userData?.preferenceVector || null;
        }
    }

    const snapshots = await db.getAll(...refs);

    const places: Place[] = [];
    snapshots.forEach(snap => {
        if (snap.exists) places.push(snap.data() as Place);
    });

    if (places.length < 2) {
        throw new Error("有効な店舗データが見つかりません");
    }

    // 2. Calculate Similarity & Rank
    const rankedPlaces = places.map(p => {
        let score = 0;
        // If user vector and place vector exist, calc cosine similarity
        if (userVector && p.embeddingVector) {
            score = cosineSimilarity(userVector, p.embeddingVector);
        } else {
            // Fallback: Use place's trueScore or rating if no vector match possible
            score = p.trueScore || p.originalRating || 0;
        }
        return { place: p, score };
    }).sort((a, b) => b.score - a.score); // Descending

    const winner = rankedPlaces[0];

    // 3. Construct Result
    const scores: Record<string, number> = {};
    rankedPlaces.forEach(rp => {
        scores[rp.place.id] = Math.round(rp.score * 100);
    });

    const result: ComparisonResult = {
        winnerId: winner.place.id,
        reason: `あなたとのマッチ度: ${userVector ? (winner.score * 100).toFixed(0) + '%' : 'データ不足のためスコア順'}`,
        scores,
        matrix: {}
    };

    places.forEach(p => {
        const getScore = (val?: number) => val ? val.toFixed(1) : "-";

        // Helper to safely get analysis text
        const getAnalysis = (axis: 'taste' | 'service' | 'atmosphere' | 'cost') => {
            const analysis = p.axisAnalysis?.[axis];
            return {
                score: getScore(p.axisScores?.[axis]),
                pros: analysis?.pros || [],
                cons: analysis?.cons || []
            };
        };

        result.matrix[p.id] = {
            taste: getAnalysis('taste'),
            service: getAnalysis('service'),
            atmosphere: getAnalysis('atmosphere'),
            cost: getAnalysis('cost')
        };
    });

    return result;
}
