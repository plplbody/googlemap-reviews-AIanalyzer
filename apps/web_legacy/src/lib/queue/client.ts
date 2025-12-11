import { analyzePlace } from '@/server/services/analyzer.service';

export async function enqueueAnalysis(placeId: string) {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        console.log(`[Local] Enqueuing analysis for ${placeId} directly.`);
        try {
            await analyzePlace(placeId);
        } catch (e) {
            console.error("Local analysis failed", e);
        }
    } else {
        console.log(`[Prod] Enqueuing analysis for ${placeId} to Cloud Tasks.`);

        // Dynamic import to avoid build-time evaluation issues in dev/build
        const { CloudTasksClient } = await import('@google-cloud/tasks');
        const client = new CloudTasksClient();

        const project = process.env.GOOGLE_CLOUD_PROJECT;
        const queue = 'analysis-queue';
        const location = 'us-central1';
        const url = `https://${process.env.NEXT_PUBLIC_HOST}/api/tasks/analyze`;

        const parent = client.queuePath(project!, location, queue);

        const task = {
            httpRequest: {
                httpMethod: 'POST' as const,
                url,
                body: Buffer.from(JSON.stringify({ placeId })).toString('base64'),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        };

        await client.createTask({ parent, task });
    }
}
