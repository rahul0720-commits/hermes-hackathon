export async function generateFUMeter(content: string, searchResults: Record<string, unknown>[], hermesApiKey: string) {
  const fallback = {
    fuMeter: 85,
    originalityScore: 20,
    fuScore: 90,
    verdict: "A perfect storm of LinkedIn hustle culture buzzwords.",
    suspectedPrompt: "Write a preachy post about leadership but use zero concrete examples.",
    breakdown: [
      "No API key provided, using fallback analysis.",
      "Detected high density of synthetic corporate jargon.",
      "Structures match boilerplate AI generation templates."
    ]
  };

  if (!hermesApiKey) {
    console.warn("No HERMES_API_KEY provided, returning fallback FU Meter.");
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
            content: `You are a cynical, chain-smoking senior editor who absolutely hates LinkedIn hustle culture, thought leaders, and ghostwritten generic content. You believe the best way to catch AI slop is with more AI slop. Your job is to analyze content and assign a "FU Meter" based on how likely it is to be AI-generated garbage.

CRITICAL RULES FOR SCORING (The "Geometric Quality Gate"):
1. The "Buzzword-to-Content Ratio" (BCR): Aggressively penalize the use of words like: "robust", "resilient", "enterprise-grade", "holistic", "delve", "fast-paced landscape", "synergy", "unlock your potential", "testament to".
2. Structural Penalties: Dock points for perfect 3-part listicles, opening paragraphs that hedge ("While opinions vary...", "It's important to note..."), and concluding paragraphs starting with "In conclusion", "Ultimately", or "At the end of the day".
3. AI Politeness & Perfection: If the grammar is suspiciously perfect, or it uses phrases like "hope this helps" or "feel free to", flag it. Humans make mistakes; AI is too competent.
4. "Smoking Guns": If the text reads like Claude laundering its own output, set the FU Meter extremely high (>90).

OUTPUT FORMAT:
You MUST return ONLY a valid JSON object with the following schema:
{
  "fuMeter": number (0-100, where 100 is maximum AI slop),
  "originalityScore": number (0-100, where 0 is entirely plagiarized/generic, use the search results as evidence),
  "fuScore": number (0-100, overall 'fuck you' / cringe rating of the content),
  "verdict": string (A savage, sarcastic one-line sentence, max 15 words. Example: "This reads like GPT-4 laundering a 2022 Medium article."),
  "suspectedPrompt": string (The exact, humiliating prompt the user probably typed to generate this garbage. Example: "Write a preachy 3-part listicle about B2B sales but make it sound like a deeply personal revelation."),
  "breakdown": string[] (Exactly 3 bullet points explicitly citing the structural violations found in the text. Example: "Used the word 'holistic' unironically in paragraph 2.")
}`
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
       console.warn(`generateFUMeter API error: ${response.status} ${response.statusText}`);
       return fallback;
    }

    const data = await response.json();
    const contentText = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(contentText);
      return {
        fuMeter: typeof parsed.fuMeter === 'number' ? parsed.fuMeter : fallback.fuMeter,
        originalityScore: typeof parsed.originalityScore === 'number' ? parsed.originalityScore : fallback.originalityScore,
        fuScore: typeof parsed.fuScore === 'number' ? parsed.fuScore : fallback.fuScore,
        verdict: typeof parsed.verdict === 'string' ? parsed.verdict : fallback.verdict,
        suspectedPrompt: typeof parsed.suspectedPrompt === 'string' ? parsed.suspectedPrompt : "Write a generic LinkedIn post about synergy.",
        breakdown: Array.isArray(parsed.breakdown) ? parsed.breakdown : fallback.breakdown
      };
    } catch (e) {
      console.error("Failed to parse generated FU Meter JSON:", e);
      return fallback;
    }
  } catch (error) {
    console.error("Error generating FU Meter:", error);
    return fallback;
  }
}
