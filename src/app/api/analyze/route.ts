import { NextResponse } from "next/server";
import { extractYouTubeTranscript } from "@/lib/youtube";
import { extractKeyPhrases, runOriginalityScan } from "@/lib/linkup";
import { generateSlopScore } from "@/lib/hermes";

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

    // Read API keys from environment
    const hermesApiKey = process.env.HERMES_API_KEY || process.env.OPENAI_API_KEY || "";
    const linkupApiKey = process.env.LINKUP_API_KEY || "";

    // Phase 3: LinkUp Originality Scan
    // 1. Extract Key Phrases
    const phrases = await extractKeyPhrases(textToAnalyze, hermesApiKey);

    // 2. Run Originality Scan
    const searchResults = await runOriginalityScan(phrases, linkupApiKey);

    // Phase 4: LLM Scoring Pipeline
    // 3. Generate Slop Score
    const scoreResult = await generateSlopScore(textToAnalyze, searchResults, hermesApiKey);

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
