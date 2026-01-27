import { describe, it, expect } from 'vitest';
import { calculatePlaceScore, blendPreferences, vecScale, vecAdd, cosineSimilarity } from '@/server/services/scoring';
import { Place } from '@/types/schema';
import { UserProfile } from '@/types/user';

/**
 * @file scoring.test.ts
 * @description リランキング（スコア計算・パーソナライズ）に関連するロジックの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-L-03-01: 好みベクトルのブレンド
 * - TM-L-03-02: ソート順序（スコア計算ロジック）
 */

describe('Scoring Service', () => {
    describe('Vector Helpers', () => {
        it('vecScale', () => {
            expect(vecScale([1, 2], 2)).toEqual([2, 4]);
        });
        it('vecAdd', () => {
            expect(vecAdd([1, 2], [3, 4])).toEqual([4, 6]);
        });
        it('cosineSimilarity', () => {
            // Include basic vector [1, 0] vs [0, 1] = 0
            expect(cosineSimilarity([1, 0], [0, 1])).toBe(0);
            // [1, 0] vs [1, 0] = 1
            expect(cosineSimilarity([1, 0], [1, 0])).toBe(1);
        });
    });

    describe('blendPreferences', () => {
        const globalPrefs = { taste: 1, service: 0, atmosphere: 0, cost: 0 };
        const globalVec = [1, 1];
        const scenario = {
            aiPreferences: { taste: 0, service: 1, atmosphere: 0, cost: 0 },
            preferenceVector: [2, 2]
        };

        it('should blend global and scenario correctly', () => {
            // Vector: global(0.3) + scenario(0.7)
            // [1,1]*0.3 + [2,2]*0.7 = [0.3+1.4, 0.3+1.4] = [1.7, 1.7]
            const result = blendPreferences(globalPrefs, globalVec, [scenario]);

            expect(result.targetVector[0]).toBeCloseTo(1.7);
            expect(result.effectivePreferences.taste).toBeCloseTo(0.3); // 1*0.3 + 0*0.7
            expect(result.effectivePreferences.service).toBeCloseTo(0.7); // 0*0.3 + 1*0.7
        });
    });

    describe('calculatePlaceScore', () => {
        const mockPlace: Place = {
            id: 'p1',
            name: 'Test',
            trueScore: 4.0,
            originalRating: 4.5,
            axisScores: { taste: 4, service: 3, atmosphere: 3, cost: 3 },
            usageScores: { business: 5, date: 0, solo: 0, family: 0, group: 0 },
            embeddingVector: [1, 0]
        } as Place;

        it('Auto Mode: should calculate basic score without profile', () => {
            const result = calculatePlaceScore(mockPlace, null, null, { mode: 'auto' });
            expect(result.trueScore).toBe(4.0);
            expect(result.isPersonalized).toBe(false);
        });

        it('Manual Mode: should filter by focused axis', () => {
            // Taste=4 (Focus), Service=3 (No focus)
            // (4*3 + 3*1 + 3*1 + 3*1) / (3+1+1+1) = (12+9)/6 = 21/6 = 3.5
            const result = calculatePlaceScore(mockPlace, null, null, {
                mode: 'manual',
                focusedAxes: ['taste']
            });
            expect(result.finalScore).toBe(3.5);
            expect(result.isPersonalized).toBe(true);
        });

        it('Manual Mode: should filter by usage scene', () => {
            // Business=5 (Focus) * 3
            // + Axes (Taste4, Serv3, Atm3, Cost3) * 1
            // Total Score: (5*3) + 4 + 3 + 3 + 3 = 15 + 13 = 28
            // Total Weight: 3 + 4 = 7
            // Avg: 4.0
            const result = calculatePlaceScore(mockPlace, null, null, {
                mode: 'manual',
                focusedScenes: ['business']
            });
            expect(result.finalScore).toBe(4.0);
        });
    });
});
