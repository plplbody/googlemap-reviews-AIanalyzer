import { useEffect, useState } from 'react';
import { collection, documentId, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client';
import { Place } from '@/types/schema';

export function useRealtimePlaces(initialPlaceIds: string[]) {
    const [places, setPlaces] = useState<Record<string, Place>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialPlaceIds.length === 0) {
            setPlaces({});
            setLoading(false);
            return;
        }

        setLoading(true);

        // Firestore 'in' query supports up to 30 items. 
        // If we have more (e.g. Load More), we might need to batch listeners or only listen to visible ones.
        // robust implementation: chunk into 30s? 
        // For now assuming pagination keeps it < 30 per page or we just listen to the displayed set.
        // If 'initialPlaceIds' grows large (e.g. infinite scroll), we should probably only listen to the new ones 
        // or refactor to not listen to all.
        // However, user requirement is "Sort", which implies we need scores for ALL loaded items to sort correctly.
        // If we have 100 loaded items, we can't sort by "True Score" if we haven't fetched it.
        // So we MUST listen/fetch all.
        // Limitation: Firestore listeners for > 30 items requires multiple queries.

        // Chunking implementation
        const chunkStats = (ids: string[], size: number) => {
            const chunks = [];
            for (let i = 0; i < ids.length; i += size) {
                chunks.push(ids.slice(i, i + size));
            }
            return chunks;
        };

        const chunks = chunkStats(initialPlaceIds, 30);
        const unsubscribes: (() => void)[] = [];

        chunks.forEach(chunkIds => {
            const q = query(
                collection(firestore, 'places'),
                where(documentId(), 'in', chunkIds)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                setPlaces(prev => {
                    const next = { ...prev };
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'removed') {
                            delete next[change.doc.id];
                        } else {
                            next[change.doc.id] = { id: change.doc.id, ...change.doc.data() } as Place;
                        }
                    });
                    return next;
                });
            });
            unsubscribes.push(unsubscribe);
        });

        setLoading(false);

        return () => {
            unsubscribes.forEach(unsub => unsub());
        };
    }, [JSON.stringify(initialPlaceIds)]); // Use JSON stringify to avoid ref dependency loop if array is new every render

    return { places, loading };
}
