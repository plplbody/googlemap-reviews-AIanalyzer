import { Place } from "@/types/schema";

interface JsonLdProps {
    type: 'WebSite' | 'Restaurant' | 'ItemList';
    data?: any;
    place?: Place;
    places?: Place[];
    query?: string;
}

export default function JsonLd({ type, data, place, places, query }: JsonLdProps) {
    let schema = null;

    if (type === 'WebSite') {
        schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AI Concierge for グルメ",
            "url": "https://googlemap-reviews-analyzer.vercel.app/", // TODO: Update with real URL
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://googlemap-reviews-analyzer.vercel.app/?q={search_term_string}&view=LIST"
                },
                "query-input": "required name=search_term_string"
            }
        };
    } else if (type === 'Restaurant' && place) {
        schema = {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": place.name,
            "image": place.hotpepper?.imageUrl ? [place.hotpepper.imageUrl] : [],
            "address": place.address,
            "aggregateRating": place.originalRating ? {
                "@type": "AggregateRating",
                "ratingValue": place.originalRating,
                "reviewCount": place.userRatingsTotal
            } : undefined,
            "priceRange": place.priceLevel || "¥¥",
            "description": place.summary ? (Array.isArray(place.summary) ? place.summary.join(' ') : place.summary) : undefined,
            "telephone": place.hotpepper?.id ? undefined : undefined // Add phone if available in secure way
        };
    } else if (type === 'ItemList' && places) {
        schema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": query ? `Top Restaurants for "${query}"` : "Top Restaurants",
            "itemListElement": places.map((p, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Restaurant",
                    "name": p.name,
                    "address": p.address
                }
            }))
        };
    }

    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
