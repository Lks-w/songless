import { google } from 'googleapis';

// Get a random popular song from YouTube Music charts
export const getDailySong = async (youtube) => {
  try {
    // Search for popular music videos
    const response = await youtube.search.list({
      part: 'snippet',
      q: 'official music video',
      type: 'video',
      videoCategoryId: '10', // Music category
      chart: 'mostPopular',
      maxResults: 50,
      regionCode: 'US'
    });

    // Get a random video from the results
    const videos = response.data.items;
    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];

    // Get detailed video information including statistics
    const videoDetails = await youtube.videos.list({
      part: 'snippet,statistics,contentDetails',
      id: selectedVideo.id.videoId
    });

    const video = videoDetails.data.items[0];
    const { snippet, statistics } = video;

    return {
      id: video.id,
      title: cleanupTitle(snippet.title),
      artist: snippet.channelTitle,
      viewCount: parseInt(statistics.viewCount),
      likeCount: parseInt(statistics.likeCount),
      publishedAt: new Date(snippet.publishedAt).getFullYear(),
      thumbnailUrl: snippet.thumbnails.high.url,
      previewUrl: `https://www.youtube.com/watch?v=${video.id}`
    };
  } catch (error) {
    console.error('Error getting daily song:', error);
    throw error;
  }
};

// Search for videos
export const searchYouTubeVideos = async (youtube, query) => {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query + ' official music video',
      type: 'video',
      videoCategoryId: '10', // Music category
      maxResults: 10
    });

    const videoIds = response.data.items.map(item => item.id.videoId);
    
    // Get detailed information for all videos
    const videosDetails = await youtube.videos.list({
      part: 'snippet,statistics',
      id: videoIds.join(',')
    });

    return videosDetails.data.items.map(video => ({
      id: video.id,
      title: cleanupTitle(video.snippet.title),
      artist: video.snippet.channelTitle,
      viewCount: parseInt(video.statistics.viewCount),
      likeCount: parseInt(video.statistics.likeCount),
      publishedAt: new Date(video.snippet.publishedAt).getFullYear(),
      thumbnailUrl: video.snippet.thumbnails.high.url,
      previewUrl: `https://www.youtube.com/watch?v=${video.id}`
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