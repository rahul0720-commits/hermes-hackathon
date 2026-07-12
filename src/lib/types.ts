export type FUScore = {
  fuMeter: number;
  originalityScore: number;
  fuScore: number;
  verdict: string;
  suspectedPrompt?: string;
  breakdown: string[];
};

export type SearchResult = {
  phrase: string;
  foundAtUrl: string;
  similarity: number;
};

export type AnalyzeResponse = {
  success: boolean;
  textExtracted: boolean;
  length: number;
  phrases: string[];
  searchResults: SearchResult[];
  score: FUScore;
};

export type Roast = {
  id: string;
  contentText: string;
  sourceType: "text" | "youtube";
  sourceUrl?: string;
  creatorHandle?: string;
  score: FUScore;
  searchResults?: SearchResult[];
};
