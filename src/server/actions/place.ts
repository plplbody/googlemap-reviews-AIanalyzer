'use server';

import { GoogleAuth } from 'google-auth-library';
import { getFirestore } from '@/lib/firebase/admin';
import { enqueueAnalysis } from '@/lib/queue/client';
import { Place } from '@/types/schema';
import { searchHotPepperPlace } from '@/lib/hotpepper/client';

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
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,userRatingCount,reviews,priceLevel,priceRange,paymentOptions,delivery,takeout,dineIn,reservable,servesBeer,servesWine,servesVegetarianFood,servesCoffee,servesBreakfast,servesLunch,servesDinner,goodForChildren,goodForGroups,restroom,accessibilityOptions,nationalPhoneNumber'
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
            location: data.location ? {
                lat: data.location.latitude,
                lng: data.location.longitude
            } : undefined,
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

        // Integrate HotPepper (High Accuracy with Phone)
        const phoneNumber = (data.nationalPhoneNumber || '').replace(/[^0-9]/g, '');

        if (phoneNumber) {
            try {
                const hpData = await searchHotPepperPlace(newPlace.name, phoneNumber);

                if (hpData) {
                    console.log(`HotPepper Hit (Phone)! ${hpData.name}`);
                    await docRef.update({ hotpepper: hpData });
                }
            } catch (e) {
                console.error('HotPepper integration error:', e);
            }
        }

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
    hotpepper?: any;
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
        let placeIds: string[] = [];
        if (!pageToken) {
            placeIds = await searchPlacesIdOnly(query);
            // Cache logic disabled for now to simplify flow
            // Note: In a real "ID First" flow, we would check FireStore here.
            // But now we proceed to Full Search for simplicity as per previous context.
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
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.reviews,places.priceLevel,places.priceRange,places.paymentOptions,places.delivery,places.takeout,places.dineIn,places.reservable,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.servesCoffee,places.servesBreakfast,places.servesLunch,places.servesDinner,places.goodForChildren,places.goodForGroups,places.restroom,places.accessibilityOptions,places.nationalPhoneNumber,nextPageToken'
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

        const db = getFirestore();
        const placesRef = db.collection('places');
        const batch = db.batch();
        const results: PlaceSearchResult[] = [];

        for (const placeData of data.places) {
            const reviews = placeData.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [];

            const newPlace: Partial<Place> = {
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                address: placeData.formattedAddress,
                originalRating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                ...(placeData.priceLevel ? { priceLevel: placeData.priceLevel } : {}),
                ...(placeData.priceRange ? { priceRange: data.priceRange } : {}),
                reviews: reviews,
                location: placeData.location ? {
                    lat: placeData.location.latitude,
                    lng: placeData.location.longitude
                } : undefined,
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

            results.push({
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                rating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                vicinity: placeData.formattedAddress
            });

            const ref = placesRef.doc(placeData.id);
            batch.set(ref, newPlace, { merge: true });
        }

        await batch.commit();

        // Fire-and-forget: Integrate HotPepper Data (Phone Priority, then Name Match)
        (async () => {
            const phoneMap = new Map<string, string>();
            if (data.places) {
                for (const p of data.places) {
                    if (p.nationalPhoneNumber) {
                        phoneMap.set(p.id, p.nationalPhoneNumber);
                    }
                }
            }

            for (const place of results) {
                const tel = phoneMap.get(place.id);
                integrateHotPepperInfo(place.id, place.name, tel).catch(e => console.error(e));
            }
        })();

        // Fire-and-forget analysis for items needing it
        (async () => {
            const refs = results.map(r => placesRef.doc(r.id));
            if (refs.length === 0) return;

            try {
                const snapshots = await db.getAll(...refs);

                for (const snap of snapshots) {
                    const d = snap.data() as Place;
                    if (!d.status || d.status === 'error') {
                        console.log(`Triggering analysis for ${d.id}`);
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

export async function integrateHotPepperInfo(placeId: string, name: string, tel?: string): Promise<void> {
    const db = getFirestore();
    const docRef = db.collection('places').doc(placeId);

    try {
        const cleanTel = tel ? tel.replace(/[^0-9]/g, '') : undefined;
        // console.log(`Integrating HotPepper for ${name} (Tel: ${cleanTel})...`);
        const hpData = await searchHotPepperPlace(name, cleanTel);

        if (hpData) {
            console.log(`HotPepper Hit! ${hpData.name} for ${name}`);
            await docRef.update({
                hotpepper: hpData,
                updatedAt: new Date()
            });
        }
    } catch (e) {
        console.error(`Error in integrateHotPepperInfo for ${placeId}`, e);
    }
}
