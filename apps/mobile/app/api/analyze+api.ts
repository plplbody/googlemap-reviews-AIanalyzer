
import { ExpoRequest } from 'expo-router/server';
import { analyzePlace } from '../../src/services/analyzer.service';

export async function POST(request: ExpoRequest) {
  try {
    const { placeId } = await request.json();

    if (!placeId) {
      return Response.json({ error: 'Missing placeId' }, { status: 400 });
    }

    console.log(`[API] Trigger Analysis for: ${placeId}`);

    // Call the ported service function.
    await analyzePlace(placeId);

    return Response.json({ success: true, message: 'Analysis queued' });

  } catch (error: any) {
    console.error('[API] Analysis Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
