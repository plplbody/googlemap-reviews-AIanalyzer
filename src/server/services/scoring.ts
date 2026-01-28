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
    if (v1.length !== v2.length || v1.length === 0) return 0;
    const m1 = magnitude(v1);
    const m2 = magnitude(v2);
    if (m1 === 0 || m2 === 0) return 0;
    return dotProduct(v1, v2) / (m1 * m2);
};

// XP Calculation Logic
import { XP_GAIN } from '@/lib/constants';

export const calculateNewXP = (currentXP: number, type: 'global' | 'tag'): number => {
    const gain = type === 'global' ? XP_GAIN.GLOBAL_PER_ACTION : XP_GAIN.TAG_PER_ACTION;
    return currentXP + gain;
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

        // Usage Score (Scene Rules)
        let S_usage = 0;
        let hasUsageScore = false;
        if (options.focusedScenes && options.focusedScenes.length > 0 && place.usageScores) {
            const scenes = options.focusedScenes;
            let sum = 0;
            scenes.forEach(scene => {
                const val = place.usageScores?.[scene as keyof UsageScores] || 0;
                sum += val;
            });
            S_usage = sum / scenes.length;
            hasUsageScore = true;
        }

        // Hybrid Score Calculation
        if (hasUsageScore) {
            // Unify Logic: Scene Rule (x3) + AI Vector (x1.5) + Axis Prefs (x1.0)
            // Weighting designed to respect the explicit "Rule" (Scene) while keeping Personalization.
            const W_scene = 3.0; // Strong rule enforcement
            const W_vector = 1.5; // AI Personalization
            const W_axes = 1.0; // General Profile

            let numerator = (S_usage * W_scene) + (S_match * W_vector);
            let denominator = W_scene + W_vector;

            // Include Axes if they exist (S_weighted is always calced, defaulting to S_quality)
            // But if user has NO preferences, S_weighted is just base quality.
            numerator += (S_weighted * W_axes);
            denominator += W_axes;

            S_final = numerator / denominator;
        } else {
            // Standard Auto Mode (No Scene Selected)
            if (isPersonalized) {
                S_final = (0.4 * S_weighted) + (0.6 * S_match);
            } else {
                S_final = S_weighted;
            }
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
        isPersonalized = true;
    }

    // --- SAKURA PENALTY APPLICATION ---
    // Apply the persisted penalty to the re-calculated personalized scores.
    // This ensures that even if Axis Scores are high, the final result is suppressed.
    if (place.sakuraPenalty) {
        const p = place.sakuraPenalty;
        S_final = Math.max(1.0, S_final - p);
        S_match = Math.max(1.0, S_match - p);
        // Note: S_quality (place.trueScore) is already penalized in DB.
    }

    return {
        trueScore: Number(S_quality.toFixed(2)),
        matchScore: Number(S_match.toFixed(2)),
        finalScore: Number(S_final.toFixed(2)),
        isPersonalized
    };
}

// Preference Blending Logic (Centralized)
// Blends Global Preferences (30%) with Scene/Tag Preferences (70%)
export function blendPreferences(
    globalPrefs: UserProfile['aiPreferences'],
    globalVector: number[],
    scenarios: { aiPreferences: UserProfile['aiPreferences'], preferenceVector?: number[] }[]
) {
    // 1. Vector Blending
    const dim = globalVector.length;
    let targetVector = globalVector; // Default to global

    if (scenarios.length > 0 && globalVector.length > 0) {
        let combinedSceneVector = vecZero(dim);
        let validVectors = 0;

        scenarios.forEach(s => {
            if (s.preferenceVector && s.preferenceVector.length === dim) {
                combinedSceneVector = vecAdd(combinedSceneVector, s.preferenceVector);
                validVectors++;
            }
        });

        if (validVectors > 0) {
            combinedSceneVector = vecScale(combinedSceneVector, 1.0 / validVectors);
            targetVector = vecAdd(
                vecScale(globalVector, 0.3),
                vecScale(combinedSceneVector, 0.7)
            );
        }
    }

    // 2. Axis Blending
    let effectivePreferences = globalPrefs;

    if (scenarios.length > 0) {
        const combinedSceneAxes = { taste: 0, service: 0, atmosphere: 0, cost: 0 };

        scenarios.forEach(s => {
            combinedSceneAxes.taste += s.aiPreferences.taste;
            combinedSceneAxes.service += s.aiPreferences.service;
            combinedSceneAxes.atmosphere += s.aiPreferences.atmosphere;
            combinedSceneAxes.cost += s.aiPreferences.cost;
        });

        const count = scenarios.length;
        combinedSceneAxes.taste /= count;
        combinedSceneAxes.service /= count;
        combinedSceneAxes.atmosphere /= count;
        combinedSceneAxes.cost /= count;

        effectivePreferences = {
            taste: Number(((globalPrefs.taste * 0.3) + (combinedSceneAxes.taste * 0.7)).toFixed(4)),
            service: Number(((globalPrefs.service * 0.3) + (combinedSceneAxes.service * 0.7)).toFixed(4)),
            atmosphere: Number(((globalPrefs.atmosphere * 0.3) + (combinedSceneAxes.atmosphere * 0.7)).toFixed(4)),
            cost: Number(((globalPrefs.cost * 0.3) + (combinedSceneAxes.cost * 0.7)).toFixed(4)),
        };
    }

    return {
        effectivePreferences,
        targetVector
    };
}
