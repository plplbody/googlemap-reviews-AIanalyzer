module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

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
        __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["firestore"]().settings({
            ignoreUndefinedProperties: true
        });
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin__$5b$external$5d$__$28$firebase$2d$admin$2c$__cjs$29$__["firestore"]();
}
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
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

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
        // 3. Prepare Detailed Info Context
        const detailedInfo = placeData.detailedInfo || {};
        const detailedInfoText = JSON.stringify(detailedInfo, null, 2);
        // 4. Call Gemini API
        const prompt = `
      Analyze the following reviews for a restaurant and provide scores (0-5) for Taste, Service, Atmosphere, and Cost.
      Also calculate a "True Score" (AI Analysis Score / AI分析スコア) which is a weighted average based on sentiment reliability, and a brief summary.
      
      **CRITICAL INSTRUCTION: The output JSON content MUST BE WRITTEN IN JAPANESE.**

      **Detailed Place Information (Basic Info Tab):**
      ${detailedInfoText}

      **IMPORTANT RULES FOR SCORING:**
      1. **NO PRIOR KNOWLEDGE**: Do NOT use any external knowledge about this brand or place. Rely ONLY on the provided reviews and the "Detailed Place Information".
      2. **EVIDENCE BASED**: If the reviews do not contain specific information about an axis (e.g., Cost), you MUST assign a score of **3 (Neutral)**. Do not guess.
      3. **STRUCTURED REVIEWS ONLY**: Focus on the logic and reasoning in the reviews. Ignore emotional outbursts without context.
      4. **USE DETAILED INFO**: Use the "Detailed Place Information" to refine your scores and usage analysis based on the following logic:
         
         | Category | Field | Value | Impact on Axis | Impact on Usage |
         | :--- | :--- | :--- | :--- | :--- |
         | **Service** | \`reservable\` | \`true\` | **Service +**: Convenience | **Business/Date +**: Essential. **Group ++**: Vital for organizer. **Solo -**: Hard to enter? |
         | | \`delivery\` / \`takeout\` | \`true\` | **Service +**: Flexibility | **Date -**: If delivery-focused. |
         | | \`paymentOptions\` | \`Cash Only\` | **Service -**: Inconvenient | **Business/Group -**: Payment friction. |
         | | | \`Credit / Digital\` | **Service +**: Convenient | **Business/Group +**: Smooth payment. |
         | **Food/Drink** | \`servesBreakfast\` | \`true\` | | **Solo +**: Easy entry. |
         | | \`servesLunch\` | \`true\` | **Cost**: Good Value? | **Solo/Family +**: Casual. **Group +**: Lunch gathering. |
         | | \`servesDinner\` | \`true\` | | **Date/Business/Group +**: Main use case. |
         | | \`servesWine\` / \`Beer\` | \`true\` | **Atmosphere +**: Dinner vibe | **Date/Business +**. **Group +**: Drinking party. **Family -**: If Bar-like. |
         | **Amenities** | \`goodForChildren\` | \`true\` | | **Family ++**: Critical. **Business/Date -**: Noise risk. |
         | | \`goodForGroups\` | \`true\` | **Atmosphere**: Lively | **Group ++**: Best fit. **Business +**: Team dinner. **Date -**: Not intimate. |
         | | \`restroom\` | \`true\` | **Service +**: Basic comfort | **Group +**: Essential for long stay. |
         | **Price** | \`priceLevel\` | \`High\` | **Cost -**: Expensive | **Business/Date +**: Luxurious. **Group -**: Not for casual. |
         | | | \`Low\` | **Cost +**: Cheap | **Solo/Student +**. **Business/Date -**: Too casual? |

         **Strictly apply this logic.** If a field is explicitly \`false\`, do NOT apply the positive impact. If \`undefined\`, ignore.

      Additionally, provide the following detailed insights:
      **CRITICAL: NATURAL LANGUAGE ONLY**
      - **NEVER** use raw variable names (e.g., "goodForChildren", "reservable", "true", "false") in your JSON output strings.
      - **ALWAYS** paraphrase into natural Japanese.
      - Example: "goodForChildren: false" -> "子供連れには向かない可能性があります" or "子供向けの設備は明記されていません".
      - Example: "reservable: true" -> "予約可能です".
      - Example: "goodForGroups: Lively" -> "団体利用に適した活気ある雰囲気".
      - This applies to \`usageSummary\`, \`gapReason\`, \`summary\`, and \`axisAnalysis\` (pros/cons).

      1. "gapReason": Explain why the "AI分析スコア" (True Score) might differ from a typical average rating. Use the term "AI分析スコア" in your explanation, NOT "True Score".
      2. "axisAnalysis": For EACH axis (taste, service, atmosphere, cost), provide:
         - "pros": A list of positive points (strings).
         - "cons": A list of negative points (strings).
         - "summary": A brief summary string.

      Evaluate the suitability (0-5) for the following scenarios based on the reviews AND detailed info:
      - Business (接待・会食): Is it quiet? Good service? Private rooms? Reservable?
      - Date (デート): Romantic? Good ambiance? Serves wine?
      - Solo (お一人様): Counter seats? Easy to enter alone?
      - Family (家族連れ): Kids friendly? Spacious? Good for children?
      - Group (団体利用): Reservable? Good for groups? Spacious?

      Also provide a "usageSummary" (string): A brief explanation of why these usage scores were assigned, BASED STRICTLY ON THE REVIEWS AND DETAILED INFO.
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
          "family": number,
          "group": number
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

/* __next_internal_action_entry_do_not_use__ [{"40432db7ac9dada39e81ca58c7626c6d95dc44f068":"searchAndAnalyze","605879696842d3dfb20127da930290d765080fe8ed":"searchPlaces"},"",""] */ __turbopack_context__.s([
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
            'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,reviews,priceLevel,priceRange,paymentOptions,delivery,takeout,dineIn,reservable,servesBeer,servesWine,servesVegetarianFood,servesCoffee,servesBreakfast,servesLunch,servesDinner,goodForChildren,goodForGroups,restroom,accessibilityOptions'
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
            detailedInfo: {
                paymentOptions: data.paymentOptions,
                serviceOptions: {
                    delivery: data.delivery,
                    takeout: data.takeout,
                    dineIn: data.dineIn,
                    reservable: data.reservable
                },
                offerings: {
                    servesBeer: data.servesBeer,
                    servesWine: data.servesWine,
                    servesVegetarianFood: data.servesVegetarianFood,
                    servesCoffee: data.servesCoffee
                },
                diningOptions: {
                    servesBreakfast: data.servesBreakfast,
                    servesLunch: data.servesLunch,
                    servesDinner: data.servesDinner
                },
                amenities: {
                    restroom: data.restroom,
                    goodForChildren: data.goodForChildren,
                    goodForGroups: data.goodForGroups
                }
            },
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
async function searchPlacesIdOnly(query) {
    console.log(`Searching places (ID only) for: ${query}`);
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
                'X-Goog-FieldMask': 'places.id'
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'ja',
                maxResultCount: 20
            })
        });
        if (!response.ok) {
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.places?.map((p)=>p.id) || [];
    } catch (error) {
        console.error('Failed to search places (ID only):', error);
        return [];
    }
}
async function searchPlaces(query, pageToken) {
    console.log(`Searching places list for: ${query}, pageToken: ${pageToken ? 'Yes' : 'No'}`);
    try {
        // 1. ID Search (Free) - Skip if paging
        // Pagination usually implies we skip the efficient ID-only check because we can't easily map pages to IDs without fetching.
        // Also, cache logic is complex with pagination.
        // For simplicity: If pageToken is present, go straight to API.
        // If no pageToken, we can TRY cache, but we need to know if we have *all* results?
        // Actually, the previous cache logic was "If we have ALL 20 IDs in cache".
        // Now valid for first page.
        let placeIds = [];
        // Only do ID search for first page to check cache
        if (!pageToken) {
            placeIds = await searchPlacesIdOnly(query);
            if (placeIds.length === 0 && !pageToken) return {
                places: []
            };
            // 2. Check Cache (Only for first page)
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])();
            const placesRef = db.collection('places');
            const cachedPlaces = [];
            let allCached = true;
            for (const id of placeIds){
                const doc = await placesRef.doc(id).get();
                if (doc.exists) {
                    const data = doc.data();
                    // Check expiration (30 days)
                    const now = new Date();
                    const updatedAt = data.updatedAt ? data.updatedAt.toDate() : new Date(0);
                    const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays <= 30 && data.status !== 'error') {
                        cachedPlaces.push({
                            id: data.id,
                            name: data.name,
                            rating: data.originalRating,
                            userRatingsTotal: data.userRatingsTotal,
                            vicinity: data.address
                        });
                    } else {
                        allCached = false;
                        break;
                    }
                } else {
                    allCached = false;
                    break;
                }
            }
        // 3. Conditional Return (Only if all cached and no page token needed logic?)
        // If we have cached data for the top 20, we return them.
        // Converting cache hits to a "Next Page" capable response is tricky because we don't have the nextPageToken from the original API call stored.
        // If we return cached data, the user CANNOT load more because we don't have the token.
        // ERROR: Using cache breaks pagination?
        // "Load More" relies on Google's `nextPageToken`. Reviewing flow:
        // Query -> Google API -> Returns items + Token.
        // If we satisfy from Cache, we DON'T have the Token.
        // So if we use Cache, "Load More" is impossible unless we re-fetch from API using the original query?
        // Compromise: If we return cached results, we set `nextPageToken` to null.
        // If the user wants "More", they might be stuck?
        // Actually, if the cache has 20 items, and we show 20 items...
        // User says "Load More". We don't have token.
        // We'd have to trigger a NEW search (API) skipping the first 20? No, Google API doesn't support "offset".
        // So, if we want to support "Load More", we MUST fetch from API to get the token, OR we accept that "Cached results have no next page".
        // Since the user EXPLICITLY requested "More", we should prioritize API token availability if possible, OR just disable cache for now to ensure feature works?
        // Or, we return cached results, but if user clicks "More" (which won't exist?), they can't.
        // Let's Disable Cache for now to ensure Pagination works correctly as per user request.
        // Or only disable cache if we expect more than 20 results? We don't know.
        // Disabling cache for Search List is safer for this feature.
        // NOTE: Caching currently disabled for direct search to ensure PAGINATION works (needs fresh nextPageToken).
        }
        console.log('Fetching fresh data from API...');
        // 4. Fallback to Full Search (Pro)
        const auth = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleAuth"]({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const token = await client.getAccessToken();
        const requestBody = {
            textQuery: query,
            languageCode: 'ja',
            maxResultCount: 20
        };
        if (pageToken) {
            requestBody.pageToken = pageToken;
        }
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.reviews,places.priceLevel,places.priceRange,places.paymentOptions,places.delivery,places.takeout,places.dineIn,places.reservable,places.servesBeer,places.servesWine,places.servesVegetarianFood,places.servesCoffee,places.servesBreakfast,places.servesLunch,places.servesDinner,places.goodForChildren,places.goodForGroups,places.restroom,places.accessibilityOptions,nextPageToken'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google Places API Error:', errorText);
            throw new Error(`Google Places API Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.places) {
            return {
                places: []
            };
        }
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFirestore"])(); // Ensure DB is initialized
        const placesRef = db.collection('places');
        const batch = db.batch();
        const results = [];
        for (const placeData of data.places){
            const reviews = placeData.reviews?.map((r)=>r.text?.text).filter(Boolean) || [];
            // Construct full Place object to cache
            // Use Partial<Place> to avoid 'missing property' errors when we deliberately omit 'status' to preserve it
            const newPlace = {
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                address: placeData.formattedAddress,
                originalRating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                ...placeData.priceLevel ? {
                    priceLevel: placeData.priceLevel
                } : {},
                ...placeData.priceRange ? {
                    priceRange: placeData.priceRange
                } : {},
                reviews: reviews,
                detailedInfo: {
                    paymentOptions: placeData.paymentOptions,
                    serviceOptions: {
                        delivery: placeData.delivery,
                        takeout: placeData.takeout,
                        dineIn: placeData.dineIn,
                        reservable: placeData.reservable
                    },
                    offerings: {
                        servesBeer: placeData.servesBeer,
                        servesWine: placeData.servesWine,
                        servesVegetarianFood: placeData.servesVegetarianFood,
                        servesCoffee: placeData.servesCoffee
                    },
                    diningOptions: {
                        servesBreakfast: placeData.servesBreakfast,
                        servesLunch: placeData.servesLunch,
                        servesDinner: placeData.servesDinner
                    },
                    amenities: {
                        restroom: placeData.restroom,
                        goodForChildren: placeData.goodForChildren,
                        goodForGroups: placeData.goodForGroups
                    }
                },
                updatedAt: new Date()
            };
            // Prepare for return
            results.push({
                id: placeData.id,
                name: placeData.displayName?.text || 'Unknown',
                rating: placeData.rating || 0,
                userRatingsTotal: placeData.userRatingCount || 0,
                vicinity: placeData.formattedAddress
            });
            const ref = placesRef.doc(placeData.id);
            // Use merge: true to update existing docs without wiping other fields
            batch.set(ref, newPlace, {
                merge: true
            });
        }
        await batch.commit();
        // Fire-and-forget analysis for items needing it
        (async ()=>{
            const refs = results.map((r)=>placesRef.doc(r.id));
            if (refs.length === 0) return;
            try {
                const snapshots = await db.getAll(...refs);
                for (const snap of snapshots){
                    const d = snap.data();
                    // Trigger if:
                    // 1. Status is MISSING (new)
                    // 2. OR Status is 'error'
                    // 3. We do NOT re-trigger if 'pending', 'processing', 'completed'.
                    if (!d.status || d.status === 'error') {
                        console.log(`Triggering analysis for ${d.id}`);
                        // Set status to pending to prevent double-queueing? 
                        // Ideally yes, but fire-and-forget.
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queue$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["enqueueAnalysis"])(d.id).catch((e)=>console.error(`Failed to enqueue ${d.id}`, e));
                    }
                }
            } catch (e) {
                console.error("Error checking status for analysis trigger", e);
            }
        })();
        return {
            places: results,
            nextPageToken: data.nextPageToken
        };
    } catch (error) {
        console.error('Failed to search places:', error);
        return {
            places: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    searchAndAnalyze,
    searchPlaces
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchAndAnalyze, "40432db7ac9dada39e81ca58c7626c6d95dc44f068", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchPlaces, "605879696842d3dfb20127da930290d765080fe8ed", null);
}),
"[project]/src/server/actions/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00ed017af06828ff862996b1649f3d8a7bb72057e6":"getGoogleMapsApiKey"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGoogleMapsApiKey, "00ed017af06828ff862996b1649f3d8a7bb72057e6", null);
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
    "00ed017af06828ff862996b1649f3d8a7bb72057e6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGoogleMapsApiKey"],
    "40432db7ac9dada39e81ca58c7626c6d95dc44f068",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchAndAnalyze"],
    "605879696842d3dfb20127da930290d765080fe8ed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchPlaces"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/server/actions/place.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/server/actions/config.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$place$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/place.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$actions$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/actions/config.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18ca7d4d._.js.map