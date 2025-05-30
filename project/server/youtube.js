// YouTube API utility functions
import { getGenreFromTitle } from './utils.js';

const POPULAR_PLAYLISTS = [
  'PLDIoUOhQQPlXr63I_vwF9GD8sAKh77dWU', // Billboard Hot 100
  'PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI', // Top Pop Music
  'PL4fGSI1pDJn5kI81J1fYWK5eZRl1zJ5kM', // Top Rock
  'PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx', // Top Hip-Hop
  'PLw-VjHDlEOgs658kAHR_LAaILBXb-s6Q5', // Top Latin
];

// Get a new song for the day
export const getSongOfTheDay = async (youtube) => {
  // Use date to select a playlist
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const dateHash = hashString(dateString);
  const playlistId = POPULAR_PLAYLISTS[dateHash % POPULAR_PLAYLISTS.length];

  try {
    // Get playlist items
    const playlistResponse = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: playlistId,
      maxResults: 50
    });

    const items = playlistResponse.data.items;
    const selectedVideo = items[dateHash % items.length];
    const videoId = selectedVideo.snippet.resourceId.videoId;

    // Get more details about the video
    const videoResponse = await youtube.videos.list({
      part: 'snippet,contentDetails',
      id: videoId
    });

    const video = videoResponse.data.items[0];
    const title = video.snippet.title;
    const channelTitle = video.snippet.channelTitle;

    // Extract year from description or use current year as fallback
    const yearMatch = video.snippet.description.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0]) : today.getFullYear();

    return {
      id: videoId,
      title: cleanupTitle(title),
      artist: channelTitle,
      album: 'YouTube Music',
      year: year,
      genre: getGenreFromTitle(title),
      previewUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: video.snippet.thumbnails.high.url
    };
  } catch (error) {
    console.error('Error getting song of the day:', error);
    throw error;
  }
};

// Search for videos
export const searchYouTubeVideos = async (youtube, query) => {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query + ' music',
      type: 'video',
      videoCategoryId: '10', // Music category
      maxResults: 10
    });

    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: cleanupTitle(item.snippet.title),
      artist: item.snippet.channelTitle,
      album: 'YouTube Music',
      year: new Date(item.snippet.publishedAt).getFullYear(),
      genre: getGenreFromTitle(item.snippet.title),
      previewUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnailUrl: item.snippet.thumbnails.high.url
    }));
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    throw error;
  }
};

// Helper function to clean up video titles
function cleanupTitle(title) {
  return title
    .replace(/\(Official.*?\)/gi, '')
    .replace(/\[Official.*?\]/gi, '')
    .replace(/\(Lyric.*?\)/gi, '')
    .replace(/\[Lyric.*?\]/gi, '')
    .replace(/\(Audio.*?\)/gi, '')
    .replace(/\[Audio.*?\]/gi, '')
    .replace(/\(Music.*?\)/gi, '')
    .replace(/\[Music.*?\]/gi, '')
    .replace(/\(ft\..*?\)/gi, '')
    .replace(/\[ft\..*?\]/gi, '')
    .replace(/\(feat\..*?\)/gi, '')
    .replace(/\[feat\..*?\]/gi, '')
    .trim();
}

// Simple hash function
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}