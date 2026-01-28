import { describe, it, expect, vi, beforeEach } from 'vitest';
import { comparePlaces } from '@/server/actions/comparison';

// Mock Firestore
const mockGet = vi.fn();
const mockGetAll = vi.fn();
const mockCollection = vi.fn();
const mockDoc = vi.fn();

vi.mock('@/lib/firebase/admin', () => ({
    getFirestore: () => ({
        collection: mockCollection,
        getAll: mockGetAll
    })
}));

describe('Comparison Logic (comparePlaces)', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup Firestore Mock Chain
        mockCollection.mockReturnValue({
            doc: mockDoc
        });
        mockDoc.mockReturnValue({
            get: mockGet,
            collection: () => ({ doc: () => ({ get: mockGet }) })
        });
    });

    it('calculates cosine similarity correctly and determines winner', async () => {
        // Mock Places Data
        const placeA = {
            id: 'place_a',
            name: 'Place A',
            embeddingVector: [1, 0, 0, 0], // Perfectly aligned with x-axis
            axisScores: { taste: 5 }
        };
        const placeB = {
            id: 'place_b',
            name: 'Place B',
            embeddingVector: [0, 1, 0, 0], // Orthogonal to A
            axisScores: { taste: 3 }
        };

        // Mock User Profile (Target Vector)
        // User prefers X-axis [1, 0, 0, 0]
        const mockUser = {
            preferenceVector: [1, 0, 0, 0]
        };

        // Mock DB Returns
        // 1. User Fetch
        mockGet.mockResolvedValueOnce({
            exists: true,
            data: () => mockUser
        });

        // 2. Places Fetch (getAll)
        mockGetAll.mockResolvedValueOnce([
            { exists: true, data: () => placeA },
            { exists: true, data: () => placeB }
        ]);

        // Execute Logic
        const result = await comparePlaces(['place_a', 'place_b'], 'user_123');

        // Verify Computation
        // Similarity(User, A) = dot([1,0,0,0], [1,0,0,0]) / (1*1) = 1.0
        // Score A = (1.0 + 1.0) / 2 = 1.0 (100%)

        // Similarity(User, B) = dot([1,0,0,0], [0,1,0,0]) / (1*1) = 0.0
        // Score B = (0.0 + 1.0) / 2 = 0.5 (50%)

        expect(result.winnerId).toBe('place_a');
        expect(result.scores['place_a']).toBe(100);
        expect(result.scores['place_b']).toBe(50);
        expect(result.reason).toContain('100%');
    });

    it('handles scenario weighting correctly', async () => {
        // User: Global [0,0,0,0] but Scenario [1,0,0,0]
        // Target = (Global*0.3) + (Scenario*0.7) = [0.7, 0, 0, 0]

        const mockUserEmpty = {
            preferenceVector: [0, 0, 0, 0] // Neutral global
        };
        const mockScenario = {
            preferenceVector: [1, 0, 0, 0]
        };

        const placeX = {
            id: 'place_x',
            name: 'Place X',
            embeddingVector: [1, 0, 0, 0] // Matches scenario
        };
        const placeY = {
            id: 'place_y',
            name: 'Place Y',
            embeddingVector: [0, 1, 0, 0]
        };

        // DB Mocks
        // User
        mockGet.mockResolvedValueOnce({ exists: true, data: () => mockUserEmpty });
        // Scenario (called inside loop)
        mockGet.mockResolvedValueOnce({ exists: true, data: () => mockScenario });

        // Places
        mockGetAll.mockResolvedValueOnce([
            { exists: true, data: () => placeX },
            { exists: true, data: () => placeY }
        ]);

        const result = await comparePlaces(['place_x', 'place_y'], 'user_123', ['scenario_1']);

        // Target Vector is roughly aligned with Place X.
        // Sim(Target, X) > Sim(Target, Y)
        expect(result.winnerId).toBe('place_x');
        expect(result.scores['place_x']).toBeGreaterThan(result.scores['place_y']);
    });
});
