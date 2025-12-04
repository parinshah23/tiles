/**
 * Instagram Service
 * Handles Instagram Basic Display API calls
 * 
 * Setup Instructions:
 * 1. Create a Facebook App at https://developers.facebook.com/
 * 2. Add Instagram Basic Display product
 * 3. Generate access token using Instagram Basic Display API
 * 4. Add environment variables:
 *    VITE_INSTAGRAM_ACCESS_TOKEN=your_access_token
 *    VITE_INSTAGRAM_USER_ID=your_user_id (optional, will be fetched if not provided)
 */

const INSTAGRAM_API_BASE = 'https://graph.instagram.com';

export interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface InstagramUser {
  id: string;
  username: string;
  account_type: 'BUSINESS' | 'MEDIA_CREATOR' | 'PERSONAL';
  media_count: number;
}

export interface InstagramAccountInfo {
  id: string;
  username: string;
  profile_picture_url?: string;
  media_count: number;
  followers_count?: number;
  follows_count?: number;
}

/**
 * Get access token from environment variables
 */
function getAccessToken(): string | null {
  return import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || null;
}

/**
 * Get user ID from environment variables or fetch it
 */
async function getUserId(): Promise<string | null> {
  const envUserId = import.meta.env.VITE_INSTAGRAM_USER_ID;
  if (envUserId) return envUserId;

  const accessToken = getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${INSTAGRAM_API_BASE}/me?fields=id&access_token=${accessToken}`
    );
    const data = await response.json();
    return data.id || null;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
}

/**
 * Fetch Instagram account information
 */
export async function fetchAccountInfo(): Promise<InstagramAccountInfo | null> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.warn('Instagram access token not configured');
    return null;
  }

  try {
    const userId = await getUserId();
    if (!userId) return null;

    const fields = 'username,media_count';
    const response = await fetch(
      `${INSTAGRAM_API_BASE}/${userId}?fields=${fields}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      username: data.username,
      media_count: data.media_count || 0,
    };
  } catch (error) {
    console.error('Error fetching Instagram account info:', error);
    return null;
  }
}

/**
 * Fetch recent Instagram media posts
 */
export async function fetchRecentMedia(limit: number = 9): Promise<InstagramMedia[]> {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.warn('Instagram access token not configured');
    return [];
  }

  try {
    const userId = await getUserId();
    if (!userId) return [];

    const fields = 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url,like_count,comments_count';
    const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Instagram API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return (data.data || []).map((item: any) => ({
      id: item.id,
      media_type: item.media_type,
      media_url: item.media_url,
      permalink: item.permalink,
      thumbnail_url: item.thumbnail_url,
      caption: item.caption || '',
      timestamp: item.timestamp,
      like_count: item.like_count || 0,
      comments_count: item.comments_count || 0,
    }));
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    return [];
  }
}

/**
 * Refresh access token (Instagram tokens expire after 60 days)
 */
export async function refreshAccessToken(): Promise<string | null> {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await fetch(
      `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token || null;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

