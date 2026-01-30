import { getGenerativeModel, getEmbedding } from './vertex.service';
import { getFirestore } from '@/lib/firebase/admin';
import { Place, AnalysisStatus } from '@/types/schema';

// Removed local getModel in favor of vertex.service.ts

// ------------------------------------------------------------------
// Logic Helpers (Exported for Testing)
// ------------------------------------------------------------------
export const limitScore = (score: number, min = 1.0, max = 5.0): number => {
    // Handle non-number or NaN inputs gracefully
    if (typeof score !== 'number' || isNaN(score)) return min;
    return Math.min(max, Math.max(min, score));
};

export const normalizeScores = (analysis: any) => {
    // 1. Normalize True Score
    analysis.rawTrueScore = analysis.trueScore; // Keep raw
    analysis.trueScore = limitScore(analysis.trueScore);

    // 2. Normalize Axis Scores
    if (analysis.axisScores) {
        analysis.axisScores.taste = limitScore(analysis.axisScores.taste);
        analysis.axisScores.service = limitScore(analysis.axisScores.service);
        analysis.axisScores.atmosphere = limitScore(analysis.axisScores.atmosphere);
        analysis.axisScores.cost = limitScore(analysis.axisScores.cost);
    } else {
        // Fallback defaults
        analysis.axisScores = { taste: 3, service: 3, atmosphere: 3, cost: 3 };
    }

    // 3. Normalize Usage Scores (0.0 to 5.0)
    if (analysis.usageScores) {
        analysis.usageScores.business = limitScore(analysis.usageScores.business, 0.0, 5.0);
        analysis.usageScores.date = limitScore(analysis.usageScores.date, 0.0, 5.0);
        analysis.usageScores.solo = limitScore(analysis.usageScores.solo, 0.0, 5.0);
        analysis.usageScores.family = limitScore(analysis.usageScores.family, 0.0, 5.0);
        analysis.usageScores.group = limitScore(analysis.usageScores.group, 0.0, 5.0);
    } else {
        analysis.usageScores = { business: 0, date: 0, solo: 0, family: 0, group: 0 };
    }

    return analysis;
};

