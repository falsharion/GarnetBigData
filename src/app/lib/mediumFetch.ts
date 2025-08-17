// lib/mediumFetch.ts
interface MediumArticle {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  thumbnail?: string;
  guid?: string;
}

export interface FormattedArticle {
  title: string;
  desc: string;
  date: string;
  reads: string;
  img: string;
  link: string;
  id: string;
}
// note 
// Input: **Photo from Ronnel Ramos on Unsplash** Not all your customers are the same...
// Output: Not all your customers are the same...

export const fetchLatestMediumArticles = async (
  count: number = 2
): Promise<FormattedArticle[]> => {
  try {
    // Get configuration from environment variables
    const mediumUsername = process.env.NEXT_PUBLIC_MEDIUM_USERNAME;
    const apiBaseUrl = process.env.NEXT_PUBLIC_MEDIUM_API_BASE_URL || 'https://api.rss2json.com/v1/api.json';
    const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_ARTICLE_IMAGE || '/default-article-image.jpg';

    if (!mediumUsername) {
      throw new Error('Medium username is not configured in environment variables');
    }

    const response = await fetch(
      `${apiBaseUrl}?rss_url=https://medium.com/feed/@${mediumUsername}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    
    if (!response.ok) throw new Error("Failed to fetch articles");
    
    const data = await response.json();
    if (!data.items?.length) return [];
    
    return data.items.slice(0, count).map((item: MediumArticle) => ({
      title: item.title,
      desc: cleanDescription(item.description),
      date: formatDate(item.pubDate),
      reads: calculateReadTime(item.description) || "5 min read",
      img: extractImageFromContent(item.description) || item.thumbnail || defaultImage,
      link: item.link,
      id: item.guid || item.link
    }));
  } catch (error) {
    console.error("Error fetching Medium articles:", error);
    throw error;
  }
};

// Helper functions
const cleanDescription = (html: string): string => {
  // Remove HTML tags first
  let text = html.replace(/<[^>]+>/g, "");
  
  // Remove Markdown formatting (**, *, etc.)
  text = text.replace(/\*\*/g, "");
  text = text.replace(/\*/g, "");
  text = text.replace(/#{1,6}\s/g, "");
  
  // Clean up extra whitespace and normalize line breaks
  text = text.replace(/\s+/g, " ").trim();
  
  // Remove photo attributions (more comprehensive patterns)
  text = text.replace(/Photo from [^.!?]*?on Unsplash[.!?]?\s*/gi, "");
  text = text.replace(/Image from [^.!?]*?on Unsplash[.!?]?\s*/gi, "");
  text = text.replace(/Photo by [^.!?]*?on Unsplash[.!?]?\s*/gi, "");
  text = text.replace(/Image by [^.!?]*?on Unsplash[.!?]?\s*/gi, "");
  
  // Remove photo attributions with URLs
  text = text.replace(/Photo from https?:\/\/[^\s]+\s*/gi, "");
  text = text.replace(/Image from https?:\/\/[^\s]+\s*/gi, "");
  text = text.replace(/Photo: https?:\/\/[^\s]+\s*/gi, "");
  text = text.replace(/Image: https?:\/\/[^\s]+\s*/gi, "");
  text = text.replace(/Source: https?:\/\/[^\s]+\s*/gi, "");
  
  // Remove other attribution patterns
  text = text.replace(/Photo credit: [^.!?]*[.!?]?\s*/gi, "");
  text = text.replace(/Image credit: [^.!?]*[.!?]?\s*/gi, "");
  text = text.replace(/\(Photo: [^)]*\)\s*/gi, "");
  text = text.replace(/\(Image: [^)]*\)\s*/gi, "");
  
  // Remove standalone attribution at the start
  text = text.replace(/^(Photo|Image|Source|Credit)(\s*[:;]\s*|\s+)[^.!?]*[.!?]?\s*/i, "");
  
  // Clean up any remaining whitespace
  text = text.replace(/\s+/g, " ").trim();
  
  // If text still starts with attribution-like content, try to find the first real sentence
  if (text.match(/^(Photo|Image|Source|Credit|By)\s/i)) {
    // Split by common sentence endings and take the first meaningful part
    const parts = text.split(/[.!?]+/);
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i].trim();
      if (part.length > 10 && !part.match(/^(Photo|Image|Source|Credit|By)\s/i)) {
        text = part;
        break;
      }
    }
  }
  
  // Final cleanup
  text = text.trim();
  
  // Ensure the text starts with a capital letter
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  return text.length > 150 ? `${text.substring(0, 150)}...` : text;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateReadTime = (text: string): string => {
  const cleanText = text.replace(/<[^>]+>/g, "");
  const words = cleanText.split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // Average reading speed
  return `${minutes} min${minutes > 1 ? 's' : ''} Read`;
};

const extractImageFromContent = (html: string): string | null => {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
};