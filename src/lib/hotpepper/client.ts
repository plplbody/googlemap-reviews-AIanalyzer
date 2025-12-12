import { HotPepperData } from '@/types/schema';

const HOTPEPPER_API_ENDPOINT = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';


// Raw API Response Types (Partial)
interface HotPepperResponse {
    results: {
        shop: HotPepperShop[];
        results_available: number;
    };
}

interface HotPepperShop {
    id: string;
    name: string;
    logo_image?: string;
    photo?: {
        pc?: {
            l?: string; // Large image
        };
    };
    urls?: {
        pc?: string;
    };
    station_name?: string;
    access?: string;
    catch?: string;
    budget?: {
        average?: string;
    };
    open?: string;
    lunch?: string; // "あり"
    midnight?: string; // "営業している"
    child?: string; // "お子様連れOK" etc
    pet?: string;
    parking?: string;
    barrier_free?: string;
    wifi?: string;
    course?: string;
    free_drink?: string;
    free_food?: string;
    private_room?: string;
    horigotatsu?: string;
    tatami?: string;
    card?: string;
    english?: string;
}

export async function searchHotPepperPlace(
    name: string,
    tel?: string
): Promise<HotPepperData | null> {
    const apiKey = process.env.HOTPEPPER_API_KEY;
    if (!apiKey) {
        console.warn('HOTPEPPER_API_KEY is not set');
        return null;
    }

    try {
        let shops: HotPepperShop[] = [];

        // Strategy 1: Search by TEL (Most accurate)
        if (tel) {
            // HotPepper API requires numbers only, no hyphens
            const cleanTel = tel.replace(/[^0-9]/g, '');
            if (cleanTel.length >= 9) { // Basic validation
                const params = new URLSearchParams({
                    key: apiKey,
                    tel: cleanTel,
                    format: 'json',
                    count: '1'
                });
                const url = `${HOTPEPPER_API_ENDPOINT}?${params.toString()}`;
                console.log(`[HotPepper] Fetching (TEL): ${cleanTel}`);
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json() as HotPepperResponse;
                    if (data.results.shop && data.results.shop.length > 0) {
                        shops = data.results.shop;
                    } else {
                        console.log('[HotPepper] No shops found in response.');
                    }
                } else {
                    console.log('[HotPepper] Response NOT OK:', res.status, res.statusText);
                }
            }
        }

        // Strategy 2: Search by Name (Fallback if TEL fails or not provided)
        if (shops.length === 0 && name) {
            console.log(`[HotPepper] Fallback to Name Search: ${name}`);
            const params = new URLSearchParams({
                key: apiKey,
                keyword: name, // generic keyword search often works better than 'name' for variations
                format: 'json',
                count: '1' // Get top match
            });
            const url = `${HOTPEPPER_API_ENDPOINT}?${params.toString()}`;
            const res = await fetch(url);

            if (res.ok) {
                const data = await res.json() as HotPepperResponse;
                if (data.results.shop && data.results.shop.length > 0) {
                    shops = data.results.shop;
                }
            } else {
                console.log('[HotPepper] Name Search Response NOT OK:', res.status);
            }
        }

        // Return null if no shops found
        if (shops.length === 0) return null;

        const shop = shops[0];

        // Map to Schema
        const data: HotPepperData = {
            id: shop.id,
            name: shop.name,
            url: shop.urls?.pc || '',
            imageUrl: shop.photo?.pc?.l,
            station: shop.station_name,
            access: shop.access,
            catchCopy: shop.catch,
            budgetAverage: shop.budget?.average,

            // Flags
            hasLunch: shop.lunch,
            hasMidnight: shop.midnight,
            hasChild: shop.child,
            hasPet: shop.pet,
            hasParking: shop.parking,
            hasBarrierFree: shop.barrier_free,
            hasWifi: shop.wifi,
            hasCourse: shop.course,
            hasFreeDrink: shop.free_drink,
            hasFreeFood: shop.free_food,
            hasPrivateRoom: shop.private_room,
            hasTatami: shop.tatami,
            hasHorigotatsu: shop.horigotatsu,
            hasCard: shop.card,
            hasEnglish: shop.english
        };

        return data;

    } catch (error) {
        console.error('HotPepper API Error:', error);
        return null; // Fail gracefully
    }
}
