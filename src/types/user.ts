import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    // Explicit Profile Data
    activityArea?: string[]; // e.g. ["Shibuya", "Shinjuku"]
    basePreferences?: {
        taste: number;
        service: number;
        atmosphere: number;
        cost: number;
    };
    preferredTags?: string[]; // Semantic tags selected by user

    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface UserInteraction {
    uid: string;
    placeId: string;
    visitedAt?: Timestamp;
    isFavorite: boolean;
    isVisited: boolean;
    repeat?: boolean; // true=Yes, false=No

    // Negative Feedback (if repeat=false)
    negativeReason?: {
        axis: 'taste' | 'service' | 'atmosphere' | 'cost';
        note?: string;
    };

    updatedAt: Timestamp;
}
