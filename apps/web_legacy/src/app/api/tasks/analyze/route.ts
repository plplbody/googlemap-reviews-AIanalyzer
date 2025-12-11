import { NextRequest, NextResponse } from 'next/server';
import { analyzePlace } from '@/server/services/analyzer.service';

export async function POST(req: NextRequest) {
    try {
        // Basic validation (In prod, verify OIDC token from Cloud Tasks)
        // const authHeader = req.headers.get('Authorization');
        // if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { placeId } = body;

        if (!placeId) {
            return NextResponse.json({ error: 'Missing placeId' }, { status: 400 });
        }

        console.log(`[API] Received task for place: ${placeId}`);

        await analyzePlace(placeId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[API] Task failed', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
