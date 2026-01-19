'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { UserInteraction, UserProfile, UserScenario } from '@/types/user';
import { Place } from '@/types/schema';
import { FieldValue } from 'firebase-admin/firestore';
import { serializePlace } from '@/lib/utils/serialization';
import { blendPreferences } from '../services/scoring';

const db = getFirestore();

// --- 1. [REMOVED] Save/Bookmark Action ---
// toggleSavePlace is deprecated. Use submitEvaluation with 'good' which implies saved.

export async function toggleVisited(uid: string, placeId: string, isVisited: boolean) {
    if (!uid || !placeId) return;

    const interactionRef = db.collection('users').doc(uid).collection('interactions').doc(placeId);

    await interactionRef.set({
        uid,
        placeId,
        isVisited,
        updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
}

export async function updateInteractionMemo(
    uid: string,
    placeId: string,
    memo?: string,
    repeat?: 'yes' | 'no' | 'maybe'
) {
    if (!uid || !placeId) return;

    const interactionRef = db.collection('users').doc(uid).collection('interactions').doc(placeId);

    // Clean undefined values
    const data: any = {
        updatedAt: FieldValue.serverTimestamp()
    };
    if (memo !== undefined) data.memo = memo;
    if (repeat !== undefined) data.repeat = repeat;

    await interactionRef.set(data, { merge: true });
}

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
    evaluation: UserInteraction['evaluation'] | null,
    scenarioIds?: string[] // Optional: Custom Scenarios to update
) {
    if (!uid || !placeId) return;

    const userRef = db.collection('users').doc(uid);
    const placeRef = db.collection('places').doc(placeId);
    const interactionRef = userRef.collection('interactions').doc(placeId);

    return await db.runTransaction(async (t) => {
        // 1. Initial Reads
        const userDoc = await t.get(userRef);
        const placeDoc = await t.get(placeRef);
        const interactionDoc = await t.get(interactionRef);

        if (!userDoc.exists || !placeDoc.exists) {
            throw new Error('User or Place not found');
        }

        const userData = userDoc.data() as UserProfile;
        const placeData = placeDoc.data() as Place;

        // 2. Identify Scenarios to Fetch (Union of requested and previous)
        const scenariosToFetch = new Set<string>(scenarioIds || []);
        let prevData: UserInteraction | undefined;

        if (interactionDoc.exists) {
            prevData = interactionDoc.data() as UserInteraction;
            if (prevData.evaluation?.scenarioLog) {
                Object.keys(prevData.evaluation.scenarioLog).forEach(id => scenariosToFetch.add(id));
            }
        }

        // 3. Fetch Scenarios (Read before Write)
        const scenarioDocs = new Map<string, FirebaseFirestore.DocumentSnapshot>();
        if (scenariosToFetch.size > 0) {
            for (const id of Array.from(scenariosToFetch)) {
                const ref = userRef.collection('scenarios').doc(id);
                const doc = await t.get(ref);
                scenarioDocs.set(id, doc);
            }
        }

        // --- PREP DATA ---
        const embeddingVector = placeData.embeddingVector;
        const axisScores = placeData.axisScores || { taste: 3, service: 3, atmosphere: 3, cost: 3 };
        const DIMENSION = 768;

        // Helper: safe vector init
        const safeVector = (v?: number[]) => (v && v.length === DIMENSION) ? v : vecZero(DIMENSION);

        // --- GLOBAL SETUP ---
        let nextGlobalVector = safeVector(userData.preferenceVector);
        if (nextGlobalVector.length === 0 && embeddingVector) nextGlobalVector = vecZero(embeddingVector.length);

        const currentAiPreferences = userData.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 };
        const nextAiPreferences = { ...currentAiPreferences };
        let nextGlobalExperience = userData.experience || 0;

        // --- SCENARIO SETUP ---
        // Map to hold next state for scenarios
        const nextScenarios = new Map<string, { vector: number[], ai: any, experience: number }>();

        // Initialize from DB
        scenarioDocs.forEach((doc, id) => {
            if (doc.exists) {
                const data = doc.data() as UserScenario;
                nextScenarios.set(id, {
                    vector: safeVector(data.preferenceVector),
                    ai: { ...(data.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 }) },
                    experience: data.experience || 0
                });
            } else {
                // FALLBACK
                nextScenarios.set(id, {
                    vector: vecZero(DIMENSION),
                    ai: { taste: 0, service: 0, atmosphere: 0, cost: 0 },
                    experience: 0
                });
            }
        });

        // ==========================================
        // PHASE 1: UNDO PREVIOUS (Global & Scenarios)
        // ==========================================
        if (prevData?.evaluation) {
            const prevEval = prevData.evaluation;

            // 1-1. Undo Global Axis
            if (prevEval.axisImpact) {
                (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                    if (prevEval.axisImpact![key]) {
                        nextAiPreferences[key] = Number((nextAiPreferences[key] - prevEval.axisImpact![key]).toFixed(4));
                    }
                });
            }

            // 1-2. Undo Global Embedding
            if (prevEval.embeddingImpact) {
                nextGlobalVector = vecSub(nextGlobalVector, prevEval.embeddingImpact);
            }

            // 1-3. Undo Scenarios
            if (prevEval.scenarioLog) {
                Object.entries(prevEval.scenarioLog).forEach(([scId, log]) => {
                    const scState = nextScenarios.get(scId);
                    if (scState && log) {
                        // Undo Axis
                        if (log.axisImpact) {
                            (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                                scState.ai[key] = Number((scState.ai[key] - log.axisImpact[key]).toFixed(4));
                            });
                        }
                        // Undo Embedding
                        if (log.embeddingImpact) {
                            scState.vector = vecSub(scState.vector, log.embeddingImpact);
                        }
                    }
                });
            }
        }

        // ==========================================
        // PHASE 2: APPLY NEW (Global & Scenarios)
        // ==========================================

        let appliedGlobalAxisImpact: any = undefined;
        let appliedGlobalEmbeddingImpact: any = undefined;
        let appliedScenarioLog: Record<string, any> = {};

        if (evaluation) {
            // NOTE: Only 'good' type is supported now. 'bad' logic removed.
            const AXIS_LEARNING_RATE = 0.2;
            const direction = evaluation.type === 'good' ? 1 : 0; // Ignore bad, though UI shouldn't send it.

            if (direction !== 0) {
                // Calculate Axis Diffs
                const axisDiffs = {
                    taste: axisScores.taste - 3.5,
                    service: axisScores.service - 3.5,
                    atmosphere: axisScores.atmosphere - 3.5,
                    cost: axisScores.cost - 3.5
                };

                // 2-1. Apply Global Axis
                appliedGlobalAxisImpact = { taste: 0, service: 0, atmosphere: 0, cost: 0 };
                (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                    const delta = Number((axisDiffs[key] * AXIS_LEARNING_RATE * direction).toFixed(4));
                    nextAiPreferences[key] = Number((nextAiPreferences[key] + delta).toFixed(4));
                    appliedGlobalAxisImpact![key] = delta;
                });

                // 2-2. Apply Global Embedding
                if (embeddingVector && embeddingVector.length > 0) {
                    if (nextGlobalVector.length !== embeddingVector.length) nextGlobalVector = vecZero(embeddingVector.length);

                    const target = embeddingVector;
                    const delta = vecScale(vecSub(target, nextGlobalVector), LEARNING_RATE_ALPHA);

                    nextGlobalVector = vecAdd(nextGlobalVector, delta);
                    appliedGlobalEmbeddingImpact = delta;
                }

                // 2-3. Apply Scenarios
                if (scenarioIds && scenarioIds.length > 0) {
                    scenarioIds.forEach(id => {
                        let scState = nextScenarios.get(id);
                        if (scState) {
                            const log: any = { axisImpact: {}, embeddingImpact: [] };

                            // Usage XP
                            scState.experience += 50; // +50 Tag XP (N=20 to Master)

                            // Apply Axis
                            (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                                const delta = Number((axisDiffs[key] * AXIS_LEARNING_RATE * direction).toFixed(4));
                                scState!.ai[key] = Number((scState!.ai[key] + delta).toFixed(4));
                                log.axisImpact[key] = delta;
                            });

                            // Apply Embedding
                            if (embeddingVector && embeddingVector.length > 0) {
                                if (scState.vector.length !== embeddingVector.length) scState.vector = vecZero(embeddingVector.length);
                                const target = embeddingVector;
                                const delta = vecScale(vecSub(target, scState.vector), LEARNING_RATE_ALPHA);
                                scState.vector = vecAdd(scState.vector, delta);
                                log.embeddingImpact = delta;
                            }

                            appliedScenarioLog[id] = log;
                        }
                    });
                }
            }

            if (direction !== 0) {
                nextGlobalExperience += 20; // +20 Global XP (N=50 to Master)
            }
        }

        // ==========================================
        // PHASE 3: WRITES
        // ==========================================

        // 3-1. User Profile
        t.update(userRef, {
            aiPreferences: nextAiPreferences,
            preferenceVector: nextGlobalVector,
            experience: nextGlobalExperience,
            updatedAt: FieldValue.serverTimestamp()
        });

        // 3-2. Interaction
        if (evaluation) {
            t.set(interactionRef, {
                uid,
                placeId,
                isVisited: prevData?.isVisited || false, // Preserve visit status
                isSaved: true, // "Good" implies Saved
                evaluation: {
                    ...evaluation,
                    axisImpact: appliedGlobalAxisImpact,
                    embeddingImpact: appliedGlobalEmbeddingImpact,
                    scenarioLog: appliedScenarioLog,
                    timestamp: FieldValue.serverTimestamp()
                },
                updatedAt: FieldValue.serverTimestamp()
            }, { merge: true });
        } else {
            // Removal (Ungood)
            t.update(interactionRef, {
                evaluation: FieldValue.delete(),
                isSaved: false, // Ungood implies unsaved
                updatedAt: FieldValue.serverTimestamp()
            });
        }

        // 3-3. Scenarios
        nextScenarios.forEach((state, id) => {
            const ref = userRef.collection('scenarios').doc(id);
            const docSnapshot = scenarioDocs.get(id);

            // Prepare update data
            const updateData: any = {
                aiPreferences: state.ai,
                preferenceVector: state.vector,
                experience: state.experience,
                updatedAt: FieldValue.serverTimestamp()
            };

            // If new document (didn't exist at start of transaction), we must ensure required fields like 'name' are set
            if (!docSnapshot?.exists) {
                // Map default IDs to names (Fallback)
                const DEFAULT_NAMES: Record<string, string> = {
                    'solo': '少人数',
                    'group': '団体',
                    'date': 'デート',
                    'business': 'ビジネス',
                    'family': 'ファミリー'
                };
                updateData.name = DEFAULT_NAMES[id] || id; // Use ID as name if unknown custom scenario
                updateData.isCustom = !DEFAULT_NAMES[id];
                updateData.id = id;
            }

            // Use set with merge to handle both new and existing
            t.set(ref, updateData, { merge: true });
        });

        // RETURN UPDATED DATA FOR UI FEEDBACK (Dual Radar Chart)
        return {
            globalPreferences: nextAiPreferences,
            updatedScenarios: Array.from(nextScenarios.entries()).map(([id, state]) => ({
                id,
                aiPreferences: state.ai,
                experience: state.experience // Needed for UI Feedback
            })),
            // Calculate Effective Preferences (Blended) for immediate UI feedback (e.g. List View Update)
            effectivePreferences: (() => {
                // Reconstruct scenario objects for blending
                const scenarioObjs = Array.from(nextScenarios.entries())
                    .filter(([id]) => (scenarioIds || []).includes(id)) // Only include currently active scenarios for effective calc? Or all? User likely wants "Current Context".
                    .map(([_, state]) => ({
                        aiPreferences: state.ai,
                        preferenceVector: state.vector
                    }));

                // If no scenarios active, effective = global
                if (scenarioObjs.length === 0) return nextAiPreferences;

                return blendPreferences(
                    nextAiPreferences,
                    nextGlobalVector,
                    scenarioObjs
                ).effectivePreferences;
            })(),
            globalExperience: nextGlobalExperience // Return for UI
        };
    });
}


