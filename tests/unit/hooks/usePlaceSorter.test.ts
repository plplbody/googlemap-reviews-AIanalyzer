import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePlaceSorter } from '@/hooks/usePlaceSorter';
import { Place } from '@/types/schema';

/**
 * @file usePlaceSorter.test.ts
 * @description ソートHookの単体テスト
 * 
 * [Test Matrix Refference]
 * - TM-H-03-01: ソート切り替え（AI順/Google順）
 */

describe('usePlaceSorter', () => {
    const mockPlaces: Place[] = [
        { id: 'p1', originalRating: 4.0, trueScore: 3.0 } as Place,
        { id: 'p2', originalRating: 3.0, trueScore: 5.0 } as Place
    ];
    const realtimePlaces = {
        'p1': { id: 'p1', originalRating: 4.0, trueScore: 3.0 } as Place,
        'p2': { id: 'p2', originalRating: 3.0, trueScore: 5.0 } as Place
    };
    const pScores = {
        'p1': { placeId: 'p1', finalScore: 3.0 }, // Low AI Score
        'p2': { placeId: 'p2', finalScore: 5.0 }  // High AI Score
    } as any;

    it('should sort by AI score (Descending)', () => {
        const { result } = renderHook(() => usePlaceSorter({
            cachedResults: mockPlaces,
            realtimePlaces,
            pScores,
            sortBy: 'ai'
        }));

        // p2 (5.0) -> p1 (3.0)
        expect(result.current[0].id).toBe('p2');
        expect(result.current[1].id).toBe('p1');
    });

    it('should sort by Google score (Descending)', () => {
        const { result } = renderHook(() => usePlaceSorter({
            cachedResults: mockPlaces,
            realtimePlaces,
            pScores,
            sortBy: 'google'
        }));

        // p1 (4.0) -> p2 (3.0)
        expect(result.current[0].id).toBe('p1');
        expect(result.current[1].id).toBe('p2');
    });
});
