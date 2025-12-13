export interface HeartRailsStation {
    name: string;
    distance: string; // "350m" or similar
    line: string;
    x: number;
    y: number;
    prev: string;
    next: string;
}

interface HeartRailsResponse {
    response: {
        station?: HeartRailsStation[];
        error?: string;
    }
}

const HEARTRAILS_API_ENDPOINT = 'http://express.heartrails.com/api/json';

export async function fetchNearestStation(lat: number, lng: number): Promise<string | null> {
    try {
        const params = new URLSearchParams({
            method: 'getStations',
            x: lng.toString(),
            y: lat.toString()
        });

        const url = `${HEARTRAILS_API_ENDPOINT}?${params.toString()}`;
        // console.log(`[HeartRails] Fetching nearest station for ${lat}, ${lng}`);

        const res = await fetch(url);

        if (!res.ok) {
            console.error(`[HeartRails] API Error: ${res.status}`);
            return null;
        }

        const data = await res.json() as HeartRailsResponse;

        if (data.response.station && data.response.station.length > 0) {
            // stations are usually sorted by distance, but double check or just take first
            // HeartRails returns closest first by default for getStations (actually getStations puts closest first usually?)
            // Wait, getStations logic: "指定された座標の周辺にある駅の情報を検索します。" returns list.
            // Usually we assume index 0 is closest.

            const station = data.response.station[0];
            return `${station.name}駅 ${station.distance}`;
        }

        return null;

    } catch (error) {
        console.error('[HeartRails] Fetch Error:', error);
        return null;
    }
}
