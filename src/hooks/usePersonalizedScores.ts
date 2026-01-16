import { useState, useCallback, useEffect } from "react";
import { getPersonalizedScores, PersonalizedScore } from "@/server/actions/personalize";
import { Place } from "@/types/schema";
import { UserProfile } from "@/types/user";

interface UsePersonalizedScoresProps {
    userUid: string | undefined;
    isAutoPersonalize: boolean;
    focusedAxes: string[];
    focusedScenes: string[];
    focusedTags: string[];
    places: Place[];
}

export function usePersonalizedScores({
    userUid,
    isAutoPersonalize,
    focusedAxes,
    focusedScenes,
    focusedTags,
    places
}: UsePersonalizedScoresProps) {
    const [pScores, setPScores] = useState<Record<string, PersonalizedScore>>({});
    const [effectivePrefs, setEffectivePrefs] = useState<UserProfile['aiPreferences'] | undefined>(undefined);
    const [isScoreOutdated, setIsScoreOutdated] = useState(false);

    const fetchScores = useCallback(async (
        ids: string[],
        mode: 'auto' | 'manual',
        axes: string[],
        scenes: string[],
        tags: string[]
    ) => {
        try {
            if (ids.length === 0) return;
            const scores = await getPersonalizedScores(ids, userUid, {
                mode,
                focusedAxes: axes,
                focusedScenes: scenes,
                scenarioIds: tags
            });
            setPScores(prev => ({ ...prev, ...scores }));

            // Update effective preferences (using first result logic)
            const firstResult = Object.values(scores)[0];
            if (firstResult?.effectivePreferences) {
                setEffectivePrefs(firstResult.effectivePreferences);
            } else {
                setEffectivePrefs(undefined);
            }
            setIsScoreOutdated(false);
        } catch (e) {
            console.error("Failed to fetch personalized scores", e);
        }
    }, [userUid]);

    // Handler for action completion (improves responsiveness without immediate refetch)
    const handleActionComplete = useCallback((newEffectivePrefs?: any) => {
        setIsScoreOutdated(true);
        if (newEffectivePrefs) {
            setEffectivePrefs(newEffectivePrefs);
        }
    }, []);

    const handleRecalculate = useCallback(async () => {
        if (places.length > 0) {
            const mode = isAutoPersonalize ? 'auto' : 'manual';
            await fetchScores(
                places.map(p => p.id),
                mode,
                focusedAxes,
                focusedScenes,
                focusedTags
            );
        }
    }, [places, isAutoPersonalize, focusedAxes, focusedScenes, focusedTags, fetchScores]);

    // Auto-fetch effect
    useEffect(() => {
        if (places.length > 0) {
            const mode = isAutoPersonalize ? 'auto' : 'manual';
            fetchScores(
                places.map(p => p.id),
                mode,
                focusedAxes,
                focusedScenes,
                focusedTags
            );
        }
    }, [
        places.length, // Only trigger if count changes or other params
        isAutoPersonalize,
        focusedAxes,
        focusedScenes,
        focusedTags,
        fetchScores
        // Note: We don't depend on `places` content deep equality to avoid loops.
        // relying on `places.length` is a heuristic. 
        // Ideally we track `places` IDs hash if needed.
    ]);

    return {
        pScores,
        effectivePrefs,
        isScoreOutdated,
        fetchScores,
        handleActionComplete,
        handleRecalculate
    };
}
