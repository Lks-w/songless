// Spotify API utility functions

// Get a new access token from Spotify
export const refreshSpotifyToken = async (spotifyApi) => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Spotify access token refreshed');
    return data.body['access_token'];
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    throw error;
  }
};

// Deterministically select a song for the day based on the current date
export const getSongOfTheDay = async (spotifyApi) => {
  // Use a list of popular playlists to get songs from
  const popularPlaylists = [
    '37i9dQZEVXbMDoHDwVN2tF', // Global Top 50
    '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
    '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
    '37i9dQZF1DX4o1oenSJRJd', // All Out 2000s
    '37i9dQZF1DX4UtSsGT1Sbe', // All Out 80s
    '37i9dQZF1DWXRqgorJj26U', // Rock Classics
    '37i9dQZF1DWY7IeIP1cdjF'  // Pop Rising
  ];

  // Get today's date and use it to select a playlist
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const dateHash = hashString(dateString);
  
  // Select a playlist based on the date
  const playlistIndex = dateHash % popularPlaylists.length;
  const playlistId = popularPlaylists[playlistIndex];
  
  try {
    // Get tracks from the selected playlist
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);
    const tracks = playlistResponse.body.tracks.items;
    
    // Select a track based on the date
    const trackIndex = dateHash % tracks.length;
    const track = tracks[trackIndex].track;
    
    // Get more details about the track
    const trackDetails = await spotifyApi.getTrack(track.id);
    const trackInfo = trackDetails.body;
    
    // Get artist genres
    const artistResponse = await spotifyApi.getArtist(track.artists[0].id);
    const artistInfo = artistResponse.body;
    
    // Format song data
    return {
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      year: new Date(track.album.release_date).getFullYear(),
      genre: artistInfo.genres.length > 0 ? artistInfo.genres[0] : 'Unknown',
      previewUrl: track.preview_url,
      albumImageUrl: track.album.images[0]?.url
    };
  } catch (error) {
    console.error('Error getting song of the day:', error);
    throw error;
  }
};

// Search for tracks on Spotify
export const searchSpotifyTracks = async (spotifyApi, query) => {
  try {
    const response = await spotifyApi.searchTracks(query, { limit: 10 });
    const tracks = response.body.tracks.items;
    
    return tracks.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      year: new Date(track.album.release_date).getFullYear(),
      previewUrl: track.preview_url,
      albumImageUrl: track.album.images[0]?.url
    }));
  } catch (error) {
    console.error('Error searching Spotify tracks:', error);
    throw error;
  }
};

// Simple hash function to generate a consistent number from a string
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}