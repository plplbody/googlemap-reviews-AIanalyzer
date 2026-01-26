'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, documentId, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client';
import { UserInteraction } from '@/types/user';

export function useBulkUserInteractions(uid: string | undefined, placeIds: string[]) {
    const [interactions, setInteractions] = useState<Record<string, UserInteraction>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!uid || placeIds.length === 0) {
            setInteractions({});
            return;
        }

        const fetchInteractions = async () => {
            setLoading(true);
            try {
                // Chunk into batches of 10 for 'in' query
                // Note: documentId() + 'in' with subcollections can be tricky if not careful,
                // but for `users/{uid}/interactions` where docId is placeId, it should work 
                // IF we query that specific collection.

                const chunkSize = 10;
                const chunks = [];
                for (let i = 0; i < placeIds.length; i += chunkSize) {
                    chunks.push(placeIds.slice(i, i + chunkSize));
                }

                const results: Record<string, UserInteraction> = {};

                await Promise.all(chunks.map(async (chunk) => {
                    const ref = collection(firestore, 'users', uid, 'interactions');
                    const q = query(ref, where(documentId(), 'in', chunk));
                    const snap = await getDocs(q);

                    snap.forEach(doc => {
                        results[doc.id] = doc.data() as UserInteraction;
                    });
                }));

                setInteractions(results);
            } catch (error) {
                console.error("Failed to bulk fetch interactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInteractions();
    }, [uid, JSON.stringify(placeIds)]); // Use stringify to compare array content

    return { interactions, loading };
}
