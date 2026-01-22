'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Place } from '@/types/schema';

interface SearchContextType {
    cachedResults: Place[];
    cachedNextPageToken: string | undefined;
    cachedQuery: string;
    setCache: (query: string, results: Place[], nextPageToken?: string) => void;
    appendResults: (newResults: Place[], nextPageToken?: string) => void;
    clearCache: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [cachedResults, setCachedResults] = useState<Place[]>([]);
    const [cachedNextPageToken, setCachedNextPageToken] = useState<string | undefined>(undefined);
    const [cachedQuery, setCachedQuery] = useState<string>("");

    const setCache = (query: string, results: Place[], nextPageToken?: string) => {
        setCachedQuery(query);
        setCachedResults(results);
        setCachedNextPageToken(nextPageToken);
    };

    const appendResults = (newResults: Place[], nextPageToken?: string) => {
        setCachedResults(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNewResults = newResults.filter(p => !existingIds.has(p.id));
            return [...prev, ...uniqueNewResults];
        });
        setCachedNextPageToken(nextPageToken);
    };

    const clearCache = () => {
        setCachedQuery("");
        setCachedResults([]);
        setCachedNextPageToken(undefined);
    };

    return (
        <SearchContext.Provider value={{
            cachedResults,
            cachedNextPageToken,
            cachedQuery,
            setCache,
            appendResults,
            clearCache
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
