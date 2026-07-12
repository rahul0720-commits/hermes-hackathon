import { NextResponse } from "next/server";
import { extractYouTubeTranscript } from "@/lib/youtube";
import { extractKeyPhrases, runOriginalityScan } from "@/lib/linkup";
import { generateFUMeter } from "@/lib/hermes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contentText, sourceType, sourceUrl } = body;

    let textToAnalyze = contentText || "";

    if (sourceType === "youtube" && sourceUrl) {
      try {
        textToAnalyze = await extractYouTubeTranscript(sourceUrl);
      } catch (error: unknown) {
        return NextResponse.json(
          { error: "Failed to extract YouTube transcript", details: error instanceof Error ? error.message : "Unknown error" },
          { status: 400 }
        );
      }
    }

    if (!textToAnalyze) {
      return NextResponse.json(
        { error: "No content provided to analyze" },
        { status: 400 }
      );
    }

    // Phase 1.5: Semantic Deduplication Cache
    // If we were fully wired to the Convex backend in this route (e.g. using ConvexHttpClient), 
    // we would check if this exact textToAnalyze has already been roasted.
    // e.g. const existingRoast = await convex.query(api.roasts.findByText, { text: textToAnalyze });
    // if (existingRoast) return NextResponse.json({ ...existingRoast, cached: true });

    // Note to Frontend: To handle the long-running nature of this API, you should NOT block the 
    // user interface waiting for this single API call. Instead, the UX flow should be:
    // 1. FE: Call `createRoast` mutation on Convex (status: 'extracting_transcript') -> GET roastId
    // 2. FE: Fire this API route asynchronously in the background.
    // 3. FE: Subscribe to the Convex roast document. 
    // 4. BE (This Route): Update the Convex document status to 'scanning_plagiarism' -> 'scoring' -> 'scored'.
    // 5. FE: The UI reacts instantly to the Convex status changes.
    // * Currently this route is entirely synchronous. If you want true progress updates, 
    // install `convex` in the Next.js backend and patch the document at each step below.

    // Read API keys from environment
    const hermesApiKey = process.env.HERMES_API_KEY || process.env.OPENAI_API_KEY || "";
    const linkupApiKey = process.env.LINKUP_API_KEY || "";

    // Phase 3: LinkUp Originality Scan
    // 1. Extract Key Phrases
    const phrases = await extractKeyPhrases(textToAnalyze, hermesApiKey);

    // 2. Run Originality Scan
    const searchResults = await runOriginalityScan(phrases, linkupApiKey);

    // Phase 4: LLM Scoring Pipeline
    // 3. Generate FU Meter
    const scoreResult = await generateFUMeter(textToAnalyze, searchResults, hermesApiKey);

    return NextResponse.json({
      success: true,
      textExtracted: true,
      length: textToAnalyze.length,
      phrases,
      searchResults,
      score: scoreResult
    });

  } catch (error: unknown) {
    console.error("Analyze API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
