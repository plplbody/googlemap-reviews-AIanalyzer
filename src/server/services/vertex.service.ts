import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';
import { GoogleAuth } from 'google-auth-library';

// Initialize Vertex AI lazily to avoid cold start issues if unused
let vertexAI: VertexAI | null = null;
let auth: GoogleAuth | null = null;

const getVertexAI = (): VertexAI => {
    if (!vertexAI) {
        const project = process.env.GOOGLE_CLOUD_PROJECT;
        if (!project) {
            throw new Error("GOOGLE_CLOUD_PROJECT environment variable is not set.");
        }
        vertexAI = new VertexAI({
            project: project,
            location: 'us-central1'
        });
    }
    return vertexAI;
};

export const getGenerativeModel = (modelName: string = 'gemini-2.0-flash-001'): GenerativeModel => {
    return getVertexAI().getGenerativeModel({ model: modelName });
};

/**
 * Generate text embeddings for the given text using text-embedding-005.
 * Returns a 768-dimensional vector.
 * Note: Uses direct REST API as SDK support for embeddings is inconsistent in current version.
 */
export async function getEmbedding(text: string): Promise<number[]> {
    const project = process.env.GOOGLE_CLOUD_PROJECT;
    const location = 'us-central1';
    const modelId = 'text-embedding-005';

    if (!project) throw new Error("GOOGLE_CLOUD_PROJECT not set");

    if (!auth) {
        auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
    }

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    const token = accessToken.token;

    if (!token) throw new Error("Failed to get access token");

    const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${modelId}:predict`;

    // specific format for text-embedding models
    const payload = {
        instances: [
            { content: text }
        ]
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[VertexAI] Embedding API Error: ${response.status} ${response.statusText}`, errorText);
            throw new Error(`Vertex AI API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Response format: { predictions: [ { embeddings: { values: [...] } } ] }
        const prediction = data.predictions?.[0];

        if (!prediction) {
            throw new Error("No predictions returned from Vertex AI");
        }

        let values: number[] | undefined;

        // check standard format
        if (prediction.embeddings && prediction.embeddings.values) {
            values = prediction.embeddings.values;
        }
        // fallback check if just array (unlikely for 005 but possible for older gecko)
        else if (Array.isArray(prediction)) {
            values = prediction;
        }

        if (!values) {
            console.error("[VertexAI] Unexpected response format:", JSON.stringify(data));
            throw new Error("Failed to parse embedding values");
        }

        return values;

    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}