// --- 3. Fetch User Interactions (Profile) ---
export interface InteractionItem {
    place: Place;
    interaction: UserInteraction;
}

export async function getUserInteractions(uid: string): Promise<InteractionItem[]> {
    const db = getFirestore();
    if (!uid) return [];

    try {
        const interactionsRef = db.collection('users').doc(uid).collection('interactions');
        const snapshot = await interactionsRef.get();

        if (snapshot.empty) return [];

        const interactions = snapshot.docs.map(doc => doc.data() as UserInteraction);
        const placeIds = interactions.map(i => i.placeId);

        if (placeIds.length === 0) return [];

        const placeRefs = placeIds.map(id => db.collection('places').doc(id));
        const placeSnapshots = await db.getAll(...placeRefs);

        const placesMap = new Map<string, Place>();
        placeSnapshots.forEach(snap => {
            if (snap.exists) {
                const data = snap.data();
                if (data) {
                    placesMap.set(snap.id, { ...data, id: snap.id } as Place);
                }
            }
        });

        const results: InteractionItem[] = [];
        interactions.forEach(interaction => {
            const place = placesMap.get(interaction.placeId);
            if (place) {
                results.push({
                    place: serializePlace(place),
                    interaction: {
                        ...interaction,
                        updatedAt: (interaction.updatedAt as any)?.toDate?.() || new Date(),
                        evaluation: interaction.evaluation ? {
                            ...interaction.evaluation,
                            timestamp: (interaction.evaluation.timestamp as any)?.toDate?.() || new Date()
                        } : undefined
                    } as any
                });
            }
        });

        return results;

    } catch (error) {
        console.error("Failed to get user interactions:", error);
        throw new Error("Failed to fetch profile data");
    }
}

