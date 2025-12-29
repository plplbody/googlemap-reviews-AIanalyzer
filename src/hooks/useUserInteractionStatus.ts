'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client';
import { UserInteraction } from '@/types/user';

export function useUserInteractionStatus(uid: string, placeId: string) {
    const [interaction, setInteraction] = useState<UserInteraction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid || !placeId) {
            setInteraction(null);
            setLoading(false);
            return;
        }

        const ref = doc(firestore, 'users', uid, 'interactions', placeId);
        const unsubscribe = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                setInteraction(snap.data() as UserInteraction);
            } else {
                setInteraction(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching interaction:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [uid, placeId]);

    return { interaction, loading };
}
