export async function generateSlopScore(content: string, searchResults: Record<string, unknown>[], hermesApiKey: string) {
  const fallback = {
    aiSlopScore: 85,
    originalityScore: 20,
    fuScore: 90,
    verdict: "A perfect storm of LinkedIn hustle culture buzzwords.",
    breakdown: [
      "No API key provided, using fallback analysis.",
      "Detected high density of synthetic corporate jargon.",
      "Structures match boilerplate AI generation templates."
    ]
  };

  if (!hermesApiKey) {
    console.warn("No HERMES_API_KEY provided, returning fallback slop score.");
    return fallback;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${hermesApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a cynical, chain-smoking senior editor who hates LinkedIn hustle culture. You are an expert at detecting AI-generated content. Analyze the content and return a JSON object with: aiSlopScore (0-100), originalityScore (0-100), fuScore (0-100), verdict (savage 15-word sentence), breakdown (3 bullet points proving your score using structural evidence like 'Uses Delve 4 times')."
          },
          {
            role: "user",
            content: `Content to analyze:\n${content.substring(0, 4000)}\n\nOriginality Search Results:\n${JSON.stringify(searchResults, null, 2)}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
       console.warn(`generateSlopScore API error: ${response.status} ${response.statusText}`);
       return fallback;
    }

    const data = await response.json();
    const contentText = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(contentText);
      return {
        aiSlopScore: typeof parsed.aiSlopScore === 'number' ? parsed.aiSlopScore : fallback.aiSlopScore,
        originalityScore: typeof parsed.originalityScore === 'number' ? parsed.originalityScore : fallback.originalityScore,
        fuScore: typeof parsed.fuScore === 'number' ? parsed.fuScore : fallback.fuScore,
        verdict: typeof parsed.verdict === 'string' ? parsed.verdict : fallback.verdict,
        breakdown: Array.isArray(parsed.breakdown) ? parsed.breakdown : fallback.breakdown
      };
    } catch (e) {
      console.error("Failed to parse generated slop score JSON:", e);
      return fallback;
    }
  } catch (error) {
    console.error("Error generating slop score:", error);
    return fallback;
  }
}
