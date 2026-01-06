import { getGenerativeModel, getEmbedding } from './vertex.service';
import { getFirestore } from '@/lib/firebase/admin';
import { Place, AnalysisStatus } from '@/types/schema';

// Removed local getModel in favor of vertex.service.ts

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
      Analyze the following reviews for a restaurant and provide scores(0 - 5) for Taste, Service, Atmosphere, and Cost.
      Also calculate a "True Score"(AI Analysis Score / AI分析スコア) which is a weighted average based on sentiment reliability, and a detailed bullet - point summary.
      
      ** CRITICAL INSTRUCTION: The output JSON content MUST BE WRITTEN IN JAPANESE.**

      ** Detailed Place Information(Basic Info Tab):**
            ${detailedInfoText}

      ** IMPORTANT RULES FOR SCORING:**
            1. ** NO PRIOR KNOWLEDGE **: Do NOT use any external knowledge about this brand or place.Rely ONLY on the provided reviews and the "Detailed Place Information".
      2. ** EVIDENCE BASED **: If the reviews do not contain specific information about an axis(e.g., Cost), you MUST assign a score of ** 3(Neutral) **.Do not guess.
      3. ** STRUCTURED REVIEWS ONLY **: Focus on the logic and reasoning in the reviews.Ignore emotional outbursts without context.
      4. ** USE DETAILED INFO **: Use the "Detailed Place Information" to refine your scores and usage analysis.
         - ** Service **:
        - 'reservable': Convenient(Business / Date / Group +).
           - 'delivery' / 'takeout': Flexible.
           - 'paymentOptions': Cash only is negative for Business.
         - ** Food / Drink **:
            - 'servesLunch': Good value / Casual. 
           - 'servesWine' / 'Beer': Good for Dinner / Date / Group.
         - ** Amenities **:
            - 'goodForChildren' / 'serviceFlags.child': Critical for Family.
           - 'goodForGroups': Good for Group / Business.
           - 'restroom': Basic comfort.
           - 'privateRoom': Excellent for Business / Date / Group.
         - ** Price **:
            - High: Good for Luxury / Business, bad for Casual.
           - Low: Good for Solo / Student.

      **REQUIRED OUTPUT FIELDS & ANALYSIS:**

      **CRITICAL: NATURAL LANGUAGE ONLY**
      - **ALWAYS** paraphrase into natural Japanese (e.g., "reservable: true" -> "予約可能です").
      
      1. **"gapReason"**:
         - Explain why the "AI分析スコア" (True Score) might differ from a typical average rating.
         - Use the term "AI分析スコア" in your explanation, NOT "True Score".

      2. **"axisAnalysis"**:
         - For EACH axis (taste, service, atmosphere, cost), provide:
           - "pros": positive points list (strings).
           - "cons": negative points list (strings).
           - "summary": brief summary string.

      3. **"usageScores"**:
         - Evaluate suitability (0-5) for:
           - **Business (接待・会食)**: Quiet? Good service? Private rooms? Reservable?
           - **Date (デート)**: Romantic? Good ambiance? Wine?
           - **Solo (お一人様)**: Counter seats? Easy to enter?
           - **Family (家族連れ)**: Kids friendly? Spacious?
           - **Group (団体利用)**: Reservable? Spacious?

      4. **"usageSummary"**:
         - Brief explanation of scores based *strictly* on reviews/info.
         - Do NOT include your own opinion or negative inferences if not mentioned in the text.
      
      5. **"summary"**:
         - A concise summary of the place's characteristics.
         - **FORMAT**: JSON ARRAY of strings. Provide 3 to 5 key points.
         - Example: ["絶品の寿司がリーズナブルに楽しめる", "落ち着いた雰囲気でデートに最適", "予約必須の人気店"]

      **REVIEWS:**
      ${reviewsText}
      
      Output JSON format:
        \`\`\`json
      {
        "trueScore": number,
        "axisScores": { "taste": number, "service": number, "atmosphere": number, "cost": number },
        "usageScores": { "business": number, "date": number, "solo": number, "family": number, "group": number },
        "usageSummary": "string",
        "summary": ["string", "...", "string"],
        "gapReason": "string",
        "axisAnalysis": {
          "taste": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "service": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "atmosphere": { "pros": ["string"], "cons": ["string"], "summary": "string" },
          "cost": { "pros": ["string"], "cons": ["string"], "summary": "string" }
        },

      }
      \`\`\`
    `;

        const result = await getGenerativeModel().generateContent(prompt);
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

        // ---------------------------------------------------------
        // 5. Generate Embedding Source Text & Vector (Vertex AI)
        // ---------------------------------------------------------

        // Helper to safe join
        const safeJoin = (arr: string[] | undefined) => Array.isArray(arr) ? arr.join(", ") : "";

        // Construct natural language representation
        const areaStr = placeData.address || "不明なエリア";
        const genreStr = (placeData.detailedInfo?.diningOptions?.servesDinner ? "ディナーが楽しめる店" : "飲食店");
        const priceStr = placeData.priceLevel || "不明";

        // Collect pros as features
        const features = [
            ...(analysis.axisAnalysis?.taste?.pros || []),
            ...(analysis.axisAnalysis?.atmosphere?.pros || []),
            ...(analysis.axisAnalysis?.service?.pros || [])
        ].slice(0, 5).join(", ");

        const embeddingSourceText = `店名:${placeData.name}。エリア:${areaStr}。ジャンル:${genreStr}。価格帯:${priceStr}。特徴:${features}。AI評価要約:${analysis.summary}`;

        console.log(`Generating embedding for: ${embeddingSourceText.substring(0, 50)}...`);
        // Throw if fails, do not catch
        const embeddingVector = await getEmbedding(embeddingSourceText);

        // 6. Save results to Firestore
        await getFirestore().collection('places').doc(placeId).update({
            status: 'completed',
            trueScore: analysis.trueScore,
            axisScores: analysis.axisScores,
            usageScores: analysis.usageScores,

            // New Embedding Fields
            embeddingSourceText: embeddingSourceText,
            embeddingVector: embeddingVector,

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