// --- 4. Custom Scenario Actions ---

// Generate a slug-like ID for custom scenarios
function generateScenarioId(): string {
    return 'custom_' + Math.random().toString(36).substring(2, 9);
}

export async function createCustomScenario(uid: string, name: string) {
    if (!uid || !name) throw new Error('Invalid arguments');

    const scenariosRef = db.collection('users').doc(uid).collection('scenarios');

    // 1. LIMIT CHECK
    const snapshot = await scenariosRef.count().get();
    if (snapshot.data().count >= 30) {
        throw new Error('LimitReached: タグの作成上限(30個)に達しました');
    }

    // 2. DUPLICATE CHECK
    // Note: This is a simple exact match check. 
    const duplicateCheck = await scenariosRef.where('name', '==', name).limit(1).get();
    if (!duplicateCheck.empty) {
        throw new Error('Duplicate: 同じ名前のタグが既に存在します');
    }

    const scenarioId = generateScenarioId();
    const scenarioRef = scenariosRef.doc(scenarioId);

    const newScenario: UserScenario = {
        id: scenarioId,
        name: name,
        isCustom: true,
        aiPreferences: { taste: 0, service: 0, atmosphere: 0, cost: 0 },
        preferenceVector: [], // Initialize empty
        experience: 0, // Initialize XP
        updatedAt: FieldValue.serverTimestamp() as unknown as any
    };

    await scenarioRef.set(newScenario);

    // Return with ID and valid Date object for Client Integration
    return {
        ...newScenario,
        updatedAt: new Date()
    };
}

