// Common music genres for classification
const GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Rap', 'R&B', 'Latin', 
  'Electronic', 'Dance', 'Country', 'Jazz', 'Classical',
  'Metal', 'Indie', 'Folk', 'Reggae', 'Blues'
];

// Simple genre detection from title and description
export function getGenreFromTitle(title) {
  const normalizedTitle = title.toLowerCase();
  
  for (const genre of GENRES) {
    if (normalizedTitle.includes(genre.toLowerCase())) {
      return genre;
    }
  }
  
  // Default genre based on common keywords
  if (normalizedTitle.match(/trap|rap|hip hop|beats/)) return 'Hip Hop';
  if (normalizedTitle.match(/edm|house|techno|trance/)) return 'Electronic';
  if (normalizedTitle.match(/rock|metal|punk/)) return 'Rock';
  if (normalizedTitle.match(/pop|hit/)) return 'Pop';
  
  return 'Pop'; // Default genre
}