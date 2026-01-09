import { Place, UsageScores } from '@/types/schema';
import { UserProfile } from '@/types/user';

export type ScoringMode = 'auto' | 'manual';

export interface ScoringOptions {
    mode: ScoringMode;
    focusedAxes?: string[];
    focusedScenes?: string[];
}

export interface ScoreResult {
    trueScore: number;
    matchScore: number;
    finalScore: number;
    isPersonalized: boolean;
}

// Vector Helpers
export const vecScale = (v: number[], s: number) => v.map(val => val * s);
export const vecAdd = (v1: number[], v2: number[]) => v1.map((val, i) => val + (v2[i] || 0));
export const vecZero = (dim: number) => new Array(dim).fill(0);
const dotProduct = (v1: number[], v2: number[]) => v1.reduce((sum, val, i) => sum + (val * (v2[i] || 0)), 0);
const magnitude = (v: number[]) => Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
export const cosineSimilarity = (v1: number[], v2: number[]) => {
    const m1 = magnitude(v1);
    const m2 = magnitude(v2);
    if (m1 === 0 || m2 === 0) return 0;
    return dotProduct(v1, v2) / (m1 * m2);
};

export function calculatePlaceScore(
    place: Place,
    userProfile: UserProfile | null,
    targetVector: number[] | null,
    options: ScoringOptions
): ScoreResult {
    // 1. Base Score (AI Quality)
    const S_quality = place.trueScore || place.originalRating || 3.0; // Fallback to rating if trueScore missing? Types say originalRating

    let S_match = 0;
    let S_final = S_quality;
    let isPersonalized = false;

    if (options.mode === 'auto') {
        // --- AUTO MODE (Vector & Profile) ---
        // Match Score (Vector)
        // Default Neutral = 3.0
        S_match = 3.0;

        if (targetVector && place.embeddingVector) {
            const sim = cosineSimilarity(targetVector, place.embeddingVector);
            S_match = (sim + 1.0) * 2.5; // -1~1 -> 0~5
            isPersonalized = true;
        }

        // Weighted Quality Score (Axis Preferences)
        let S_weighted = S_quality;
        if (userProfile?.aiPreferences && place.axisScores) {
            const prefs = userProfile.aiPreferences;
            const axes = ['taste', 'service', 'atmosphere', 'cost'] as const;
            const expWeights = axes.map(k => Math.exp(prefs[k] || 0));
            const sumExp = expWeights.reduce((a, b) => a + b, 0);
            const normalizedWeights = expWeights.map(v => v / sumExp);
            let weightedSum = 0;
            axes.forEach((k, idx) => {
                const score = place.axisScores?.[k] || 3.0; // Center if missing
                weightedSum += score * normalizedWeights[idx];
            });
            S_weighted = weightedSum;
        }

        // Hybrid Score
        if (isPersonalized) {
            S_final = (0.4 * S_weighted) + (0.6 * S_match);
        } else {
            S_final = S_weighted;
        }

    } else {
        // --- MANUAL MODE (Explicit Weights) ---
        // If no selection, return Base Score (or should match score be 0?)
        // Spec usually implies: No filter = Standard Ranking.

        const axes = options.focusedAxes || [];
        const scenes = options.focusedScenes || [];

        if (axes.length === 0 && scenes.length === 0) {
            return {
                trueScore: Number(S_quality.toFixed(2)),
                matchScore: 0, // No match criteria
                finalScore: Number(S_quality.toFixed(2)),
                isPersonalized: false
            };
        }

        const scoreObj = place.axisScores || { taste: 3, service: 3, atmosphere: 3, cost: 3 };
        const usageObj = place.usageScores || {} as UsageScores;

        let totalScore = 0;
        let totalWeight = 0;

        // Standard Axes
        ['taste', 'service', 'atmosphere', 'cost'].forEach(axis => {
            const val = scoreObj[axis as keyof typeof scoreObj] || 3;
            // Weight: 3 if focused, 1 if not
            const weight = axes.includes(axis) ? 3 : 1;
            totalScore += val * weight;
            totalWeight += weight;
        });

        // Scenarios
        ['business', 'date', 'solo', 'family', 'group'].forEach(scene => {
            if (scenes.includes(scene)) {
                // Weight 3 if focused (Add to total)
                const val = usageObj[scene as keyof UsageScores] || 0; // Usage scores are 0-5
                const weight = 3;
                totalScore += val * weight;
                totalWeight += weight;
            }
        });

        const weightedAvg = totalWeight > 0 ? totalScore / totalWeight : 0;

        // In Manual Mode, "Match Score" is effectively the Weighted Average
        S_match = weightedAvg;
        S_final = weightedAvg;
        isPersonalized = true;
    }

    return {
        trueScore: Number(S_quality.toFixed(2)),
        matchScore: Number(S_match.toFixed(2)),
        finalScore: Number(S_final.toFixed(2)),
        isPersonalized
    };
}
