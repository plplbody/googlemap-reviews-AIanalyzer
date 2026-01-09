import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    // AI Preference (Learned)
    aiPreferences: {
        taste: number;
        service: number;
        atmosphere: number;
        cost: number;
    };

    // Semantic Preference Vector (EMA Learned)
    preferenceVector?: number[]; // 768-dim vector

    // Vector Profile (Master Feature Weights) - DEPRECATED / Legacy support
    featureAffinities: Record<string, number>;

    // Explicit User Preferences (Profile Settings)
    favoriteAreas: string[];  // e.g. ["Shinjuku", "Ginza"]
    favoriteGenres: string[]; // e.g. ["Ramen", "Italian"]

    // Legacy/Other
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface UserScenario {
    id: string;             // Auto-generated ID
    name: string;           // "一人メシ", "デート"
    isCustom: boolean;      // true if created by user

    // Semantic Preference Vector (EMA Learned)
    preferenceVector?: number[]; // 768-dim vector

    // AI Preference (Learned)
    aiPreferences: {
        taste: number;
        service: number;
        atmosphere: number;
        cost: number;
    };
    
    updatedAt: Timestamp;
}

export interface UserInteraction {
    uid: string;
    placeId: string;

    isSaved: boolean; // Bookmark
    isVisited: boolean; // Visit flag (separate from Good/Bad)

    // Detailed Evaluation
    evaluation?: {
        type: 'good' | 'bad';
        timestamp: Timestamp;
        // User selected tags (Master Feature Keys)
        selectedFeatureKeys: string[];
        // For Bad evaluation: Direction of dislike (e.g. flavor_strength: 'too_high' (Too Rich))
        negativeFeedback?: Record<string, 'too_high' | 'too_low'>;

        // For Bad evaluation (Legacy/Fallback)
        negativeAxes?: ('taste' | 'service' | 'atmosphere' | 'cost')[];
        note?: string;

        // The actual delta vector applied to the user profile (Global)
        // Renamed from impactVector for clarity, but keeping fallback logic if needed
        embeddingImpact?: number[]; 

        // The actual delta applied to axis preferences (Global)
        axisImpact?: {
            taste: number;
            service: number;
            atmosphere: number;
            cost: number;
        };

        // NEW: Log for Scenarios (Critical for Undo)
        // Store independent deltas for each affected scenario
        scenarioLog?: {
            [scenarioId: string]: {
                axisImpact: {
                    taste: number;
                    service: number;
                    atmosphere: number;
                    cost: number;
                };
                embeddingImpact: number[];
            }
        };
    };

    updatedAt: Timestamp;
}
