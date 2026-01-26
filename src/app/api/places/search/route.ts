import { NextResponse } from 'next/server';
import { searchPlaces } from '@/server/actions/place';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query, pageToken } = body;
        const result = await searchPlaces(query, pageToken);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
