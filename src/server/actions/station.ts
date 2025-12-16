'use server';

import { getFirestore } from '@/lib/firebase/admin';
import { fetchNearestStation } from '@/lib/heartrails/client';

export async function updateStationInfo(placeId: string, lat: number, lng: number): Promise<void> {
    const db = getFirestore();
    const docRef = db.collection('places').doc(placeId);

    try {
        // console.log(`[Station Action] Fetching for ${placeId} (${lat}, ${lng})`);
        const stationInfo = await fetchNearestStation(lat, lng);

        if (stationInfo) {
            // console.log(`[Station Action] Computed: ${stationInfo}`);
            await docRef.update({
                nearestStation: stationInfo,
                updatedAt: new Date()
            });
        } else {
            // If no station found, logic could be to mark it as 'none' to avoid retry loop, 
            // but for now we just don't update or maybe update a flag 'stationChecked: true'
            // For simplicity, let's just not update if null.
            console.log(`[Station Action] No station found for ${placeId}`);
        }
    } catch (error) {
        console.error(`[Station Action] Error updating station for ${placeId}:`, error);
    }
}
