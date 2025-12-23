/**
 * Client-safe media utility functions
 * These can be used in both server and client components
 */

// Helper to get image URL from Payload/Strapi media object (client-safe)
export function getImageUrl(image: any): string | null {
  if (!image) return null;
  
  // Handle Strapi format: { data: { attributes: { url: string } } }
  if (image.data) {
    const data = image.data.attributes || image.data;
    if (data.url) {
      if (data.url.startsWith('http')) {
        return data.url;
      }
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : (process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:3000');
      return `${baseUrl}${data.url}`;
    }
  }
  
  // Handle Payload format: { url: string }
  if (typeof image === 'object' && image.url) {
    if (image.url.startsWith('http')) {
      return image.url;
    }
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

// Helper to get array of image URLs from Strapi/Payload format
export function getImageUrlArray(images: any): string[] {
  if (!images) return [];
  
  // Handle Strapi format: { data: [{ attributes: { url: string } }, ...] }
  if (images.data && Array.isArray(images.data)) {
    return images.data
      .map((item: any) => {
        const data = item.attributes || item;
        return getImageUrl(data);
      })
      .filter((url: string | null): url is string => url !== null);
  }
  
  // Handle array format directly
  if (Array.isArray(images)) {
    return images
      .map((img: any) => getImageUrl(img))
      .filter((url: string | null): url is string => url !== null);
  }
  
  return [];
}

// Helper to check if media is video
export function isVideo(media?: any): boolean {
  if (!media) return false;
  if (media.mime) return media.mime.startsWith('video/');
  if (media.data?.attributes?.mime) return media.data.attributes.mime.startsWith('video/');
  return false;
}

