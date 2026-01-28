import { describe, it, expect } from 'vitest';
import { cosineSimilarity } from '@/server/services/scoring';

/**
 * @file comparison.test.ts
 * @description 比較機能（類似度判定）に関連するロジックの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-L-06-01: 類似度判定 (Cosine Similarity)
 */

describe('Comparison Logic', () => {
    describe('cosineSimilarity', () => {
        it('should return 1 for identical vectors', () => {
            expect(cosineSimilarity([1, 2, 3], [1, 2, 3])).toBeCloseTo(1);
        });

        it('should return 0 for orthogonal vectors', () => {
            expect(cosineSimilarity([1, 0], [0, 1])).toBe(0);
        });

        it('should return -1 for opposite vectors', () => {
            expect(cosineSimilarity([1, 1], [-1, -1])).toBeCloseTo(-1);
        });

        it('should handle zero vectors gracefully (return 0)', () => {
            expect(cosineSimilarity([0, 0], [1, 1])).toBe(0);
        });

        it('should handle length mismatch gracefully (return 0)', () => {
            expect(cosineSimilarity([1], [1, 2])).toBe(0);
        });
    });
});
