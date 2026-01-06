'use server';

import { GoogleAuth } from 'google-auth-library';
import { getFirestore } from '@/lib/firebase/admin';
import { firestore } from 'firebase-admin';
import { enqueueAnalysis } from '@/lib/queue/client';
import { Place } from '@/types/schema';
import { searchHotPepperPlace } from '@/lib/hotpepper/client';

import { checkRateLimit } from '@/lib/security/rate-limit';

const MAX_QUERY_LENGTH = 100;

function sanitizeLog(text: string): string {
    // Mask Email
    text = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
    // Mask Phone (simple digits check, conservative)
    text = text.replace(/\b\d{10,11}\b/g, '[PHONE]');
    return text;
}

export async function getPlaceDetails(placeId: string): Promise<string> {
    // Security: Input Length Validation
    if (placeId.length > MAX_QUERY_LENGTH) {
        console.warn(`[Security] PlaceId too long: ${placeId.length} chars.`);
        throw new Error(`不正なPlace IDです`);
    }

    const sanitizedId = sanitizeLog(placeId);
    console.log(`Getting details for place: ${sanitizedId}`);

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
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,addressComponents,types,location,rating,userRatingCount,reviews,priceLevel,priceRange,paymentOptions,delivery,takeout,dineIn,reservable,servesBeer,servesWine,servesVegetarianFood,servesCoffee,servesBreakfast,servesLunch,servesDinner,goodForChildren,goodForGroups,restroom,accessibilityOptions,nationalPhoneNumber'
        };

        const response = await fetch(baseUrl, { method: 'GET', headers });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Details Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log('API Response Data:', JSON.stringify(data, null, 2));

        // Extract reviews
        const reviews = data.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [];

        // Extract Area (Hierarchy)
        let area: string[] = [];
        if (data.addressComponents) {
            const adminArea = data.addressComponents.find((c: any) => c.types?.includes('administrative_area_level_1')); // Prefecture
            const locality = data.addressComponents.find((c: any) => c.types?.includes('locality')); // City / Ward

            if (adminArea) area.push(adminArea.longText);
            if (locality) area.push(locality.longText);

            // Deduplicate just in case
            area = Array.from(new Set(area));
        }

        console.log(`Fetched reviews: ${reviews.length}`);

        const newPlace: Place = {
            id: data.id,
            name: data.displayName?.text || 'Unknown',
            address: data.formattedAddress,
            // API Normalization Fields
            genre: data.types || [],
            area: area,

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

// NOTE: This function is kept for utility purposes but not used in the main searchPlaces flow (Optimization)
async function searchPlacesIdOnly(query: string, pageToken?: string): Promise<{ ids: string[], nextPageToken?: string }> {
    console.log(`Searching places (ID only) for: ${query}`);
    try {
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
                'X-Goog-FieldMask': 'places.id,nextPageToken'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            ids: data.places?.map((p: any) => p.id) || [],
            nextPageToken: data.nextPageToken
        };
    } catch (error) {
        console.error('Failed to search places (ID only):', error);
        return { ids: [] };
    }
}

