'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { Place } from '@/types/schema';
import { UserProfile } from '@/types/user';
import { calculatePlaceScore, ScoringMode, vecAdd, vecScale, vecZero, blendPreferences } from '../services/scoring';

const db = getFirestore();

export interface PersonalizedScore {
    placeId: string;
    trueScore: number;
    matchScore: number;
    finalScore: number;
    isPersonalized: boolean;
    effectivePreferences?: UserProfile['aiPreferences']; // The actual preferences used for calculation
}

export interface PersonalizeOptions {
    mode?: ScoringMode;
    focusedAxes?: string[];
    scenarioIds?: string[]; // Used for AI Tags (Vector Learning)
    focusedScenes?: string[]; // Used for Fixed Scenes (Rule-based x3 Weighting)
}

export async function getPersonalizedScores(
    placeIds: string[],
    uid?: string,
    options: PersonalizeOptions = {} // Changed signature to Object for extensibility
): Promise<Record<string, PersonalizedScore>> {
    const results: Record<string, PersonalizedScore> = {};

    if (!placeIds || placeIds.length === 0) return results;

    const { mode = 'auto', focusedAxes = [], scenarioIds = [], focusedScenes = [] } = options;

    // 1. Fetch User Data (if needed for Auto Mode or fallback)
    let userProfile: UserProfile | null = null;
    let targetVector: number[] | null = null;
    let effectivePreferences: UserProfile['aiPreferences'] | undefined;

    if (mode === 'auto' && uid) {
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
            userProfile = userDoc.data() as UserProfile;

            // Base: Global Preference Vector & Axes
            const globalVector = userProfile.preferenceVector || [];
            const globalAxes = userProfile.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 };

            // Scenario Logic (Vector & Axis Mixing)
            if (scenarioIds.length > 0 && globalVector.length > 0) {
                const scenariosVectors: number[][] = [];
                const scenariosAxes: UserProfile['aiPreferences'][] = [];

                for (const scId of scenarioIds) {
                    const scDoc = await userRef.collection('scenarios').doc(scId).get();
                    if (scDoc.exists) {
                        const data = scDoc.data();

                        // Collect Vectors
                        if (data && data.preferenceVector && data.preferenceVector.length === globalVector.length) {
                            scenariosVectors.push(data.preferenceVector);
                        }

                        // Collect Axis Preferences
                        if (data && data.aiPreferences) {
                            scenariosAxes.push(data.aiPreferences);
                        }
                    }
                }

                // --- Integrated Blending (Vector & Axis) ---
                const blended = blendPreferences(
                    globalAxes,
                    globalVector,
                    scenariosVectors.map((v, i) => ({
                        preferenceVector: v,
                        aiPreferences: scenariosAxes[i] || { taste: 0, service: 0, atmosphere: 0, cost: 0 }
                    }))
                );

                targetVector = blended.targetVector;
                effectivePreferences = blended.effectivePreferences;

            } else {
                targetVector = globalVector;
                effectivePreferences = globalAxes;
            }
        }
    }

    // 2. Fetch Places Data
    const placesRefs = placeIds.map(id => db.collection('places').doc(id));
    const placesDocs = await db.getAll(...placesRefs);

    // 3. Calculate Scores
    // Create a "Effective Profile" to pass to scoring (overriding aiPreferences)
    const scoringProfile = userProfile ? {
        ...userProfile,
        aiPreferences: effectivePreferences || userProfile.aiPreferences
    } as UserProfile : null;

    for (const doc of placesDocs) {
        if (!doc.exists) continue;
        const place = doc.data() as Place;

        const score = calculatePlaceScore(
            place,
            scoringProfile, // Use blended profile for calculation
            targetVector,
            { mode, focusedAxes, focusedScenes } // Use explicit focusedScenes for Rule-based scoring
        );

        results[place.id] = {
            placeId: place.id,
            ...score,
            effectivePreferences // Return to client for UI
        };
    }

    return results;
}
