'use server';

export async function getGoogleMapsApiKey(): Promise<string> {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    console.log('getGoogleMapsApiKey called. Key exists:', !!key);
    if (!key) {
        console.warn('GOOGLE_MAPS_API_KEY is not set');
        return '';
    }
    return key;
}
