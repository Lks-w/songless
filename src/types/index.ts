export interface Song {
  id: string;
  title: string;
  artist: string;
  viewCount: number;
  likeCount: number;
  publishedAt: number;
  thumbnailUrl: string;
  previewUrl: string;
}

export interface Guess {
  songId: string;
  title: string;
  artist: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface Hint {
  type: 'views' | 'likes' | 'year' | 'artist';
  content: string;
  revealed: boolean;
}