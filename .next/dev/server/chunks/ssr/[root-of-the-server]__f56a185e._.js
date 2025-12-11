module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/firebase-admin [external] (firebase-admin, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("firebase-admin", () => require("firebase-admin"));

module.exports = mod;
}),
"[project]/src/lib/firebase/admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFirestore",
    ()=>getFirestore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/firebase-admin [external] (firebase-admin, cjs)");
;
function getFirestore() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["apps"].length) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["initializeApp"]({
            credential: __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["credential"].applicationDefault()
        });
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["firestore"]();
}
}),
"[project]/src/server/services/analyzer.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzePlace",
    ()=>analyzePlace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2d$cloud$2f$vertexai$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google-cloud/vertexai/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/admin.ts [app-rsc] (ecmascript)");
;
;
// Initialize Vertex AI lazily
const getModel = ()=>{
    const vertexAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2d$cloud$2f$vertexai$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VertexAI"]({
        project: process.env.GOOGLE_CLOUD_PROJECT || 'demo-project',
        location: 'us-central1'
    });
    return vertexAI.getGenerativeModel({
        model: 'gemini-2.0-flash-001'
    });
};
async function analyzePlace(placeId) {
    console.log(`Starting analysis for place: ${placeId}`);
    try {
        // 1. Update status to processing
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])().collection('places').doc(placeId).update({
            status: 'processing',
            updatedAt: new Date()
        });
        // 2. Fetch reviews
        const doc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])().collection('places').doc(placeId).get();
        const placeData = doc.data();
        let reviewsText = "";
        const MIN_REVIEW_LENGTH = 15;
        let analysisStats = {
            totalReviewsFetched: 0,
            validReviews: 0,
            excludedReviews: 0,
            exclusionRatio: 0
        };
        if (placeData.reviews && placeData.reviews.length > 0) {
            analysisStats.totalReviewsFetched = placeData.reviews.length;
            // Filter out short reviews to focus on structured feedback
            const validReviews = placeData.reviews.filter((r)=>r.length >= MIN_REVIEW_LENGTH);
            analysisStats.validReviews = validReviews.length;
            analysisStats.excludedReviews = analysisStats.totalReviewsFetched - analysisStats.validReviews;
            analysisStats.exclusionRatio = analysisStats.totalReviewsFetched > 0 ? analysisStats.excludedReviews / analysisStats.totalReviewsFetched : 0;
            console.log(`Filtered reviews: ${validReviews.length} / ${placeData.reviews.length} (Min length: ${MIN_REVIEW_LENGTH})`);
            if (validReviews.length > 0) {
                reviewsText = validReviews.join("\n");
            } else {
                console.log("No valid reviews after filtering. Using raw reviews as fallback.");
                reviewsText = placeData.reviews.join("\n");
            // In fallback case, we consider all as valid for the prompt, but stats reflect the quality issue
            }
        } else {
            console.log("No real reviews found. Using mock reviews for fallback.");
            const mockReviews = [
                "The food was amazing, especially the sushi! But the service was a bit slow.",
                "Great atmosphere, loved the decor. A bit pricey though.",
                "Terrible experience. Rude staff and cold food.",
                "Best place in town for a date night. Quiet and romantic.",
                "Good value for money. Portions are huge.",
                "Perfect for a business dinner. Private rooms available and very attentive service.",
                "I went alone and felt very comfortable at the counter."
            ];
            reviewsText = mockReviews.join("\n");
        }
        // 3. Call Gemini API
        const prompt = `
      Analyze the following reviews for a restaurant and provide scores (0-5) for Taste, Service, Atmosphere, and Cost.
      Also calculate a "True Score" (AI Analysis Score / AI分析スコア) which is a weighted average based on sentiment reliability, and a brief summary.
      
      **CRITICAL INSTRUCTION: The output JSON content MUST BE WRITTEN IN JAPANESE.**

      **IMPORTANT RULES FOR SCORING:**
      1. **NO PRIOR KNOWLEDGE**: Do NOT use any external knowledge about this brand or place. Rely ONLY on the provided reviews.
      2. **EVIDENCE BASED**: If the reviews do not contain specific information about an axis (e.g., Cost), you MUST assign a score of **3 (Neutral)**. Do not guess.
      3. **STRUCTURED REVIEWS ONLY**: Focus on the logic and reasoning in the reviews. Ignore emotional outbursts without context.

      Additionally, provide the following detailed insights:
      1. "gapReason": Explain why the "AI分析スコア" (True Score) might differ from a typical average rating. Use the term "AI分析スコア" in your explanation, NOT "True Score".
      2. "axisAnalysis": For EACH axis (taste, service, atmosphere, cost), provide:
         - "pros": A list of positive points (strings).
         - "cons": A list of negative points (strings).
         - "summary": A brief summary string.

      Evaluate the suitability (0-5) for the following scenarios based on the reviews:
      - Business (接待・会食): Is it quiet? Good service? Private rooms?
      - Date (デート): Romantic? Good ambiance?
      - Solo (お一人様): Counter seats? Easy to enter alone?
      - Solo (お一人様): Counter seats? Easy to enter alone?
      - Family (家族連れ): Kids friendly? Spacious?
      
      Also provide a "usageSummary" (string): A brief explanation of why these usage scores were assigned, BASED STRICTLY ON THE REVIEWS.
      - Do NOT include your own opinion or negative inferences if not mentioned in the text.
      - If a specific scenario is not mentioned, do not comment on it.
      - Example: "Has private rooms suitable for business. Counter seats available." (Do NOT say "Not suitable for families" if reviews don't say so).
      
      Reviews:
      ${reviewsText}
      
      Output JSON format:
      {
        "trueScore": number,
        "axisScores": {
          "taste": number,
          "service": number,
          "atmosphere": number,
          "cost": number
        },
        "usageScores": {
          "business": number,
          "date": number,
          "solo": number,
          "family": number
        },
        "usageSummary": "string",
        "summary": "string",
        "gapReason": "string",
        "axisAnalysis": {
          "taste": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "service": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "atmosphere": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "cost": { "pros": ["string"], "cons": ["string"], "summary": "string" }
        }
      }
    `;
        const result = await getModel().generateContent(prompt);
        const response = result.response;
        const text = response.candidates?.[0].content.parts[0].text;
        if (!text) throw new Error("No response from Gemini");
        // Clean up markdown code blocks if present
        let jsonStr = text.replace(/```json\n|\n```/g, "");
        // Remove any leading/trailing whitespace
        jsonStr = jsonStr.trim();
        // Find the first '{' and last '}' to handle potential extra text
        const firstOpen = jsonStr.indexOf('{');
        const lastClose = jsonStr.lastIndexOf('}');
        if (firstOpen !== -1 && lastClose !== -1) {
            jsonStr = jsonStr.substring(firstOpen, lastClose + 1);
        }
        const analysis = JSON.parse(jsonStr);
        // 4. Save results to Firestore
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])().collection('places').doc(placeId).update({
            status: 'completed',
            trueScore: analysis.trueScore,
            axisScores: analysis.axisScores,
            usageScores: analysis.usageScores,
            usageSummary: analysis.usageSummary || "",
            summary: analysis.summary,
            gapReason: analysis.gapReason || "",
            axisAnalysis: analysis.axisAnalysis || {},
            analysisStats: analysisStats,
            lastAnalyzedAt: new Date(),
            updatedAt: new Date()
        });
        console.log(`Analysis completed for place: ${placeId}`);
    } catch (error) {
        console.error(`Analysis failed for place: ${placeId}`, error);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])().collection('places').doc(placeId).update({
            status: 'error',
            updatedAt: new Date()
        });
        throw error;
    }
}
}),
"[project]/src/lib/queue/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enqueueAnalysis",
    ()=>enqueueAnalysis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$services$2f$analyzer$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/services/analyzer.service.ts [app-rsc] (ecmascript)");
