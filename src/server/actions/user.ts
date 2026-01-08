'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { UserInteraction, UserProfile, UserScenario } from '@/types/user';
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
    evaluation: UserInteraction['evaluation'] | null,
    scenarioIds?: string[], // Optional: Custom Scenarios to update
    skipGlobal: boolean = false // Optional: Skip global update
) {
    if (!uid || !placeId) return;

    const userRef = db.collection('users').doc(uid);
    const placeRef = db.collection('places').doc(placeId);
    const interactionRef = userRef.collection('interactions').doc(placeId);

    await db.runTransaction(async (t) => {
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

        // --- SCENARIO SETUP ---
        // Map to hold next state for scenarios
        const nextScenarios = new Map<string, { vector: number[], ai: any }>();

        // Initialize from DB
        scenarioDocs.forEach((doc, id) => {
            if (doc.exists) {
                const data = doc.data() as UserScenario;
                nextScenarios.set(id, {
                    vector: safeVector(data.preferenceVector),
                    ai: { ...(data.aiPreferences || { taste: 0, service: 0, atmosphere: 0, cost: 0 }) }
                });
            } else {
                // FALLBACK: Auto-initialize if document doesn't exist (e.g. standard scenarios rarely created explicitly before first use)
                nextScenarios.set(id, {
                    vector: vecZero(DIMENSION),
                    ai: { taste: 0, service: 0, atmosphere: 0, cost: 0 }
                });
            }
        });

        // ==========================================
        // PHASE 1: UNDO PREVIOUS (Global & Scenarios)
        // ==========================================
        if (prevData?.evaluation) {
            const prevEval = prevData.evaluation;

            if (!skipGlobal) {
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

        // Logs for Interaction
        let appliedGlobalAxisImpact = (skipGlobal && prevData?.evaluation?.axisImpact) ? prevData.evaluation.axisImpact : undefined;
        let appliedGlobalEmbeddingImpact = (skipGlobal && prevData?.evaluation?.embeddingImpact) ? prevData.evaluation.embeddingImpact : undefined;
        let appliedScenarioLog: Record<string, any> = {};

        if (evaluation) {
            const AXIS_LEARNING_RATE = 0.2;
            const direction = evaluation.type === 'good' ? 1 : -1;

            // Calculate Axis Diffs
            const axisDiffs = {
                taste: axisScores.taste - 3.5,
                service: axisScores.service - 3.5,
                atmosphere: axisScores.atmosphere - 3.5,
                cost: axisScores.cost - 3.5
            };

            if (!skipGlobal) {
                // 2-1. Apply Global Axis
                appliedGlobalAxisImpact = { taste: 0, service: 0, atmosphere: 0, cost: 0 };
                (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                    const delta = Number((axisDiffs[key] * AXIS_LEARNING_RATE * direction).toFixed(4));
                    nextAiPreferences[key] = Number((nextAiPreferences[key] + delta).toFixed(4));
                    appliedGlobalAxisImpact![key] = delta;
                });

                // 2-2. Apply Global Embedding
                if (embeddingVector && embeddingVector.length > 0) {
                    // Ensure dimension match
                    if (nextGlobalVector.length !== embeddingVector.length) nextGlobalVector = vecZero(embeddingVector.length);

                    const target = evaluation.type === 'good' ? embeddingVector : vecScale(embeddingVector, -0.5);
                    const delta = vecScale(vecSub(target, nextGlobalVector), LEARNING_RATE_ALPHA);

                    nextGlobalVector = vecAdd(nextGlobalVector, delta);
                    appliedGlobalEmbeddingImpact = delta;
                }
            }

            // 2-3. Apply Scenarios (Only for requested IDs)
            if (scenarioIds && scenarioIds.length > 0) {
                scenarioIds.forEach(id => {
                    // Get or Init Scenario State
                    // (Should exist if user passed valid ID, or just created)
                    // If not fetched (e.g. newly created and not yet in DB?), handles gracefully?
                    // The 'createCustomScenario' action creates it first, so it should exist.
                    // If scenarioIds contains something not in scenarioDocs (because it didn't exist), we skip or init?
                    // We rely on scenarioDocs.

                    let scState = nextScenarios.get(id);
                    // Critical: If new scenario (just created), it might be in scenarioDocs
                    if (!scState && scenarioDocs.has(id)) {
                        // It was fetched but empty? No, handled in init loop.
                        // If not in nextScenarios, it means doc didn't exist?
                    }

                    if (scState) {
                        const log: any = { axisImpact: {}, embeddingImpact: [] };

                        // Apply Axis
                        (['taste', 'service', 'atmosphere', 'cost'] as const).forEach(key => {
                            const delta = Number((axisDiffs[key] * AXIS_LEARNING_RATE * direction).toFixed(4));
                            scState!.ai[key] = Number((scState!.ai[key] + delta).toFixed(4));
                            log.axisImpact[key] = delta;
                        });

                        // Apply Embedding
                        if (embeddingVector && embeddingVector.length > 0) {
                            if (scState.vector.length !== embeddingVector.length) scState.vector = vecZero(embeddingVector.length);
                            const target = evaluation.type === 'good' ? embeddingVector : vecScale(embeddingVector, -0.5);
                            const delta = vecScale(vecSub(target, scState.vector), LEARNING_RATE_ALPHA);
                            scState.vector = vecAdd(scState.vector, delta);
                            log.embeddingImpact = delta;
                        }

                        appliedScenarioLog[id] = log;
                    }
                });
            }
        }

        // ==========================================
        // PHASE 3: WRITES
        // ==========================================

        // 3-1. User Profile
        if (!skipGlobal) {
            t.update(userRef, {
                aiPreferences: nextAiPreferences,
                preferenceVector: nextGlobalVector,
                updatedAt: FieldValue.serverTimestamp()
            });
        }

        // 3-2. Interaction
        if (evaluation) {
            t.set(interactionRef, {
                uid,
                placeId,
                isVisited: true,
                evaluation: {
                    ...evaluation,
                    axisImpact: appliedGlobalAxisImpact,
                    embeddingImpact: appliedGlobalEmbeddingImpact,
                    scenarioLog: appliedScenarioLog, // NEW
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

        // 3-3. Scenarios
        nextScenarios.forEach((state, id) => {
            const ref = userRef.collection('scenarios').doc(id);
            const docSnapshot = scenarioDocs.get(id);

            // Prepare update data
            const updateData: any = {
                aiPreferences: state.ai,
                preferenceVector: state.vector,
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

// --- 4. Custom Scenario Actions ---

// Generate a slug-like ID for custom scenarios
function generateScenarioId(): string {
    return 'custom_' + Math.random().toString(36).substring(2, 9);
}

export async function createCustomScenario(uid: string, name: string) {
    if (!uid || !name) throw new Error('Invalid arguments');

    const scenarioId = generateScenarioId();
    const scenarioRef = db.collection('users').doc(uid).collection('scenarios').doc(scenarioId);

    const newScenario: UserScenario = {
        id: scenarioId,
        name: name,
        isCustom: true,
        aiPreferences: { taste: 0, service: 0, atmosphere: 0, cost: 0 },
        preferenceVector: [], // Initialize empty
        updatedAt: FieldValue.serverTimestamp() as unknown as any // Cast for type safety with Client/Server types
    };

    await scenarioRef.set(newScenario);

    // Return with ID and valid Date object for Client Integration
    return {
        ...newScenario,
        updatedAt: new Date()
    };
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
