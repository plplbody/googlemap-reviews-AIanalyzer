import { analyzePlace } from '@/server/services/analyzer.service';
import { CloudTasksClient } from '@google-cloud/tasks';
import { Buffer } from 'buffer';


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
        const client = new CloudTasksClient();

        // Safe Project ID resolution
        const project = process.env.GOOGLE_CLOUD_PROJECT || await client.getProjectId();
        const queue = 'analysis-queue';
        const location = 'asia-northeast1';

        // Host resolution with fallback check
        const host = process.env.NEXT_PUBLIC_HOST;
        if (!host) {
            console.error('MISSING_ENV: NEXT_PUBLIC_HOST is not defined. Cannot queue task.');
            throw new Error('NEXT_PUBLIC_HOST is undefined');
        }

        const url = `https://${host}/api/tasks/analyze`;

        console.log(`Targeting Queue: projects/${project}/locations/${location}/queues/${queue}`);
        console.log(`Callback URL: ${url}`);

        const parent = client.queuePath(project, location, queue);

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