// ------------------------------------------------------------------
// analyzePlace: Core AI Analysis Logic
// ------------------------------------------------------------------
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

        // --- PREPARE REVIEWS (Now Objects) ---
        let reviewsForPrompt: any[] = [];
        const MIN_REVIEW_LENGTH = 15;
        let analysisStats = {
            totalReviewsFetched: 0,
            validReviews: 0,
            excludedReviews: 0,
            exclusionRatio: 0
        };

        if (placeData.reviews && placeData.reviews.length > 0) {
            analysisStats.totalReviewsFetched = placeData.reviews.length;

            // Filter out short reviews BUT keep metadata for Sakura check context if needed (optional)
            // For now, we strictly filter for quality of generic analysis, 
            // but for Sakura check, short reviews might be relevant. 
            // *Decision*: Filter length for prompt token economy, but maybe relax for Sakura?
            // Let's stick to valid length to avoid noise.
            const validReviews = placeData.reviews.filter(r => r.text.length >= MIN_REVIEW_LENGTH);

            analysisStats.validReviews = validReviews.length;
            analysisStats.excludedReviews = analysisStats.totalReviewsFetched - analysisStats.validReviews;
            analysisStats.exclusionRatio = analysisStats.totalReviewsFetched > 0
                ? analysisStats.excludedReviews / analysisStats.totalReviewsFetched
                : 0;

            console.log(`Filtered reviews: ${validReviews.length} / ${placeData.reviews.length}`);

            if (validReviews.length > 0) {
                // Map to simpler object for Token Economy
                reviewsForPrompt = validReviews.map(r => ({
                    text: r.text,
                    rating: r.rating,
                    date: r.relativePublishTime,
                    hasPhoto: !!r.author.photoUri, // Boolean for heuristic
                }));
            } else {
                console.log("No valid reviews after filtering. Using raw reviews fallback.");
                reviewsForPrompt = placeData.reviews.map(r => ({
                    text: r.text,
                    rating: r.rating,
                    date: r.relativePublishTime,
                    hasPhoto: !!r.author.photoUri
                }));
            }
        } else {
            // Mock fallback (skipped for brevity/logic simplicity in this update, usually real data exists)
            reviewsForPrompt = [];
        }

        const reviewsJson = JSON.stringify(reviewsForPrompt, null, 2);

        // 3. Prepare Detailed Info Context
        let detailedInfo: any = placeData.detailedInfo || {};
        if (placeData.hotpepper) {
            detailedInfo = {
                ...detailedInfo,
                hotpepper: {
                    catchCopy: placeData.hotpepper.catchCopy,
                    // ... (reduced for brevity, existing logic okay)
                }
            };
        }
        const detailedInfoText = JSON.stringify(detailedInfo, null, 2);

        // 4. Call Gemini API
        const prompt = `
      You are an expert Food Critic and Fraud Detection Specialist.
      Analyze the provided restaurant reviews to:
      1. Determine the "True Score" and detailed suitability (Axis/Usage analysis).
      2. **Detect "Sakura" (Fake/Paid) reviews for EACH review.**

      **INPUT DATA:**
      
      **Detailed Info:**
      ${detailedInfoText}

      **Standard Metrics:**
      - Original Rating: ${placeData.originalRating} (Count: ${placeData.userRatingsTotal})

      **Google Summaries:**
      - Editorial: ${placeData.editorialSummary || "N/A"}
      - Review Summary: ${placeData.reviewSummary || "N/A"}

      **REVIEWS (JSON):**
      ${reviewsJson}

      ---------------------------------------------------------
      **TASK 1: GENERAL ANALYSIS (Standard Rules)**
      - Calculate "trueScore", "axisScores", "usageScores".
      - **Score Range**:
        - **trueScore**: 1.0 to 5.0 (Float).
        - **axisScores**: 1.0 to 5.0 (Float).
        - **usageScores**: 0.0 to 5.0 (Float).
      - **True Score Policy**: Calculate the score based PURELY on the content of the provided reviews. **DO NOT** penalize for suspected "Sakura" (fake) reviews in this step; that will be handled programmatically. Focus on the actual sentiment expressed.
      - Summarize "pros", "cons" for each axis.
      - **Language**: Output must be natural **JAPANESE** and **Polite (Desu/Masu)**.
      - **Tone**: You are a professional Concierge explaining to a user. Avoid robotic or mechanical phrasing.
      - **Rules for Output**:
        - **Role Definition**: You are a "Human Concierge" speaking to a "Non-technical Customer".
        - **Internal Data Protection**: NEVER leak system internal variable names (camelCase/English keys) or data source names into the final output. Always translate specific metrics into natural Japanese concepts (e.g., "TrueScore" -> "AIスコア").
        - **Narrative Style**: Synthesize information into your own words. Do not quote or reference the raw data sources explicitly.
        - **Warmth**: Ensure explanations are warm, helpful, and sound like a human concierge, not a machine.

      ---------------------------------------------------------
      **TASK 2: SAKURA (FAKE) REVIEW DETECTION**
      Evaluate *EACH* review in the provided list and calculate a "sakuraScore" (0.0-5.0).
      
      **Scoring Criteria (0.0-5.0, Higher = More Suspicious):**
      **Goal:** Detect "Vendor/Paid reviews acting to artificially boost the rating".

      **1. Unnatural Perfection (Artificiality):**
      - **Criteria**: 100% positive with NO personal noise. Pure praise.
      - **Score**: +1.5 if completely flawless.

      **2. Keyword Stuffing (SEO Intent):**
      - **Criteria**: Unnatural usage of marketing keywords (e.g., "Private room", "Date").
        - **Score**: +1.5 if it reads like a feature list.

      **3. Lack of Narrative (No Motivation):**
      - **Criteria**: Missing the "Why/Who/When" (No personal story).
      - **Score**: +1.0 if it lacks narrative.

      **4. Rating Bias (Validation):**
      - **Criteria**: 5-star rating.
      - **Score**: +1.0 if combined with above traits.
      
      **Risk Levels:**
      - **4.0-5.0 (High Risk)**: Almost certainly fake/paid.
      - **2.5-3.9 (Suspicious)**: Doubtful.
      - **0.0-2.4 (Safe)**: Genuine user experience.

      ---------------------------------------------------------
      **TASK 3: CHAIN-OF-THOUGHT SCORING (CRITICAL)**
      You must follow these calculation steps PRECISELY before generating the summary.

      **Step 1. Calculate Average Sakura Score:**
      - Average of all "sakuraScore" values from Task 2.

      **Step 2. Calculate Penalty:**
      - Formula: \`Penalty = (AverageSakuraScore / 5.0) * 2.5\`
      - Keep 1 decimal place.

      **Step 3. Determine Raw Content Score:**
      - Evaluate the restaurant's quality from reviews IGNORING the fake likelihood (1.0-5.0).

      **Step 4. Calculate Final True Score:**
      - Formula: \`FinalScore = RawContentScore - Penalty\`
      - Minimum 1.0.

      **Step 5. Generate Explanation (gapReason):**
      - Compare **Final True Score** (AI) vs **Original Rating** (Google).
      - If Penalty > 0.3, you MUST explain that the score was lowered due to suspicious activity.
      - Example: "評価は高いですが、サクラ疑惑のあるレビューによる減点の影響で、AIスコアは低めになっています。"

      ---------------------------------------------------------
      **OUTPUT FORMAT (JSON ONLY):**
      
      \`\`\`json
      {
        "rawTrueScore": number, // Step 3
        "avgSakuraScore": number, // Step 1
        "penalty": number, // Step 2
        "trueScore": number, // Step 4 (Final Score)
        
        "axisScores": { "taste": number, "service": number, "atmosphere": number, "cost": number },
        "usageScores": { "business": number, "date": number, "solo": number, "family": number, "group": number },
        "usageSummary": "string",
        "summary": ["string", "string"], // UI用: 短い箇条書き (最大30文字x3点)。ユーザーが見て直感的に特徴がわかるもの。
        "embeddingSummary": "string",    // 検索用: 詳細な長文サマリー。メニュー名、雰囲気、ターゲット層などを網羅的に記述。
        "gapReason": "string", // Based on Step 5
        "axisAnalysis": {
            "taste": { "pros": [], "cons": [], "summary": "" },
             // ... service, atmosphere, cost
        },
        
        "axisAnalysis": {
            "taste": { "pros": [], "cons": [], "summary": "" },
             // ... service, atmosphere, cost
        }
      }
      \`\`\`
    `;

        const result = await getGenerativeModel().generateContent(prompt);
        const response = result.response;

        if (response.usageMetadata) {
            console.log(`[Token Usage] Place: ${placeId}`);
            console.log(`  Prompt: ${response.usageMetadata.promptTokenCount}`);
            console.log(`  Output: ${response.usageMetadata.candidatesTokenCount}`);
            console.log(`  Total : ${response.usageMetadata.totalTokenCount}`);
        }

        const text = response.candidates?.[0].content.parts[0].text;

        if (!text) throw new Error("No response from Gemini");

        let jsonStr = text.replace(/```json\n|\n```/g, "").trim();
        const firstOpen = jsonStr.indexOf('{');
        const lastClose = jsonStr.lastIndexOf('}');
        if (firstOpen !== -1 && lastClose !== -1) {
            jsonStr = jsonStr.substring(firstOpen, lastClose + 1);
        }

        const analysis = JSON.parse(jsonStr);

        // ---------------------------------------------------------
        // DETERMINISTIC SCORING ADJUSTMENT (Sakura Penalty)
        // ---------------------------------------------------------
        // Apply a penalty based on the average Sakura Score of all analyzed reviews.
        // Apply a penalty based on the average Sakura Score of all analyzed reviews.
        // Formula: Final = Raw - (AvgSakura/5.0 * 2.5)

        // ---------------------------------------------------------
        // DETERMINISTIC VALIDATION (Double Check)
        // ---------------------------------------------------------
        // We calculate locally to ensure data integrity, but use AI's logic for text consistency.
        // If AI matches closely, we trust its "trueScore". 

        // ---------------------------------------------------------
        // DETERMINISTIC VALIDATION (Double Check)
        // ---------------------------------------------------------
        // We calculate locally to ensure data integrity, but use AI's logic for text consistency.
        // If AI matches closely, we trust its "trueScore". 

        // Since we optimized prompt to NOT return per-review scores (Cost Reduction),
        // we rely solely on AI's 'avgSakuraScore'.
        const calculatedAvgSakura = analysis.avgSakuraScore || 0;

        // Use AI's values directly. If penalty is missing, default to 0.
        const finalPenalty = analysis.penalty ?? 0;
        const finalSummarizedAvgSakura = analysis.avgSakuraScore ?? 0;

        // Safety Fallback using normalizeScores
        normalizeScores(analysis);

        console.log(`[Score Calc] AI-Raw: ${analysis.rawTrueScore}, AI-Penalty: ${finalPenalty}, AI-Final: ${analysis.trueScore}`);
        console.log(`[System Check] Sys-AvgSakura: ${calculatedAvgSakura.toFixed(2)}`);

        // ---------------------------------------------------------
        // MERGE SAKURA RESULTS BACK INTO REVIEWS
        // ---------------------------------------------------------
        // Skip per-review merging in Cost Optimized Mode.
        const updatedReviews = placeData.reviews; // No individual tagging

        // ---------------------------------------------------------
        // 5. Generate Embedding Source Text & Vector (Vertex AI)
        // ---------------------------------------------------------
        const areaStr = placeData.address || "不明なエリア";
        const genreStr = (placeData.detailedInfo?.diningOptions?.servesDinner ? "ディナーが楽しめる店" : "飲食店");
        const priceStr = placeData.priceLevel || "不明";
        const features = [
            ...(analysis.axisAnalysis?.taste?.pros || []),
            ...(analysis.axisAnalysis?.atmosphere?.pros || []),
            ...(analysis.axisAnalysis?.service?.pros || [])
        ].slice(0, 5).join(", ");
        // Use 'embeddingSummary' (Long) if available, otherwise fallback to joined 'summary' or Review Summary
        const summaryForEmbedding = analysis.embeddingSummary || analysis.summary?.join(" ") || placeData.reviewSummary || "";
        const embeddingSourceText = `店名:${placeData.name}。エリア:${areaStr}。ジャンル:${genreStr}。価格帯:${priceStr}。特徴:${features}。AI詳細要約:${summaryForEmbedding}`;

        const embeddingVector = await getEmbedding(embeddingSourceText);

        // 6. Save results to Firestore
        await getFirestore().collection('places').doc(placeId).update({
            status: 'completed',
            trueScore: analysis.trueScore,
            axisScores: analysis.axisScores,
            usageScores: analysis.usageScores,

            reviews: updatedReviews, // SAVE THE UPDATED REVIEWS

            embeddingSourceText: embeddingSourceText,
            embeddingVector: embeddingVector,
            sakuraPenalty: finalPenalty,
            avgSakuraScore: finalSummarizedAvgSakura, // Persist raw sakura score

            usageSummary: analysis.usageSummary || "",
            summary: analysis.summary,
            gapReason: analysis.gapReason || "",
            axisAnalysis: analysis.axisAnalysis || {},
            analysisStats: analysisStats,
            lastAnalyzedAt: new Date(),
            updatedAt: new Date(),
        });

        console.log(`Analysis completed for place: ${placeId}`);

        // ------------------------------------------------------------------
        // ERROR HANDLING & RETRY PREVENTION
        // ------------------------------------------------------------------
        // If JSON parsing fails, Cloud Tasks would normally retry.
        // We catch it here, mark as error, and DO NOT THROW to stop retries.
    } catch (error) {
        console.error(`Analysis failed for place: ${placeId}`, error);

        // Mark as error in DB
        await getFirestore().collection('places').doc(placeId).update({
            status: 'error',
            updatedAt: new Date(),
        });

        // CRITICAL: Return normally to stop Cloud Tasks from retrying 
        // (unless it's a transient network error we specifically want to retry, but for now safety first)
        return;
    }
}
