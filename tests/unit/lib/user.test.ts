import { describe, it, expect } from 'vitest';
import { XP_GAIN } from '@/lib/constants';
import { calculateNewXP } from '@/server/services/scoring';

/**
 * @file user.test.ts
 * @description ユーザー学習（XP獲得）に関連するロジックの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-L-10-01: XP獲得計算（Global / Tag）
 */

describe('User Service Logic', () => {
    describe('calculateNewXP', () => {
        it('should add 20 XP for global action', () => {
            const current = 100;
            const next = calculateNewXP(current, 'global');
            expect(next).toBe(120);
        });

        it('should add 50 XP for tag action', () => {
            const current = 50;
            const next = calculateNewXP(current, 'tag');
            expect(next).toBe(100);
        });
    });

    describe('XP Constants', () => {
        it('should have correct XP values defined in code', () => {
            expect(XP_GAIN.GLOBAL_PER_ACTION).toBe(20);
            expect(XP_GAIN.TAG_PER_ACTION).toBe(50);
        });
    });
});