export interface PlaceSearchResponse {
    places: PlaceSearchResult[];
    nextPageToken?: string;
}

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchPlaces(query: string, pageToken?: string): Promise<PlaceSearchResponse> {
    // Security: Input Length Validation
    if (query.length > MAX_QUERY_LENGTH) {
        throw new Error(`検索キーワードが長すぎます（最大${MAX_QUERY_LENGTH}文字）`);
    }
    await checkRateLimit();
    console.log(`Searching places list (COST OPTIMIZED) for: ${query}`);

    try {
        // [Cost Strategy] Use Bulk Text Search (1 Request = 20 Items)
        // Optimized: Single API call. 
        // Checks cache (Status) after fetching to avoid Re-Analysis costs.
        const data = await fetchRawGooglePlaces(query, pageToken);
        const results: PlaceSearchResult[] = [];
        const items = data.places || [];

        if (items.length > 0) {
            const db = getFirestore();
            const placesRef = db.collection('places');
            const batch = db.batch();

            // 1. Fetch Existing Docs to check status
            const ids = items.map((p: any) => p.id);
            // Firestore 'in' query limit is 30. items length is max 20.
            const existingDocs = await placesRef.where(firestore.FieldPath.documentId(), 'in', ids).get();
            const existingMap = new Map<string, Place>();
            existingDocs.forEach(doc => {
                existingMap.set(doc.id, doc.data() as Place);
            });

            // List of IDs that need analysis
            const placesToAnalyze: string[] = [];

            // HotPepper Phone Map
            const phoneMap = new Map<string, string>();
            items.forEach((p: any) => {
                if (p.nationalPhoneNumber) phoneMap.set(p.id, p.nationalPhoneNumber);
            });

            for (const placeData of items) {
                // Determine Reviews
                const reviews = placeData.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [];

                // Extract Area (Hierarchy)
                let area: string[] = [];
                if (placeData.addressComponents) {
                    const adminArea = placeData.addressComponents.find((c: any) => c.types?.includes('administrative_area_level_1'));
                    const locality = placeData.addressComponents.find((c: any) => c.types?.includes('locality'));
                    if (adminArea) area.push(adminArea.longText);
                    if (locality) area.push(locality.longText);
                    area = Array.from(new Set(area));
                }

                // Check Cache Status
                const existing = existingMap.get(placeData.id);
                let shouldAnalyze = true;
                let statusToSet = 'pending';
                let hotpepperData = existing?.hotpepper;

                if (existing) {
                    // Check for expiration (30 days)
                    const now = new Date();
                    const updatedAt = existing.updatedAt ? (existing.updatedAt as any).toDate() : new Date(0);
                    const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 30 && (existing.status === 'completed' || existing.status === 'processing')) {
                        // Valid cache exists
                        shouldAnalyze = false;
                        statusToSet = existing.status;
                        // console.log(`[Cache Hit] Place ${placeData.id}. Skipping analysis.`);
                    }
                }

                if (shouldAnalyze) {
                    placesToAnalyze.push(placeData.id);
                }

                // Prepare Place Object
                const newPlace: Partial<Place> = {
                    id: placeData.id,
                    name: placeData.displayName?.text || 'Unknown',
                    address: placeData.formattedAddress,
                    genre: placeData.types || [],
                    area: area,
                    originalRating: placeData.rating || 0,
                    userRatingsTotal: placeData.userRatingCount || 0,
                    ...(placeData.priceLevel ? { priceLevel: placeData.priceLevel } : {}),
                    ...(placeData.priceRange ? { priceRange: placeData.priceRange } : {}),
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
                            reservable: data.reservable
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
                    status: statusToSet as any,
                    createdAt: existing ? existing.createdAt : new Date(),
                    updatedAt: new Date(),
                    ...(hotpepperData ? { hotpepper: hotpepperData } : {})
                };

                // Add to Result List
                results.push({
                    id: placeData.id,
                    name: placeData.displayName?.text || 'Unknown',
                    rating: placeData.rating || 0,
                    userRatingsTotal: placeData.userRatingCount || 0,
                    vicinity: placeData.formattedAddress,
                    hotpepper: hotpepperData
                });

                const ref = placesRef.doc(placeData.id);
                batch.set(ref, newPlace, { merge: true });
            }

            await batch.commit();

            // Fire-and-forget: HotPepper & Analysis
            (async () => {
                // Analysis
                for (const placeId of placesToAnalyze) {
                    enqueueAnalysis(placeId).catch(e => console.error(`Failed to enqueue ${placeId}`, e));
                }

                // HotPepper
                for (const res of results) {
                    if (!res.hotpepper) {
                        const tel = phoneMap.get(res.id);
                        if (tel) {
                            integrateHotPepperInfo(res.id, res.name, tel).catch(e => console.error(e));
                        }
                    }
                }
            })();
        }

        return {
            places: results,
            nextPageToken: data.nextPageToken
        };

    } catch (error) {
        console.error('Failed to search places:', error);
        return { places: [] };
    }
}

async function fetchRawGooglePlaces(query: string, pageToken?: string) {
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
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.addressComponents,places.types,places.location,places.rating,places.userRatingCount,places.reviews,places.priceLevel,places.priceRange,places.paymentOptions,places.delivery,places.takeout,places.dineIn,places.reservable,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.servesCoffee,places.servesBreakfast,places.servesLunch,places.servesDinner,places.goodForChildren,places.goodForGroups,places.restroom,places.accessibilityOptions,places.nationalPhoneNumber,nextPageToken'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Google Places API Error:', errorText);
        throw new Error(`Google Places API Error: ${response.statusText}`);
    }

    return await response.json();
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
