import { getGenerativeModel, getEmbedding } from './vertex.service';
import { getFirestore } from '@/lib/firebase/admin';
import { Place, AnalysisStatus } from '@/types/schema';

// Removed local getModel in favor of vertex.service.ts

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
      **OUTPUT FORMAT (JSON ONLY):**
      
      \`\`\`json
      {
        "trueScore": number,
        "axisScores": { "taste": number, "service": number, "atmosphere": number, "cost": number },
        "usageScores": { "business": number, "date": number, "solo": number, "family": number, "group": number },
        "usageSummary": "string",
        "usageSummary": "string",
        "summary": ["string", "string"], // UI用: 短い箇条書き (最大30文字x3点)。ユーザーが見て直感的に特徴がわかるもの。
        "embeddingSummary": "string",    // 検索用: 詳細な長文サマリー。メニュー名、雰囲気、ターゲット層などを網羅的に記述。
        "gapReason": "string",
        "axisAnalysis": {
            "taste": { "pros": [], "cons": [], "summary": "" },
            // ... service, atmosphere, cost
        },
        
        "reviewedReviews": [
            {
                "sakuraScore": number,
                "level": "safe" | "gray" | "danger",
                "reasons": ["string", "string"] // e.g., ["具体性なし", "プロフ画像なし", "宣伝口調"]
            }
        ]
      }
      \`\`\`
    `;

        const result = await getGenerativeModel().generateContent(prompt);
        const response = result.response;
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

        let avgSakuraScore = 0;
        if (analysis.reviewedReviews && analysis.reviewedReviews.length > 0) {
            const totalSakura = analysis.reviewedReviews.reduce((sum: number, r: any) => sum + (r.sakuraScore || 0), 0);
            avgSakuraScore = totalSakura / analysis.reviewedReviews.length;
        }

        const penalty = (avgSakuraScore / 5.0) * 2.5;
        const rawTrueScore = analysis.trueScore;
        // Ensure score doesn't drop below 1.0 (Google Rating minimum)
        analysis.trueScore = Math.max(1.0, Math.round((rawTrueScore - penalty) * 10) / 10);

        console.log(`[Score Calc] Raw: ${rawTrueScore}, AvgSakura: ${avgSakuraScore.toFixed(1)}, Penalty: -${penalty.toFixed(1)}, Final: ${analysis.trueScore}`);

        // ---------------------------------------------------------
        // MERGE SAKURA RESULTS BACK INTO REVIEWS
        // ---------------------------------------------------------
        // We need to map the analysis results back to the original full review objects
        // Assumption: The 'reviewedReviews' array corresponds 1:1 to 'reviewsForPrompt'.

        let updatedReviews: Place['reviews'] = [];
        if (placeData.reviews) {
            // We only analyzed 'validReviews'. We need to be careful with indexing.
            // Actually, it's safer to just iterate the 'validReviews' and merge.
            // For 'excludedReviews', we leave sakuraAnalysis undefined or set a default.

            let promptIndex = 0;
            const MIN_REVIEW_LENGTH = 15; // Re-declare for scope scope

            updatedReviews = placeData.reviews.map(r => {
                if (r.text.length >= MIN_REVIEW_LENGTH) {
                    // This review was analyzed
                    const result = analysis.reviewedReviews?.[promptIndex];
                    promptIndex++;

                    if (result) {
                        return {
                            ...r,
                            sakuraAnalysis: {
                                score: result.sakuraScore,
                                level: result.level,
                                reasons: result.reasons
                            }
                        };
                    }
                }
                return r; // Return as is if skipped or no result
            });
        }

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
            sakuraPenalty: penalty, // Persist penalty for personalized scoring
            avgSakuraScore: avgSakuraScore, // Persist raw sakura score for UI badges

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
