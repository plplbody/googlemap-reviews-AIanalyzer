'use client';

import { useState } from 'react';
import { submitEvaluation } from '@/server/actions/user';
import { UserInteraction } from '@/types/user';

export function useUserInteractions(uid: string, placeId: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Primary Action: Submit Evaluation (Good/Likely)
    const evaluate = async (evaluation: UserInteraction['evaluation'] | null, scenarioIds?: string[]) => {
        setIsLoading(true);
        try {
            return await submitEvaluation(uid, placeId, evaluation as any, scenarioIds);
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