;
async function enqueueAnalysis(placeId) {
    const isDev = ("TURBOPACK compile-time value", "development") === 'development';
    if ("TURBOPACK compile-time truthy", 1) {
        console.log(`[Local] Enqueuing analysis for ${placeId} directly.`);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$services$2f$analyzer$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["analyzePlace"])(placeId);
        } catch (e) {
            console.error("Local analysis failed", e);
        }
    } else //TURBOPACK unreachable
    ;
}
}),
"[project]/src/server/actions/place.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4026175afd116980ff49212b23b51e5c602a2b34b4":"searchAndAnalyze","402676949e386eb465274f22e78aff102d604150ce":"searchPlaces"},"",""] */ __turbopack_context__.s([
    "searchAndAnalyze",
    ()=>searchAndAnalyze,
    "searchPlaces",
    ()=>searchPlaces
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/google-auth-library/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queue$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/queue/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function searchAndAnalyze(query) {
    console.log(`Analyzing place: ${query}`);
    const placeId = query; // In the new flow, query is the placeId
    const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])().collection('places').doc(placeId);
    const doc = await docRef.get();
    if (doc.exists) {
        const data = doc.data();
        console.log(`Place ${placeId} found. Status: ${data.status}`);
        // Check for expiration (30 days)
        const now = new Date();
        const updatedAt = data.updatedAt ? data.updatedAt.toDate() : new Date(0); // Handle Firestore Timestamp
        const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
            console.log(`Place ${placeId} data is expired (${diffDays} days old). Re-fetching...`);
        // Fall through to fetch logic
        } else if (data.status === 'error') {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queue$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["enqueueAnalysis"])(placeId);
            return placeId;
        } else {
            return placeId;
        }
    }
    // If we are here, it means either doc doesn't exist OR it's expired.
    // We need to fetch from Google Places API.
    console.log(`Fetching fresh data for place ${placeId}...`);
    try {
        const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleAuth"]({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();
        const baseUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=ja`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.token}`,
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,reviews,priceLevel,priceRange'
        };
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Details Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('API Response Data:', JSON.stringify(data, null, 2));
        // Extract reviews
        const reviews = data.reviews?.map((r)=>r.text?.text).filter(Boolean) || [];
        console.log(`Fetched reviews: ${reviews.length}`);
        const newPlace = {
            id: data.id,
            name: data.displayName?.text || 'Unknown',
            address: data.formattedAddress,
            originalRating: data.rating || 0,
            userRatingsTotal: data.userRatingCount || 0,
            ...data.priceLevel ? {
                priceLevel: data.priceLevel
            } : {},
            ...data.priceRange ? {
                priceRange: data.priceRange
            } : {},
            reviews: reviews,
            status: 'pending',
            createdAt: doc.exists ? doc.data().createdAt : new Date(),
            updatedAt: new Date()
        };
        await docRef.set(newPlace);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queue$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["enqueueAnalysis"])(placeId);
    } catch (error) {
        console.error('Failed to fetch place details:', error);
        throw error;
    }
    return placeId;
}
async function searchPlaces(query) {
    console.log(`Searching places list for: ${query}`);
    try {
        const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleAuth"]({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount'
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'ja',
                maxResultCount: 10
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.places) {
            return [];
        }
        return data.places.map((place)=>({
                id: place.id,
                name: place.displayName?.text || 'Unknown',
                rating: place.rating || 0,
                userRatingsTotal: place.userRatingCount || 0,
                vicinity: place.formattedAddress
            }));
    } catch (error) {
        console.error('Failed to search places:', error);
        // Fallback to empty list or rethrow depending on UX preference
        // For now, return empty list to avoid crashing UI
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    searchAndAnalyze,
    searchPlaces
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchAndAnalyze, "4026175afd116980ff49212b23b51e5c602a2b34b4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchPlaces, "402676949e386eb465274f22e78aff102d604150ce", null);
}),
"[project]/src/server/actions/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f18128d57cb9015a1bbd473d52a1a360522b1043":"getGoogleMapsApiKey"},"",""] */ __turbopack_context__.s([
    "getGoogleMapsApiKey",
    ()=>getGoogleMapsApiKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function getGoogleMapsApiKey() {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    console.log('getGoogleMapsApiKey called. Key exists:', !!key);
    if (!key) {
        console.warn('GOOGLE_MAPS_API_KEY is not set');
        return '';
    }
    return key;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getGoogleMapsApiKey
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGoogleMapsApiKey, "00f18128d57cb9015a1bbd473d52a1a360522b1043", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/actions/place.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/server/actions/config.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/place.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/config.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/actions/place.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/server/actions/config.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00f18128d57cb9015a1bbd473d52a1a360522b1043",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGoogleMapsApiKey"],
    "4026175afd116980ff49212b23b51e5c602a2b34b4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchAndAnalyze"],
    "402676949e386eb465274f22e78aff102d604150ce",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchPlaces"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/server/actions/place.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/server/actions/config.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/place.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/config.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f56a185e._.js.map