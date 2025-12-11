
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../lib/firebase/client';
import { Place } from '@repo/lib';

export function useRealtimePlaces(placeIds: string[]) {
    const [places, setPlaces] = useState<Record<string, Place>>({});

    useEffect(() => {
        if (placeIds.length === 0) return;

        const unsubscribes: (() => void)[] = [];

        placeIds.forEach(id => {
            const unsub = onSnapshot(doc(firestore, 'places', id), (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setPlaces(prev => ({
                        ...prev,
                        [id]: { id: docSnapshot.id, ...docSnapshot.data() } as Place
                    }));
                }
            });
            unsubscribes.push(unsub);
        });

        return () => {
            unsubscribes.forEach(u => u());
        };
    }, [JSON.stringify(placeIds)]); // JSON stringify to compare array content

    return { places };
}
