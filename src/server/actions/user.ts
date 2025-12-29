'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { UserInteraction, UserProfile } from '@/types/user';
import { Place } from '@/types/schema';
import { FieldValue } from 'firebase-admin/firestore';
import { serializePlace } from '@/lib/utils/serialization';

const db = getFirestore();

// --- 1. Save/Bookmark Action ---
export async function toggleSavePlace(uid: string, placeId: string, isSaved: boolean) {
    if (!uid || !placeId) return;

    const interactionRef = db.collection('users').doc(uid).collection('interactions').doc(placeId);

    await interactionRef.set({
        uid,
        placeId,
        isSaved,
        updatedAt: FieldValue.serverTimestamp() // Firestore Timestamp
    }, { merge: true });
}

// --- 2. Evaluation / Personalization Action ---
// Rewriting function to fetch interaction properly

// --- 2. Evaluation / Personalization Action ---
const LEARNING_RATE_ALPHA = 0.2; // Move 20% closer to the target per interaction

// Vector Math Helpers
const vecAdd = (v1: number[], v2: number[]) => v1.map((val, i) => val + (v2[i] || 0));
const vecSub = (v1: number[], v2: number[]) => v1.map((val, i) => val - (v2[i] || 0));
const vecScale = (v: number[], s: number) => v.map(val => val * s);
const vecZero = (dim: number) => new Array(dim).fill(0);

export async function submitEvaluation(
    uid: string,
    placeId: string,
    evaluation: UserInteraction['evaluation'] | null // Accept null for removal
) {
    if (!uid || !placeId) return;

    const userRef = db.collection('users').doc(uid);
    const placeRef = db.collection('places').doc(placeId);
    const interactionRef = userRef.collection('interactions').doc(placeId);

    await db.runTransaction(async (t) => {
        const userDoc = await t.get(userRef);
        const placeDoc = await t.get(placeRef);
        const interactionDoc = await t.get(interactionRef);

        if (!userDoc.exists || !placeDoc.exists) {
            throw new Error('User or Place not found');
        }

        const userData = userDoc.data() as UserProfile;
        const placeData = placeDoc.data() as Place;

        // 1. Data Prep
        const embeddingVector = placeData.embeddingVector; // Semantic Vector (768-dim)
        const axisScores = placeData.axisScores || { taste: 3, service: 3, atmosphere: 3, cost: 3 };

        // New Preference Vector
        const DIMENSION = 768;
        const currentPreferenceVector = userData.preferenceVector || vecZero(DIMENSION);
        let nextPreferenceVector = [...currentPreferenceVector];

        // Ensure dimension safety if new vector is initialized from 0
        if (nextPreferenceVector.length === 0 && embeddingVector && embeddingVector.length > 0) {
            nextPreferenceVector = vecZero(embeddingVector.length);
        }

        // If user already has a vector but it's length 0 (uninitialized correctly), fix it
        if (nextPreferenceVector.length === 0) {
            nextPreferenceVector = vecZero(DIMENSION);
        }

        // Axis Preferences
        const currentAiPreferences = userData.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 };
        const nextAiPreferences = { ...currentAiPreferences };

        // --- PHASE 1: UNDO PREVIOUS ---
        if (interactionDoc.exists) {
            const prevData = interactionDoc.data() as UserInteraction;

            // Undo Axis Preferences
            if (prevData?.evaluation?.axisImpact) {
                const aiPrev = prevData.evaluation.axisImpact;
                (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                    if (aiPrev[key]) {
                        nextAiPreferences[key] = (nextAiPreferences[key] || 0) - aiPrev[key];
                    }
                });
            }

            // Undo Embedding Vector
            const prevEval = prevData.evaluation as any;
            if (prevEval?.embeddingImpact && Array.isArray(prevEval.embeddingImpact)) {
                // V_new = V_current - Delta (approx undo)
                nextPreferenceVector = vecSub(nextPreferenceVector, prevEval.embeddingImpact);
            }
        }

        // --- PHASE 2: APPLY NEW ---
        let appliedAxisImpact: { taste: number; service: number; atmosphere: number; cost: number } | undefined;
        let appliedEmbeddingImpact: number[] | undefined;

        if (evaluation) {
            // A. Axis Preference Update (Explicit Bias)
            const AXIS_LEARNING_RATE = 0.2;
            const scores = axisScores;
            const axisDiffs = {
                taste: scores.taste - 3.5,
                service: scores.service - 3.5,
                atmosphere: scores.atmosphere - 3.5,
                cost: scores.cost - 3.5
            };
            appliedAxisImpact = { taste: 0, service: 0, atmosphere: 0, cost: 0 };

            // Determine direction: Good -> Add, Bad -> Subtract
            const direction = evaluation.type === 'good' ? 1 : -1;

            (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                // Calculate Raw Delta
                const rawDelta = axisDiffs[key] * AXIS_LEARNING_RATE * direction;

                // FIX: Round delta BEFORE applying and storing to ensure Undo is exact
                const roundedDelta = Number(rawDelta.toFixed(4));

                // Update Preference
                nextAiPreferences[key] = Number(((nextAiPreferences[key] || 0) + roundedDelta).toFixed(4));

                // Store EXACT applied value for Undo
                appliedAxisImpact![key] = roundedDelta;
            });

            // B. Embedding Vector Update (EMA)
            if (embeddingVector && embeddingVector.length > 0) {
                // Resize user vector if needed (first time) to match place embedding
                if (nextPreferenceVector.length !== embeddingVector.length) {
                    nextPreferenceVector = vecZero(embeddingVector.length);
                }

                let targetEmbedding: number[];
                if (evaluation.type === 'good') {
                    // Target is Place
                    targetEmbedding = embeddingVector;
                } else {
                    // Bad: Target is -0.5 * Place (Push away mechanism)
                    targetEmbedding = vecScale(embeddingVector, -0.5);
                }

                // Delta = Alpha * (Target - User)
                const diff = vecSub(targetEmbedding, nextPreferenceVector);
                const delta = vecScale(diff, LEARNING_RATE_ALPHA);

                nextPreferenceVector = vecAdd(nextPreferenceVector, delta);
                appliedEmbeddingImpact = delta;
            } else {
                console.warn(`Place ${placeId} has no embeddingVector, skipping embedding update.`);
            }

            // 3. Save Interaction
            t.set(interactionRef, {
                uid,
                placeId,
                isVisited: true,
                evaluation: {
                    ...evaluation,
                    axisImpact: appliedAxisImpact,
                    embeddingImpact: appliedEmbeddingImpact,
                    timestamp: FieldValue.serverTimestamp()
                },
                updatedAt: FieldValue.serverTimestamp()
            }, { merge: true });
        } else {
            // Removal
            t.update(interactionRef, {
                evaluation: FieldValue.delete(),
                updatedAt: FieldValue.serverTimestamp()
            });
        }

        // 4. Update User Profile
        t.update(userRef, {
            aiPreferences: nextAiPreferences,
            preferenceVector: nextPreferenceVector,
            // featureAffinities removed
            updatedAt: FieldValue.serverTimestamp()
        });
    });
}


