'use server';

import { GoogleAuth } from 'google-auth-library';
import { getFirestore } from '@/lib/firebase/admin';
import { enqueueAnalysis } from '@/lib/queue/client';
import { Place } from '@/types/schema';

export async function searchAndAnalyze(query: string): Promise<string> {
    console.log(`Analyzing place: ${query}`);
    const placeId = query; // In the new flow, query is the placeId

    const docRef = getFirestore().collection('places').doc(placeId);
    const doc = await docRef.get();

    if (doc.exists) {
        const data = doc.data() as Place;
        console.log(`Place ${placeId} found. Status: ${data.status}`);

        // Check for expiration (30 days)
        const now = new Date();
        const updatedAt = data.updatedAt ? (data.updatedAt as any).toDate() : new Date(0); // Handle Firestore Timestamp
        const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 30) {
            console.log(`Place ${placeId} data is expired (${diffDays} days old). Re-fetching...`);
            // Fall through to fetch logic
        } else if (data.status === 'error') {
            await enqueueAnalysis(placeId);
            return placeId;
        } else {
            return placeId;
        }
    }

    // If we are here, it means either doc doesn't exist OR it's expired.
    // We need to fetch from Google Places API.
    console.log(`Fetching fresh data for place ${placeId}...`);

    try {
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();

        const baseUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=ja`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`,
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,reviews,priceLevel,priceRange,paymentOptions,delivery,takeout,dineIn,reservable,servesBeer,servesWine,servesVegetarianFood,servesCoffee,servesBreakfast,servesLunch,servesDinner,goodForChildren,goodForGroups,restroom,accessibilityOptions'
        };

        const response = await fetch(baseUrl, { method: 'GET', headers });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Details Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', JSON.stringify(data, null, 2));

        // Extract reviews
        const reviews = data.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [];

        console.log(`Fetched reviews: ${reviews.length}`);

        const newPlace: Place = {
            id: data.id,
            name: data.displayName?.text || 'Unknown',
            address: data.formattedAddress,
            originalRating: data.rating || 0,
            userRatingsTotal: data.userRatingCount || 0,
            ...(data.priceLevel ? { priceLevel: data.priceLevel } : {}),
            ...(data.priceRange ? { priceRange: data.priceRange } : {}),
            reviews: reviews,
            detailedInfo: {
                paymentOptions: data.paymentOptions,
                serviceOptions: {
                    delivery: data.delivery,
                    takeout: data.takeout,
                    dineIn: data.dineIn,
                    reservable: data.reservable
                },
                offerings: {
                    servesBeer: data.servesBeer,
                    servesWine: data.servesWine,
                    servesVegetarianFood: data.servesVegetarianFood,
                    servesCoffee: data.servesCoffee
                },
                diningOptions: {
                    servesBreakfast: data.servesBreakfast,
                    servesLunch: data.servesLunch,
                    servesDinner: data.servesDinner
                },
                amenities: {
                    restroom: data.restroom,
                    goodForChildren: data.goodForChildren,
                    goodForGroups: data.goodForGroups
                },
            },
            status: 'pending',
            createdAt: doc.exists ? (doc.data() as Place).createdAt : new Date(), // Keep original createdAt if exists
            updatedAt: new Date(),
        };

        await docRef.set(newPlace);
        await enqueueAnalysis(placeId);

    } catch (error) {
        console.error('Failed to fetch place details:', error);
        throw error;
    }

    return placeId;
}

export interface PlaceSearchResult {
    id: string;
    name: string;
    rating: number;
    userRatingsTotal: number;
    vicinity?: string;
}

async function searchPlacesIdOnly(query: string): Promise<string[]> {
    console.log(`Searching places (ID only) for: ${query}`);
    try {
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();

        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
                'X-Goog-FieldMask': 'places.id'
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'ja',
                maxResultCount: 20
            })
        });

        if (!response.ok) {
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.places?.map((p: any) => p.id) || [];
    } catch (error) {
        console.error('Failed to search places (ID only):', error);
        return [];
    }
}

export interface PlaceSearchResponse {
    places: PlaceSearchResult[];
    nextPageToken?: string;
}

