
import { ExpoRequest } from 'expo-router/server';
import { GoogleAuth } from 'google-auth-library';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from '../../src/lib/firebase/admin';

if (!getApps().length) {
    initializeApp();
}

export async function GET(request: ExpoRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const pageToken = searchParams.get('pageToken');

    if (!query) {
        return Response.json({ error: 'Missing query' }, { status: 400 });
    }

    console.log(`[API] Search for: ${query}`);

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
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews,places.priceLevel,places.priceRange,places.paymentOptions,places.delivery,places.takeout,places.dineIn,places.reservable,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.servesCoffee,places.servesBreakfast,places.servesLunch,places.servesDinner,places.goodForChildren,places.goodForGroups,places.restroom,places.accessibilityOptions,nextPageToken'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[API] Google Places API Error:', errorText);
            return Response.json({ error: errorText }, { status: response.status });
        }

        const data = await response.json();

        // Transform data and prepare for Firestore
        const results = data.places?.map((p: any) => ({
            id: p.id,
            name: p.displayName?.text || 'Unknown',
            address: p.formattedAddress, // Mapping address
            rating: p.rating || 0,
            userRatingsTotal: p.userRatingCount || 0,
            originalRating: p.rating || 0,
            status: 'pending', // Default status for analysis
            updatedAt: new Date(),
            // Basic data for list view & Analysis context
            detailedInfo: p,
            reviews: p.reviews?.map((r: any) => r.text?.text).filter(Boolean) || [],
        })) || [];

        // Cache to Firestore using Admin SDK
        if (results.length > 0) {
            try {
                const db = getFirestore();
                const batch = db.batch();

                results.forEach((place: any) => {
                    const docRef = db.collection('places').doc(place.id);
                    // Use set with merge to avoid overwriting existing analysis if any
                    // We only want to update detailedInfo/reviews if they are new, 
                    // but usually search result is "fresh". 
                    // Merging is safe.
                    batch.set(docRef, place, { merge: true });
                });

                await batch.commit();
                console.log(`[API] Cached ${results.length} places to Firestore`);
            } catch (fsError) {
                console.error('[API] Firestore Cache Error:', fsError);
                // Continue even if cache fails, returning results to client
            }
        }

        // Return simplified list to client
        const clientResults = results.map((r: any) => ({
            id: r.id,
            name: r.name,
            viinity: r.address, // mapping vicinity to address
            rating: r.rating,
            userRatingsTotal: r.userRatingsTotal
        }));

        return Response.json({
            places: clientResults,
            nextPageToken: data.nextPageToken
        });

    } catch (error: any) {
        console.error('[API] Server Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