// --- 3. Fetch User Interactions (Profile) ---
export async function getUserInteractions(uid: string) {
    const db = getFirestore();
    if (!uid) return { saved: [], good: [], bad: [] };

    try {
        const interactionsRef = db.collection('users').doc(uid).collection('interactions');
        const snapshot = await interactionsRef.get();

        if (snapshot.empty) return { saved: [], good: [], bad: [] };

        const interactions = snapshot.docs.map(doc => doc.data() as UserInteraction);

        // Group by type
        const savedIds = interactions.filter(i => i.isSaved).map(i => i.placeId);
        const goodIds = interactions.filter(i => i.evaluation?.type === 'good').map(i => i.placeId);
        const badIds = interactions.filter(i => i.evaluation?.type === 'bad').map(i => i.placeId);

        // Unique IDs to fetch
        const allIds = Array.from(new Set([...savedIds, ...goodIds, ...badIds]));

        if (allIds.length === 0) return { saved: [], good: [], bad: [] };

        // Firestore 'in' limit is 30. Using getAll to fetch documents by reference.
        const placeRefs = allIds.map(id => db.collection('places').doc(id));
        const placeSnapshots = await db.getAll(...placeRefs);

        const placesMap = new Map<string, Place>();
        placeSnapshots.forEach(snap => {
            if (snap.exists) {
                // Manually cast or validate. Usually snap.data() is sufficient.
                const data = snap.data();
                if (data) {
                    placesMap.set(snap.id, { ...data, id: snap.id } as Place);
                }
            }
        });

        const saved = savedIds.map(id => placesMap.get(id)).filter((p): p is Place => !!p).map(serializePlace);
        const good = goodIds.map(id => placesMap.get(id)).filter((p): p is Place => !!p).map(serializePlace);
        const bad = badIds.map(id => placesMap.get(id)).filter((p): p is Place => !!p).map(serializePlace);

        return { saved, good, bad };

    } catch (error) {
        console.error("Failed to get user interactions:", error);
        throw new Error("Failed to fetch profile data");
    }
}
