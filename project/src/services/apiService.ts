import axios from 'axios';
import { Song } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Get today's song from the backend
export const getDailySong = async (): Promise<Song> => {
  try {
    const response = await axios.get(`${API_URL}/api/daily-song`);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily song:', error);
    // Temporary fallback for development
    return {
      id: 'spotify:track:4cOdK2wGLETKBW3PvgPWqT',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      year: 1975,
      genre: 'Rock',
      previewUrl: 'https://p.scdn.co/mp3-preview/4d1d7cc30b3d537412d4fa150da36cfe42bfa89e',
      albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273d012adb81a6cd9e8c10b95d5'
    };
  }
};

// Search for songs by query string
export const searchSongs = async (query: string): Promise<Song[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for songs:', error);
    // Temporary fallback for development
    return [
      {
        id: 'spotify:track:4cOdK2wGLETKBW3PvgPWqT',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        year: 1975,
        genre: 'Rock',
        previewUrl: 'https://p.scdn.co/mp3-preview/4d1d7cc30b3d537412d4fa150da36cfe42bfa89e',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273d012adb81a6cd9e8c10b95d5'
      },
      {
        id: 'spotify:track:5ChkMS8OtdzJeqyybCc9R5',
        title: 'Billie Jean',
        artist: 'Michael Jackson',
        album: 'Thriller',
        year: 1982,
        genre: 'Pop',
        previewUrl: 'https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be'
      },
      {
        id: 'spotify:track:7GhIk7Il098yCjg4BQjzvb',
        title: 'Despacito',
        artist: 'Luis Fonsi',
        album: 'VIDA',
        year: 2017,
        genre: 'Latin',
        previewUrl: 'https://p.scdn.co/mp3-preview/0ef53340b6f0d20e4ad1bf33d7993f2187d7d21e',
        albumImageUrl: 'https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c'
      }
    ];
  }
};