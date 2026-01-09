"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Place } from '@/types/schema';
import { ComparisonResult } from '@/server/actions/comparison';

// Define the shape of the context state
interface ComparisonContextType {
    selectedPlaces: Place[];
    toggleSelection: (place: Place) => void;
    clearSelection: () => void;
    currentLimit: number;
    isComparing: boolean;
    setIsComparing: (loading: boolean) => void;
    verdict: ComparisonResult | null;
    setVerdict: (result: ComparisonResult | null) => void;
}

// Create the context with a default undefined value
const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

// Provider Component
export function ComparisonProvider({ children }: { children: ReactNode }) {
    const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
    const [isComparing, setIsComparing] = useState(false);
    const [verdict, setVerdict] = useState<ComparisonResult | null>(null);
    const LIMIT = 3;

    const toggleSelection = useCallback((place: Place) => {
        setSelectedPlaces((prev) => {
            const exists = prev.some((p) => p.id === place.id);
            if (exists) {
                // Remove if already selected
                return prev.filter((p) => p.id !== place.id);
            } else {
                // Add if limit not reached
                if (prev.length >= LIMIT) {
                    alert(`比較できるのは最大${LIMIT}件までです`);
                    return prev;
                }
                return [...prev, place];
            }
        });
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedPlaces([]);
        setVerdict(null);
    }, []);

    const value = {
        selectedPlaces,
        toggleSelection,
        clearSelection,
        currentLimit: LIMIT,
        isComparing,
        setIsComparing,
        verdict,
        setVerdict,
    };

    return (
        <ComparisonContext.Provider value={value}>
            {children}
        </ComparisonContext.Provider>
    );
}

// Hook for consuming the context
export function useComparison() {
    const context = useContext(ComparisonContext);
    if (context === undefined) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
}
