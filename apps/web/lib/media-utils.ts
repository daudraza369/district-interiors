/**
 * Client-safe media utility functions
 * These can be used in both server and client components
 */

// Helper to get image URL from Payload media object (client-safe)
export function getImageUrl(image: any): string | null {
  if (!image) return null;
  
  // Payload media object can be a string (ID) or an object with url property
  if (typeof image === 'string') return null;
  if (image.url) {
    // If url is absolute, return as-is; otherwise prepend server URL
    if (image.url.startsWith('http')) {
      return image.url;
    }
    // For relative URLs, we need the base URL - try to get from env or use current origin
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : (process.env.NEXT_PUBLIC_APP_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000');
    return `${baseUrl}${image.url}`;
  }
  return null;
}

// Helper for media URL (same as image URL)
export function getMediaUrl(media: any): string | null {
  return getImageUrl(media);
}

// Helper to check if media is video
export function isVideo(media?: any): boolean {
  if (!media) return false;
  if (media.mime) return media.mime.startsWith('video/');
  return false;
}