export async function deleteCustomScenario(uid: string, scenarioId: string) {
    if (!uid || !scenarioId) throw new Error('Invalid arguments');

    const scenarioRef = db.collection('users').doc(uid).collection('scenarios').doc(scenarioId);
    const docSnap = await scenarioRef.get();

    if (!docSnap.exists) {
        throw new Error('Scenario not found');
    }

    const data = docSnap.data();
    if (data?.isCustom !== true) {
        throw new Error('Cannot delete default scenarios');
    }

    await scenarioRef.delete();
    return { success: true, id: scenarioId };
}

export async function getUserScenarios(uid: string) {
    if (!uid) return [];

    try {
        const scenariosRef = db.collection('users').doc(uid).collection('scenarios');
        const snapshot = await scenariosRef.orderBy('updatedAt', 'desc').get();

        if (snapshot.empty) return [];

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                // Serialize Firestore Timestamp to Date -> ISO String or keep as Date if Client Component handles it? 
                // Error says "updatedAt: {_seconds: ..., _nanoseconds: ...}" is not supported.
                // Safest to convert to plain Date or string.
                // Let's check UserScenario type using view_file or just convert to Date if type allows, or number/string.
                // Assuming Client Component expects Date object (which Next.js handles if it's not a server action crossing boundary directly? No, Server Actions need plain objects).
                // Actually, Server Actions can return Dates? Wait. "Classes or null prototypes are not supported".
                // Firestore Timestamp is a class with custom prototype. Date is allowed in recent Next.js/React Server Actions? 
                // Let's try converting to simple Date object first, or number.
                // If the error persists with Date, we use .getTime() or .toISOString().
                // The error shows the raw internal structure of Timestamp object.
                updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
            } as UserScenario;
        });
    } catch (e) {
        console.error("Failed to fetch scenarios:", e);
        return [];
    }
}
