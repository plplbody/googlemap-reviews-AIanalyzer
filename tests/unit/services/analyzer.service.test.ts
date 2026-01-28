import { describe, it, expect } from 'vitest';
import { normalizeScores, limitScore } from '@/server/services/analyzer.service';

/**
 * @file analyzer.service.test.ts
 * @description サクラ検出およびスコア計算に関連するロジックの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-A-01-02: スコア範囲の正規化 (normalizeScores)
 * - TM-A-01-03: AIレスポンス耐性 (normalizeScores error handling)
 */

describe('Analyzer Service Logic', () => {
    /* 
    // Removed calculateSakuraPenalty as per user request (Project Policy Change)
    describe('calculateSakuraPenalty', () => {
        ...
    }); 
    */


    describe('limitScore', () => {
        it('should clamp values > 5.0 to 5.0', () => {
            expect(limitScore(5.5)).toBe(5.0);
        });
        it('should clamp values < 1.0 to 1.0', () => {
            expect(limitScore(0.5)).toBe(1.0);
        });
        it('should handle strings/NaN by returning min', () => {
            expect(limitScore('invalid' as any)).toBe(1.0);
            expect(limitScore(NaN)).toBe(1.0);
        });
    });

    describe('normalizeScores', () => {
        it('should normalize all scores in the analysis object', () => {
            const raw = {
                trueScore: 6.0,
                axisScores: { taste: 0, service: 6, atmosphere: 3, cost: 3 },
                usageScores: { business: -1, date: 10, solo: 3, family: 3, group: 3 }
            };

            const result = normalizeScores(raw);

            // True Score
            expect(result.trueScore).toBe(5.0);

            // Axis Scores (1.0 - 5.0)
            expect(result.axisScores.taste).toBe(1.0); // clamped from 0 to 1
            expect(result.axisScores.service).toBe(5.0); // clamped from 6 to 5

            // Usage Scores (0.0 - 5.0)
            expect(result.usageScores.business).toBe(0.0); // clamped from -1 to 0
            expect(result.usageScores.date).toBe(5.0); // clamped from 10 to 5
        });

        it('should handle missing axis/usage scores with defaults', () => {
            const result = normalizeScores({ trueScore: 3.0 });

            expect(result.axisScores).toBeDefined();
            expect(result.axisScores.taste).toBe(3);
            expect(result.usageScores).toBeDefined();
            expect(result.usageScores.business).toBe(0);
        });
    });
});
