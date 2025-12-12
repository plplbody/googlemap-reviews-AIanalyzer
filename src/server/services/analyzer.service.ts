import { VertexAI } from '@google-cloud/vertexai';
import { getFirestore } from '@/lib/firebase/admin';
import { Place, AnalysisStatus } from '@/types/schema';

// Initialize Vertex AI lazily
const getModel = () => {
    const vertexAI = new VertexAI({
        project: process.env.GOOGLE_CLOUD_PROJECT || 'demo-project',
        location: 'us-central1'
    });
    return vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
};

export async function analyzePlace(placeId: string): Promise<void> {
    console.log(`Starting analysis for place: ${placeId}`);

    try {
        // 1. Update status to processing
        await getFirestore().collection('places').doc(placeId).update({
            status: 'processing',
            updatedAt: new Date(),
        });

        // 2. Fetch reviews
        const doc = await getFirestore().collection('places').doc(placeId).get();
        const placeData = doc.data() as Place;

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
            const validReviews = placeData.reviews.filter(r => r.length >= MIN_REVIEW_LENGTH);

            analysisStats.validReviews = validReviews.length;
            analysisStats.excludedReviews = analysisStats.totalReviewsFetched - analysisStats.validReviews;
            analysisStats.exclusionRatio = analysisStats.totalReviewsFetched > 0
                ? analysisStats.excludedReviews / analysisStats.totalReviewsFetched
                : 0;

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
        let detailedInfo: any = placeData.detailedInfo || {};

        // Merge HotPepper Data if available
        if (placeData.hotpepper) {
            detailedInfo = {
                ...detailedInfo,
                hotpepper: {
                    catchCopy: placeData.hotpepper.catchCopy,
                    station: placeData.hotpepper.station,
                    serviceFlags: {
                        lunch: placeData.hotpepper.hasLunch,
                        midnight: placeData.hotpepper.hasMidnight,
                        child: placeData.hotpepper.hasChild,
                        privateRoom: placeData.hotpepper.hasPrivateRoom,
                        tatami: placeData.hotpepper.hasTatami,
                        card: placeData.hotpepper.hasCard,
                        parking: placeData.hotpepper.hasParking
                    }
                }
            };
        }

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

         | | | \`Credit / Digital\` | **Service +**: Convenient | **Business/Group +**: Smooth payment. |
         | **HotPepper** | \`hotpepper.serviceFlags.child\` | \`お子様連れ歓迎\` (or similar) | | **Family ++**: Verified Welcome. |
         | | \`hotpepper.serviceFlags.privateRoom\` | \`あり\` | **Service +**: Privacy | **Business/Date/Group ++**: Strong verified amenity. |
         | | \`hotpepper.serviceFlags.parking\` | \`あり\` | | **Family/Group +**: Great for car access. |
         | | \`hotpepper.catchCopy\` | (Content) | **Taste/Atmosphere**: Use this text as EVIDENCE of store's intent/quality. | |

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
        await getFirestore().collection('places').doc(placeId).update({
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
            updatedAt: new Date(),
        });

        console.log(`Analysis completed for place: ${placeId}`);

    } catch (error) {
        console.error(`Analysis failed for place: ${placeId}`, error);
        await getFirestore().collection('places').doc(placeId).update({
            status: 'error',
            updatedAt: new Date(),
        });
        throw error;
    }
}
