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

// Vector Helpers (Duplicated from personalize.ts for self-containment)
const vecScale = (v: number[], s: number) => v.map(val => val * s);
const vecAdd = (v1: number[], v2: number[]) => v1.map((val, i) => val + (v2[i] || 0));
const vecZero = (dim: number) => new Array(dim).fill(0);

export async function comparePlaces(placeIds: string[], userId?: string, scenarioIds?: string[]): Promise<ComparisonResult> {
    if (placeIds.length < 2) {
        throw new Error("比較には最低2店舗必要です");
    }

    // 1. Fetch Data & User Profile
    const db = getFirestore();
    const refs = placeIds.map(id => db.collection('places').doc(id));

    // Also fetch user profile if userId provided
    let targetVector: number[] | null = null;
    if (userId) {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            const globalVector = userData?.preferenceVector || []; // Base Vector

            // Scenario Logic
            if (scenarioIds && scenarioIds.length > 0 && globalVector.length > 0) {
                const scenarios: number[][] = [];
                for (const scId of scenarioIds) {
                    const scDoc = await userRef.collection('scenarios').doc(scId).get();
                    if (scDoc.exists) {
                        const data = scDoc.data();
                        if (data && data.preferenceVector && data.preferenceVector.length === globalVector.length) {
                            scenarios.push(data.preferenceVector);
                        }
                    }
                }

                if (scenarios.length > 0) {
                    // Average Scenarios
                    const dim = globalVector.length;
                    let combinedScene = vecZero(dim);
                    scenarios.forEach(v => {
                        combinedScene = vecAdd(combinedScene, v);
                    });
                    combinedScene = vecScale(combinedScene, 1.0 / scenarios.length);

                    // Combine: (Global * 0.3) + (Scenario * 0.7)
                    targetVector = vecAdd(
                        vecScale(globalVector, 0.3),
                        vecScale(combinedScene, 0.7)
                    );
                } else {
                    targetVector = globalVector.length > 0 ? globalVector : null;
                }
            } else {
                targetVector = globalVector.length > 0 ? globalVector : null;
            }
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
        // If target vector and place vector exist, calc cosine similarity
        if (targetVector && p.embeddingVector) {
            const sim = cosineSimilarity(targetVector, p.embeddingVector);
            // Map -1.0~1.0 to 0.0~1.0 (for % display)
            score = (sim + 1.0) / 2.0;
        } else {
            // Fallback: Use place's trueScore (0-5) mapped to 0-1
            score = (p.trueScore || p.originalRating || 0) / 5.0;
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
        reason: `あなたとのマッチ度: ${targetVector ? (winner.score * 100).toFixed(0) + '%' : 'データ不足のためスコア順'}`,
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
