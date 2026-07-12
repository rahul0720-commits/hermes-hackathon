export async function extractKeyPhrases(content: string, hermesApiKey: string): Promise<string[]> {
  if (!hermesApiKey) {
    console.warn("No HERMES_API_KEY provided, returning mock phrases.");
    return ["Mock distinctive claim 1", "Mock distinctive claim 2", "Mock distinctive claim 3"];
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${hermesApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast model
        messages: [
          {
            role: "system",
            content: "Extract 3–5 key claims or distinctive phrases from this content. Return ONLY a JSON object containing a 'phrases' key with an array of strings."
          },
          {
            role: "user",
            content: content.substring(0, 4000)
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      console.warn("LLM API failed, returning mock phrases.");
      return ["Mock distinctive claim 1", "Mock distinctive claim 2", "Mock distinctive claim 3"];
    }

    const data = await response.json();
    const contentText = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(contentText);
      if (parsed.phrases && Array.isArray(parsed.phrases)) {
        return parsed.phrases;
      }
      return ["Mock distinctive claim 1", "Mock distinctive claim 2", "Mock distinctive claim 3"];
    } catch (e) {
      console.error("Failed to parse key phrases JSON", e);
      return ["Mock distinctive claim 1", "Mock distinctive claim 2", "Mock distinctive claim 3"];
    }
  } catch (error) {
    console.error("Error extracting key phrases:", error);
    return ["Mock distinctive claim 1", "Mock distinctive claim 2", "Mock distinctive claim 3"];
  }
}

export async function runOriginalityScan(phrases: string[], linkupApiKey: string): Promise<Record<string, unknown>[]> {
  // Mocking the LinkUp API
  // In a real scenario, this would use linkupApiKey to authenticate against LinkUp API
  const results: Record<string, unknown>[] = [];
  const seenUrls = new Set<string>();

  for (let i = 0; i < phrases.length; i++) {
    const phrase = phrases[i];
    
    // If no key is provided, we still mock it to allow the frontend to work
    if (!linkupApiKey) {
      // Small simulated latency
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Mock response
    const mockUrl = `https://example.com/mock-source-${i % 3}`;
    if (!seenUrls.has(mockUrl)) {
      seenUrls.add(mockUrl);
      results.push({
        phrase,
        foundAtUrl: mockUrl,
        similarity: 0.75 + (Math.random() * 0.2), // Random similarity between 0.75 and 0.95
      });
    }
  }

  return results;
}
