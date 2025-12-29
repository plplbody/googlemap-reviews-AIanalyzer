
import { Place } from "@/types/schema";
import { UserProfile } from "@/types/user";

// Weights for Final Score
const WEIGHT_QUALITY = 0.65;
const WEIGHT_PREFERENCE = 0.35;

/**
 * Calculates the Personalized Score (0.0 - 5.0)
 * based on the Softmax Weighting Model and Feature Similarity.
 */
export function calculatePersonalizedScore(place: Place, user: UserProfile): {
    finalScore: number;
    weightedQualityScore: number;
    manageabilityScore: number; // Feature Match Score
    axisWeights: { taste: number; service: number; atmosphere: number; cost: number };
} {
    // 1. Calculate Axis Weights (Softmax)
    const latent = user.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 };
    const axes = ['taste', 'service', 'atmosphere', 'cost'] as const;

    // Calculate Exponentials
    const exps = axes.map(key => Math.exp(latent[key] || 0));
    const sumExps = exps.reduce((a, b) => a + b, 0);

    // Calculate Weights
    const weights: Record<string, number> = {};
    axes.forEach((key, index) => {
        weights[key] = exps[index] / sumExps;
    });

    // 2. Calculate Weighted Quality Score (S_weighted)
    let weightedSum = 0;
    axes.forEach(key => {
        const placeScore = place.axisScores?.[key] || 3.0;
        weightedSum += (weights[key] * placeScore);
    });
    // weightedSum is 0-5 range

    // 3. Calculate Feature Affinity Score (S_feat)
    const featureScore = calculateFeatureMatchScore(place.featureVector, user.featureAffinities);

    // 4. Final Score
    const finalScore = (WEIGHT_QUALITY * weightedSum) + (WEIGHT_PREFERENCE * featureScore);

    return {
        finalScore: parseFloat(finalScore.toFixed(2)),
        weightedQualityScore: parseFloat(weightedSum.toFixed(2)),
        manageabilityScore: parseFloat(featureScore.toFixed(2)),
        axisWeights: weights as any
    };
}

/**
 * Calculates Feature Match Score (0.0 - 5.0) using Cosine Similarity
 */
function calculateFeatureMatchScore(
    placeVector?: Record<string, number>,
    userVector?: Record<string, number>
): number {
    if (!placeVector || !userVector) return 2.5; // Neutral

    const keys = new Set([...Object.keys(placeVector), ...Object.keys(userVector)]);
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    keys.forEach(key => {
        const valA = userVector[key] || 0;
        const valB = placeVector[key] || 0;
        dotProduct += valA * valB;
        normA += valA * valA;
        normB += valB * valB;
    });

    if (normA === 0 || normB === 0) return 2.5; // Zero vector case

    const cosineSim = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));

    // Map -1.0~1.0 to 0.0~5.0
    // -1 -> 0
    // 0 -> 2.5
    // 1 -> 5.0
    const score = (cosineSim + 1.0) * 2.5;

    // Clamp
    return Math.max(0, Math.min(5, score));
}
