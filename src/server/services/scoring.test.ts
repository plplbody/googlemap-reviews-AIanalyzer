
import { describe, test, expect } from 'vitest';
import { calculatePlaceScore, blendPreferences } from './scoring';
import { Place, UsageScores } from '@/types/schema';
import { UserProfile } from '@/types/user';

describe('Scoring Service', () => {

    // --- モックデータヘルパー ---
    const mockPlace = (overrides: Partial<Place> = {}): Place => ({
        id: 'place-1',
        name: 'Test Place',
        originalRating: 3.5,
        userRatingsTotal: 100,
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides
    } as Place);

    const mockProfile = (overrides: Partial<UserProfile> = {}): UserProfile => ({
        uid: 'user-1',
        displayName: 'Test User',
        email: 'test@example.com',
        aiPreferences: { taste: 0, service: 0, atmosphere: 0, cost: 0 },
        preferenceVector: [],
        ...overrides
    } as UserProfile);

    // --- テスト ---

    test('Manual Mode: Default to True/Quality Score when no filters', () => {
        const place = mockPlace({ trueScore: 3.5 });
        const res = calculatePlaceScore(place, null, null, { mode: 'manual' });

        expect(res.finalScore).toBe(3.5);
        expect(res.isPersonalized).toBe(false);
    });

    test('Manual Mode: Weighted Average with Focus Axis', () => {
        const place = mockPlace({
            axisScores: { taste: 5, service: 3, atmosphere: 3, cost: 3 }
        });

        // 味に重点 (重み 3)
        // スコア = (5*3 + 3*1 + 3*1 + 3*1) / (3+1+1+1) = (15+9) / 6 = 24 / 6 = 4.0
        const res = calculatePlaceScore(place, null, null, {
            mode: 'manual',
            focusedAxes: ['taste']
        });

        expect(res.finalScore).toBe(4.0);
        expect(res.matchScore).toBe(4.0);
        expect(res.isPersonalized).toBe(true);
    });

    test('Auto Mode: Perfect Vector Match', () => {
        const place = mockPlace({
            // 正規化されたベクトル。大きさ 1。
            embeddingVector: [1, 0, 0],
            trueScore: 3.0,
            axisScores: { taste: 3, service: 3, atmosphere: 3, cost: 3 }
        });
        const targetVector = [1, 0, 0]; // Sim = 1.0

        // マッチスコア = (1.0 + 1.0) * 2.5 = 5.0
        // 加重スコア (中立的な好み) = 3.0
        // 最終スコア = 0.4 * 3.0 + 0.6 * 5.0 = 1.2 + 3.0 = 4.2

        const res = calculatePlaceScore(place, mockProfile(), targetVector, { mode: 'auto' });

        expect(res.matchScore).toBe(5.0);
        expect(res.finalScore).toBe(4.2);
        expect(res.isPersonalized).toBe(true);
    });

    test('Auto Mode: Scene Rule Override', () => {
        const place = mockPlace({
            usageScores: { date: 5, business: 1, solo: 3, family: 1, group: 1 },
            embeddingVector: [1, 0, 0], // 完全一致 (5.0)
            trueScore: 3.0
        });
        const targetVector = [1, 0, 0];

        // 重点シーン: 'デート'
        // S_usage = 5.0
        // S_match = 5.0
        // S_weighted = 3.0

        // 重み: シーン=3.0, ベクトル=1.5, 軸=1.0
        // 分子 = (5*3) + (5*1.5) + (3*1) = 15 + 7.5 + 3 = 25.5
        // 分母 = 3 + 1.5 + 1 = 5.5
        // 最終スコア = 25.5 / 5.5 = 4.6363... -> 4.64

        const res = calculatePlaceScore(place, mockProfile(), targetVector, {
            mode: 'auto',
            focusedScenes: ['date']
        });

        expect(res.finalScore).toBe(4.64);
    });

    test('Sakura Penalty Application', () => {
        const place = mockPlace({
            trueScore: 4.0,
            sakuraPenalty: 1.5,
            axisScores: { taste: 4, service: 4, atmosphere: 4, cost: 4 } // 高いベース
        });

        // 手動モード (味に重点) -> ベース 4.0
        // ペナルティ 1.5 -> 最終 2.5

        const res = calculatePlaceScore(place, null, null, {
            mode: 'manual',
            focusedAxes: ['taste']
        });

        expect(res.finalScore).toBe(2.5);
    });

    test('Blend Preferences', () => {
        const globalPrefs = { taste: 1, service: 0, atmosphere: 0, cost: 0 };
        const globalVec = [0, 0, 0];

        const scenario = {
            aiPreferences: { taste: 2, service: 0, atmosphere: 0, cost: 0 },
            preferenceVector: [1, 0, 0]
        };

        const res = blendPreferences(globalPrefs, globalVec, [scenario]);

        // Taste: 1*0.3 + 2*0.7 = 0.3 + 1.4 = 1.7
        expect(res.effectivePreferences?.taste).toBe(1.7);
        // Vector: 0*0.3 + 1*0.7 = 0.7
        expect(res.targetVector?.[0]).toBeCloseTo(0.7);
    });
});
