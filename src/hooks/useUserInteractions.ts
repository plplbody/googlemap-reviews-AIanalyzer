'use client';

import { useState } from 'react';
import { submitEvaluation } from '@/server/actions/user';
import { UserInteraction } from '@/types/user';

export function useUserInteractions(uid: string, placeId: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Primary Action: Submit Evaluation (Good/Likely)
    const evaluate = async (evaluation: UserInteraction['evaluation'] | null, scenarioIds?: string[], skipGlobal?: boolean) => {
        setIsLoading(true);
        try {
            await submitEvaluation(uid, placeId, evaluation as any, scenarioIds, skipGlobal);
        } catch (e: any) {
            console.error(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        evaluate,
        isLoading,
        error
    };
}
