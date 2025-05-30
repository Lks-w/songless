export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  previewUrl: string;
  albumImageUrl?: string;
}

export interface Guess {
  songId: string;
  title: string;
  artist: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface Hint {
  type: 'genre' | 'year' | 'artist' | 'album';
  content: string;
  revealed: boolean;
}