export async function searchPlaces(query: string, pageToken?: string): Promise<PlaceSearchResponse> {
    console.log(`Searching places list for: ${query}, pageToken: ${pageToken ? 'Yes' : 'No'}`);

    try {
        // 1. ID Search (Free) - Skip if paging
        // Pagination usually implies we skip the efficient ID-only check because we can't easily map pages to IDs without fetching.
        // Also, cache logic is complex with pagination.
        // For simplicity: If pageToken is present, go straight to API.
        // If no pageToken, we can TRY cache, but we need to know if we have *all* results?
        // Actually, the previous cache logic was "If we have ALL 20 IDs in cache".
        // Now valid for first page.

        let placeIds: string[] = [];

        // Only do ID search for first page to check cache
        if (!pageToken) {
            placeIds = await searchPlacesIdOnly(query);
            if (placeIds.length === 0 && !pageToken) return { places: [] };

            // 2. Check Cache (Only for first page)
            const db = getFirestore();
            const placesRef = db.collection('places');
            const cachedPlaces: PlaceSearchResult[] = [];
            let allCached = true;

            for (const id of placeIds) {
                const doc = await placesRef.doc(id).get();
                if (doc.exists) {
                    const data = doc.data() as Place;
                    // Check expiration (30 days)
                    const now = new Date();
                    const updatedAt = data.updatedAt ? (data.updatedAt as any).toDate() : new Date(0);
                    const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 30 && data.status !== 'error') {
                        cachedPlaces.push({
                            id: data.id,
                            name: data.name,
                            rating: data.originalRating,
                            userRatingsTotal: data.userRatingsTotal,
                            vicinity: data.address
                        });
                    } else {
                        allCached = false;
                        break;
                    }
                } else {
                    allCached = false;
                    break;
                }
            }

            // 3. Conditional Return (Only if all cached and no page token needed logic?)
            // If we have cached data for the top 20, we return them.
            // Converting cache hits to a "Next Page" capable response is tricky because we don't have the nextPageToken from the original API call stored.
            // If we return cached data, the user CANNOT load more because we don't have the token.
            // ERROR: Using cache breaks pagination?
            // "Load More" relies on Google's `nextPageToken`. Reviewing flow:
            // Query -> Google API -> Returns items + Token.
            // If we satisfy from Cache, we DON'T have the Token.
            // So if we use Cache, "Load More" is impossible unless we re-fetch from API using the original query?
            // Compromise: If we return cached results, we set `nextPageToken` to null.
            // If the user wants "More", they might be stuck?
            // Actually, if the cache has 20 items, and we show 20 items...
            // User says "Load More". We don't have token.
            // We'd have to trigger a NEW search (API) skipping the first 20? No, Google API doesn't support "offset".
            // So, if we want to support "Load More", we MUST fetch from API to get the token, OR we accept that "Cached results have no next page".
            // Since the user EXPLICITLY requested "More", we should prioritize API token availability if possible, OR just disable cache for now to ensure feature works?
            // Or, we return cached results, but if user clicks "More" (which won't exist?), they can't.
            // Let's Disable Cache for now to ensure Pagination works correctly as per user request.
            // Or only disable cache if we expect more than 20 results? We don't know.
            // Disabling cache for Search List is safer for this feature.

            // NOTE: Caching currently disabled for direct search to ensure PAGINATION works (needs fresh nextPageToken).
        }

        console.log('Fetching fresh data from API...');

        // 4. Fallback to Full Search (Pro)
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();

        const requestBody: any = {
            textQuery: query,
            languageCode: 'ja',
            maxResultCount: 20
        };

        if (pageToken) {
            requestBody.pageToken = pageToken;
        }

        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews,places.priceLevel,places.priceRange,places.paymentOptions,places.delivery,places.takeout,places.dineIn,places.reservable,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.servesCoffee,places.servesBreakfast,places.servesLunch,places.servesDinner,places.goodForChildren,places.goodForGroups,places.restroom,places.accessibilityOptions,nextPageToken'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.places) {
            return { places: [] };
        }

        const db = getFirestore(); // Ensure DB is initialized
        const placesRef = db.collection('places');
        const batch = db.batch();
        const results: PlaceSearchResult[] = [];

        for (const placeData of data.places) {
            const reviews = placeData.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [];

            // Construct full Place object to cache
            // Use Partial<Place> to avoid 'missing property' errors when we deliberately omit 'status' to preserve it
            const newPlace: Partial<Place> = {
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                address: placeData.formattedAddress,
                originalRating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                ...(placeData.priceLevel ? { priceLevel: placeData.priceLevel } : {}),
                ...(placeData.priceRange ? { priceRange: placeData.priceRange } : {}),
                reviews: reviews,
                detailedInfo: {
                    paymentOptions: placeData.paymentOptions,
                    serviceOptions: {
                        delivery: placeData.delivery,
                        takeout: placeData.takeout,
                        dineIn: placeData.dineIn,
                        reservable: placeData.reservable
                    },
                    offerings: {
                        servesBeer: placeData.servesBeer,
                        servesWine: placeData.servesWine,
                        servesVegetarianFood: placeData.servesVegetarianFood,
                        servesCoffee: placeData.servesCoffee
                    },
                    diningOptions: {
                        servesBreakfast: placeData.servesBreakfast,
                        servesLunch: placeData.servesLunch,
                        servesDinner: placeData.servesDinner
                    },
                    amenities: {
                        restroom: placeData.restroom,
                        goodForChildren: placeData.goodForChildren,
                        goodForGroups: placeData.goodForGroups
                    }
                },
                updatedAt: new Date(),
            };

            // Prepare for return
            results.push({
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                rating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                vicinity: placeData.formattedAddress
            });

            const ref = placesRef.doc(placeData.id);
            // Use merge: true to update existing docs without wiping other fields
            batch.set(ref, newPlace, { merge: true });
        }

        await batch.commit();

        // Fire-and-forget analysis for items needing it
        (async () => {
            const refs = results.map(r => placesRef.doc(r.id));
            if (refs.length === 0) return;

            try {
                const snapshots = await db.getAll(...refs);

                for (const snap of snapshots) {
                    const d = snap.data() as Place;
                    // Trigger if:
                    // 1. Status is MISSING (new)
                    // 2. OR Status is 'error'
                    // 3. We do NOT re-trigger if 'pending', 'processing', 'completed'.
                    if (!d.status || d.status === 'error') {
                        console.log(`Triggering analysis for ${d.id}`);
                        // Set status to pending to prevent double-queueing? 
                        // Ideally yes, but fire-and-forget.
                        enqueueAnalysis(d.id).catch(e => console.error(`Failed to enqueue ${d.id}`, e));
                    }
                }
            } catch (e) {
                console.error("Error checking status for analysis trigger", e);
            }
        })();

        return {
            places: results,
            nextPageToken: data.nextPageToken
        };

    } catch (error) {
        console.error('Failed to search places:', error);
        return { places: [] };
    }
}
