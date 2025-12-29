'use client';

import { useState } from 'react';
import { toggleSavePlace, submitEvaluation } from '@/server/actions/user';
import { UserInteraction } from '@/types/user';

export function useUserInteractions(uid: string, placeId: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Basic Action: Save
    const toggleSave = async (currentState: boolean) => {
        setIsLoading(true);
        try {
            await toggleSavePlace(uid, placeId, !currentState);
        } catch (e: any) {
            console.error(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Primary Action: Submit Evaluation (Good/Good+/Bad/Bad+)
    const evaluate = async (evaluation: UserInteraction['evaluation'] | null) => {
        setIsLoading(true);
        try {
            await submitEvaluation(uid, placeId, evaluation as any);
        } catch (e: any) {
            console.error(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        toggleSave,
        evaluate,
        isLoading,
        error
    };
}
