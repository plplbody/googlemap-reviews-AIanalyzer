import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilterParams } from '@/hooks/useFilterParams';
import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * @file useFilterParams.test.ts
 * @description フィルタリング用Hookの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-H-01-01: URL同期（Stateの変更がURLパラメータに反映されるか）
 */

// Mocks
const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace,
    }),
    useSearchParams: () => mockSearchParams,
}));

describe('useFilterParams', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with empty arrays if no params', () => {
        const { result } = renderHook(() => useFilterParams());
        expect(result.current.focusedAxes).toEqual([]);
        expect(result.current.focusedScenes).toEqual([]);
        expect(result.current.focusedTags).toEqual([]);
    });

    it('should toggle axis correctly', () => {
        const { result } = renderHook(() => useFilterParams());

        // Add 'taste'
        act(() => {
            result.current.handleAxisToggle('taste');
        });

        expect(result.current.focusedAxes).toEqual(['taste']);
        // Verify URL update called
        expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('focus=taste'), expect.anything());

        // Remove 'taste'
        act(() => {
            result.current.handleAxisToggle('taste');
        });

        expect(result.current.focusedAxes).toEqual([]);
    });
});
