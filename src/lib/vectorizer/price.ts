import { Place } from "@/types/schema";

/**
 * Calculates the Normalized Price Vector (-1.0 to 1.0)
 * Logic: Log-Normal Mapping based on Tokyo/Japan Restaurant Prices.
 * 
 * -1.0 : Very Cheap (~1,000 JPY)
 *  0.0 : Moderate (~4,500 JPY)
 * +1.0 : Expensive (~20,000 JPY+)
 */
export function calculatePriceVector(placeData: Partial<Place>): number {
    let representativePrice = 0;

    // 1. Try Price Range (Most Accurate)
    if (placeData.priceRange && placeData.priceRange.startPrice && placeData.priceRange.endPrice) {
        // Use average of start/end
        const start = parseInt(placeData.priceRange.startPrice.units || "0");
        const end = parseInt(placeData.priceRange.endPrice.units || "0");
        if (start > 0 && end > 0) {
            representativePrice = (start + end) / 2;
        }
    }

    // 2. Fallback to Price Level (Estimation)
    if (representativePrice === 0 && placeData.priceLevel) {
        switch (placeData.priceLevel) {
            case 'PRICE_LEVEL_INEXPENSIVE':
                representativePrice = 1000;
                break;
            case 'PRICE_LEVEL_MODERATE':
                representativePrice = 4000;
                break;
            case 'PRICE_LEVEL_EXPENSIVE':
                representativePrice = 10000;
                break;
            case 'PRICE_LEVEL_VERY_EXPENSIVE':
                representativePrice = 20000;
                break;
        }
    }

    // 3. Fallback if no data (Neutral)
    if (representativePrice === 0) {
        return 0.0;
    }

    // 4. Logarithmic Normalization Algorithm
    // Log10(1000) = 3.0
    // Log10(4500) = 3.653
    // Log10(20000) = 4.301
    // Range: [3.0, 4.3] -> Delta 1.3
    // Center: 3.65
    // Scale: +/- 0.65 covers the range 3.0 to 4.3

    const logPrice = Math.log10(representativePrice);
    const center = 3.65;
    const scale = 0.65;

    let vector = (logPrice - center) / scale;

    // Clamp to [-1.0, 1.0]
    if (vector > 1.0) vector = 1.0;
    if (vector < -1.0) vector = -1.0;

    return parseFloat(vector.toFixed(2));
}
