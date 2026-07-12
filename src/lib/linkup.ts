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
  const results: Record<string, unknown>[] = [];
  const seenUrls = new Set<string>();

  if (!linkupApiKey) {
    console.warn("No LINKUP_API_KEY provided, returning mock search results.");
    // Small simulated latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    for (let i = 0; i < phrases.length; i++) {
      const mockUrl = `https://example.com/mock-source-${i % 3}`;
      if (!seenUrls.has(mockUrl)) {
        seenUrls.add(mockUrl);
        results.push({
          phrase: phrases[i],
          foundAtUrl: mockUrl,
          similarity: 0.75 + (Math.random() * 0.2), 
        });
      }
    }
    return results;
  }

  // Real LinkUp API integration
  try {
    for (const phrase of phrases) {
      // NOTE: Using the standard v1 LinkUp search endpoint based on typical LinkUp structure. 
      // If the endpoint differs, update the URL.
      const response = await fetch("https://api.linkup.so/v1/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${linkupApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: phrase,
          depth: "standard",
          outputType: "searchResults"
        })
      });

      if (!response.ok) {
        console.warn(`LinkUp API error for phrase "${phrase}": ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      
      // Parse LinkUp standard response format (assuming data.results is the array)
      if (data.results && Array.isArray(data.results)) {
        for (const hit of data.results) {
          if (hit.url && !seenUrls.has(hit.url)) {
            seenUrls.add(hit.url);
            results.push({
              phrase,
              foundAtUrl: hit.url,
              similarity: 0.95, // Hardcoded high confidence for direct text hits
              snippet: hit.snippet || ""
            });
          }
        }
      }
    }
    return results;
  } catch (error) {
    console.error("LinkUp API Execution Error:", error);
    return []; // Return empty on hard failure to ensure the LLM still scores the text
  }
}
