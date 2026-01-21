import { isValidArea, isValidScene, PREFECTURES, CITIES, SCENES } from '@/constants/seo-areas';

export function validateRankingParams(prefecture: string, city?: string, scene?: string): boolean {
    if (!city && !scene) {
        // Directory Page: Validate prefecture only
        return PREFECTURES.some(p => p.id === prefecture);
    }
    if (city && scene) {
        // Ranking Page: Validate all
        return isValidArea(prefecture, city) && isValidScene(scene);
    }
    // Contexts like /rankings/tokyo/shinjuku are not supported (should match [prefecture] directory or lead to 404 in [...slug])
    // But since [...slug] catches everything, we might need to be careful.
    // However, L-16 spec says "Allowlist check".
    return false;
}

export function generateStaticParams() {
    // Return empty array to generate pages on-demand (ISR)
    // Generating 50,000+ pages statically is too heavy for build time.
    return [];
}
