import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { google } from 'googleapis';
import { getSongOfTheDay, searchYouTubeVideos } from './youtube.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cache for storing API responses
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// Middleware
app.use(cors());
app.use(express.json());

// Initialize YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

// Get the song of the day
app.get('/api/daily-song', async (req, res) => {
  try {
    const cacheKey = `daily-song-${new Date().toISOString().split('T')[0]}`;
    
    // Check cache first
    const cachedSong = cache.get(cacheKey);
    if (cachedSong) {
      return res.json(cachedSong);
    }
    
    // Get new song of the day
    const song = await getSongOfTheDay(youtube);
    
    // Cache the result
    cache.set(cacheKey, song);
    
    res.json(song);
  } catch (error) {
    console.error('Error fetching daily song:', error);
    res.status(500).json({ error: 'Failed to fetch daily song' });
  }
});

// Search for songs
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.json([]);
    }
    
    const cacheKey = `search-${q}`;
    
    // Check cache first
    const cachedResults = cache.get(cacheKey);
    if (cachedResults) {
      return res.json(cachedResults);
    }
    
    // Search YouTube
    const results = await searchYouTubeVideos(youtube, q);
    
    // Cache the results
    cache.set(cacheKey, results);
    
    res.json(results);
  } catch (error) {
    console.error('Error searching songs:', error);
    res.status(500).json({ error: 'Failed to search songs' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});