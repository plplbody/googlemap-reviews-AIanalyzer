import { NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase/admin';
import { PREFECTURES, CITIES } from '@/constants/seo-areas';

// Allow this function to run for up to 5 minutes (Platform specific config)
export const maxDuration = 300;

export async function GET(request: Request) {
    // Optional: Add Authorization check here
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getFirestore();
    const batch = db.batch();
    const processedPrefectures = [];

    try {
        console.log('Starting batch aggregation for stats...');

        for (const pref of PREFECTURES) {
            const prefName = pref.name;
            const prefId = pref.id;

            // 1. Get cities map for this prefecture (Name -> Id)
            // @ts-ignore
            const citiesInPref = CITIES[prefId] || [];
            if (citiesInPref.length === 0) continue;

            const areaToId = new Map<string, string>();
            citiesInPref.forEach((c: any) => {
                areaToId.set(c.name, c.id);
            });

            // 2. Query places
            const snapshot = await db.collection('places')
                .where('area', 'array-contains', prefName)
                .where('status', '==', 'completed')
                .select('area', 'usageScores')
                .get();

            const counts: Record<string, number> = {};

            snapshot.forEach(doc => {
                const data = doc.data();
                const areas = data.area as string[] || [];
                const scores = data.usageScores as Record<string, number> | undefined;

                if (!scores) return;

                // Find cityId
                let cityId: string | undefined;
                for (const a of areas) {
                    if (areaToId.has(a)) {
                        cityId = areaToId.get(a);
                        break;
                    }
                }

                if (!cityId) return;

                // Aggregate
                for (const [scene, score] of Object.entries(scores)) {
                    // Threshold: 4.0
                    if (score >= 4.0) {
                        const key = `${cityId}:${scene}`;
                        counts[key] = (counts[key] || 0) + 1;
                    }
                }
            });

            // 3. Prepare Stats Document
            // Path: stats/{prefId}
            const statsRef = db.collection('stats').doc(prefId);
            batch.set(statsRef, {
                counts,
                updatedAt: new Date().toISOString()
            });

            processedPrefectures.push({
                id: prefId,
                foundPlaces: snapshot.size,
                uniqueKeys: Object.keys(counts).length
            });
        }

        // 4. Commit Batch
        await batch.commit();

        console.log('Batch aggregation completed successfully.');
        return NextResponse.json({
            success: true,
            processed: processedPrefectures
        });

    } catch (error) {
        console.error('Batch aggregation failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
