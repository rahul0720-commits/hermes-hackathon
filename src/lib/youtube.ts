import { YoutubeTranscript } from 'youtube-transcript';

export async function extractYouTubeTranscript(url: string): Promise<string> {
  try {
    // Extract video ID from various YouTube URL formats
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Concatenate the text
    let fullText = transcript.map(t => t.text).join(' ');
    
    // Trim to 3000 chars
    if (fullText.length > 3000) {
      fullText = fullText.substring(0, 3000);
    }
    
    return fullText;
  } catch (error) {
    console.error("Error extracting YouTube transcript:", error);
    throw error;
  }
}