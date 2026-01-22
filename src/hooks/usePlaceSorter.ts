import { useMemo } from "react";
import { Place } from "@/types/schema";
import { PersonalizedScore } from "@/server/actions/personalize";

interface UsePlaceSorterProps {
    cachedResults: Place[];
    realtimePlaces: Record<string, Place>;
    pScores: Record<string, PersonalizedScore>;
    sortBy: 'ai' | 'google';
}

export function usePlaceSorter({
    cachedResults,
    realtimePlaces,
    pScores,
    sortBy
}: UsePlaceSorterProps) {

    const sortedPlaces = useMemo(() => {
        // 1. Merge
        const merged = cachedResults.map(initial => {
            const real = realtimePlaces[initial.id];

            // Initial is already a Place object (lite or full)
            if (real) return real;

            return initial;
        });

        // 2. Sort
        return merged.sort((a, b) => {
            let valA = 0, valB = 0;
            if (sortBy === 'ai') {
                // Use Server Calculated Final Score exclusively
                valA = pScores[a.id]?.finalScore ?? (a.trueScore || 0);
                valB = pScores[b.id]?.finalScore ?? (b.trueScore || 0);

                // Tie-breaker
                if (Math.abs(valA - valB) < 0.01) {
                    valA = a.trueScore ?? -999;
                    valB = b.trueScore ?? -999;
                }
            } else { // google
                valA = a.originalRating ?? 0;
                valB = b.originalRating ?? 0;
            }
            return valB - valA; // Descending
        });
    }, [cachedResults, realtimePlaces, pScores, sortBy]);

    return sortedPlaces;
}
