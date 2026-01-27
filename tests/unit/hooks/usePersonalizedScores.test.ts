import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePersonalizedScores } from '@/hooks/usePersonalizedScores';
import * as PersonalizeActions from '@/server/actions/personalize';

/**
 * @file usePersonalizedScores.test.ts
 * @description スコア計算Hookの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-H-02-01: スコア計算呼び出し（フィルタ変更時のAction呼び出し）
 */

// Mock Server Action
vi.mock('@/server/actions/personalize', () => ({
    getPersonalizedScores: vi.fn(),
}));

describe('usePersonalizedScores', () => {
    it('should fetch scores on mount if places exist', async () => {
        const mockScores = {
            'p1': { placeId: 'p1', finalScore: 4.5, trueScore: 4.0, matchScore: 5.0, isPersonalized: true }
        };
        (PersonalizeActions.getPersonalizedScores as any).mockResolvedValue(mockScores);

        const places = [{ id: 'p1' }];
        const { result } = renderHook(() => usePersonalizedScores({
            userUid: 'u1',
            isAutoPersonalize: true,
            focusedAxes: [],
            focusedScenes: [],
            focusedTags: [],
            places: places as any
        }));

        // Initially empty
        expect(result.current.pScores).toEqual({});

        // Wait for update
        await waitFor(() => {
            expect(result.current.pScores).toEqual(mockScores);
        });
    });
});
