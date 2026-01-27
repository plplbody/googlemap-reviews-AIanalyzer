import { describe, it, expect } from 'vitest';
import { XP_GAIN } from '@/lib/constants';

/**
 * @file user.test.ts
 * @description ユーザー学習（XP獲得）に関連するロジックの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-L-10-01: XP獲得計算（定数定義の確認）
 */

describe('User Service Logic', () => {
    describe('XP Constants', () => {
        it('should have correct XP values defined', () => {
            expect(XP_GAIN.GLOBAL_PER_ACTION).toBe(20);
            expect(XP_GAIN.TAG_PER_ACTION).toBe(50);
        });
    });

    // Note: To test the actual increment logic, we would ideally extract 'calculateNewXP' function.
    // Currently, the logic is inline: nextGlobalExperience += XP_GAIN.GLOBAL_PER_ACTION;
    // Since we exported the constants, we at least verify the constants are correct and accessible.
    // Testing the transaction logic requires heavy mocking of Firestore, which we avoid for Unit Tests.
    // We rely on E2E tests for the actual DB update flow.
});
