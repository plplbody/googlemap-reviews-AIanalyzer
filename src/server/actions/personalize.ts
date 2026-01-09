'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { Place } from '@/types/schema';
import { UserProfile } from '@/types/user';
import { calculatePlaceScore, ScoringMode, vecAdd, vecScale, vecZero } from '../services/scoring';

const db = getFirestore();

export interface PersonalizedScore {
    placeId: string;
    trueScore: number;
    matchScore: number;
    finalScore: number;
    isPersonalized: boolean;
}

export interface PersonalizeOptions {
    mode?: ScoringMode;
    focusedAxes?: string[];
    scenarioIds?: string[];
}

export async function getPersonalizedScores(
    placeIds: string[],
    uid?: string,
    options: PersonalizeOptions = {} // Changed signature to Object for extensibility
): Promise<Record<string, PersonalizedScore>> {
    const results: Record<string, PersonalizedScore> = {};

    if (!placeIds || placeIds.length === 0) return results;

    const { mode = 'auto', focusedAxes = [], scenarioIds = [] } = options;

    // 1. Fetch User Data (if needed for Auto Mode or fallback)
    let userProfile: UserProfile | null = null;
    let targetVector: number[] | null = null;

    if (mode === 'auto' && uid) {
        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
            userProfile = userDoc.data() as UserProfile;

            // Base: Global Preference Vector
            const globalVector = userProfile.preferenceVector || [];

            // Scenario Logic (Vector Mixing)
            if (scenarioIds.length > 0 && globalVector.length > 0) {
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
                    const dim = globalVector.length;
                    let combinedScene = vecZero(dim);
                    scenarios.forEach(v => {
                        combinedScene = vecAdd(combinedScene, v);
                    });
                    combinedScene = vecScale(combinedScene, 1.0 / scenarios.length);

                    targetVector = vecAdd(
                        vecScale(globalVector, 0.3),
                        vecScale(combinedScene, 0.7)
                    );
                } else {
                    targetVector = globalVector;
                }
            } else {
                targetVector = globalVector;
            }
        }
    }

    // 2. Fetch Places Data
    const placesRefs = placeIds.map(id => db.collection('places').doc(id));
    const placesDocs = await db.getAll(...placesRefs);

    // 3. Calculate Scores
    for (const doc of placesDocs) {
        if (!doc.exists) continue;
        const place = doc.data() as Place;

        const score = calculatePlaceScore(
            place,
            userProfile,
            targetVector,
            { mode, focusedAxes, focusedScenes: scenarioIds }
        );

        results[place.id] = {
            placeId: place.id,
            ...score
        };
    }

    return results;
}
