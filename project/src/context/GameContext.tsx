import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDailySong, searchSongs } from '../services/apiService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Song, Guess, Hint } from '../types';
import toast from 'react-hot-toast';

interface GameContextType {
  isLoading: boolean;
  currentSong: Song | null;
  guesses: Guess[];
  hints: Hint[];
  searchResults: Song[];
  remainingAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  currentDate: string;
  audioReady: boolean;
  isSearching: boolean;
  makeGuess: (guess: Song) => void;
  searchSongsByQuery: (query: string) => Promise<void>;
  resetGame: () => void;
  revealHint: () => void;
}

const MAX_ATTEMPTS = 6;

const GameContext = createContext<GameContextType | undefined>(undefined);

const getTodayDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [currentDate] = useState(getTodayDateString());
  
  // Persistent state
  const [guesses, setGuesses] = useLocalStorage<Guess[]>(`musicwordle-guesses-${currentDate}`, []);
  const [hints, setHints] = useLocalStorage<Hint[]>(`musicwordle-hints-${currentDate}`, []);
  const [gameStatus, setGameStatus] = useLocalStorage<'playing' | 'won' | 'lost'>(
    `musicwordle-status-${currentDate}`, 
    'playing'
  );

  const remainingAttempts = MAX_ATTEMPTS - guesses.length;

  // Initialize game data
  useEffect(() => {
    const initGame = async () => {
      try {
        setIsLoading(true);
        const song = await getDailySong();
        setCurrentSong(song);
        
        // Initialize hints if not already set
        if (hints.length === 0) {
          setHints([
            { type: 'genre', revealed: false, content: song.genre },
            { type: 'year', revealed: false, content: song.year.toString() },
            { type: 'artist', revealed: false, content: song.artist },
            { type: 'album', revealed: false, content: song.album }
          ]);
        }
        
        setAudioReady(true);
      } catch (error) {
        console.error('Failed to load daily song:', error);
        toast.error('Error al cargar la canción del día. Intente recargar la página.');
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we need to reset for a new day
    const storedDate = localStorage.getItem('musicwordle-date');
    if (storedDate !== currentDate) {
      localStorage.setItem('musicwordle-date', currentDate);
      resetGame();
    }

    initGame();
  }, [currentDate, hints.length]);

  const makeGuess = (guess: Song) => {
    if (gameStatus !== 'playing' || !currentSong) return;
    
    const isCorrect = guess.id === currentSong.id;
    const newGuess: Guess = {
      songId: guess.id,
      title: guess.title,
      artist: guess.artist,
      isCorrect,
      timestamp: new Date().toISOString()
    };
    
    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    
    if (isCorrect) {
      setGameStatus('won');
      toast.success('¡Correcto! Has adivinado la canción del día.');
    } else if (updatedGuesses.length >= MAX_ATTEMPTS) {
      setGameStatus('lost');
      toast.error(`Agotaste tus intentos. La canción era "${currentSong.title}" de ${currentSong.artist}.`);
    } else {
      toast.error('Incorrecto. Intenta de nuevo.');
    }
  };

  const searchSongsByQuery = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      const results = await searchSongs(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching songs:', error);
      toast.error('Error al buscar canciones');
    } finally {
      setIsSearching(false);
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setHints([]);
    setGameStatus('playing');
    setSearchResults([]);
  };

  const revealHint = () => {
    const unrevealedHints = hints.filter(hint => !hint.revealed);
    if (unrevealedHints.length === 0) return;
    
    const nextHintIndex = hints.findIndex(hint => !hint.revealed);
    if (nextHintIndex !== -1) {
      const updatedHints = [...hints];
      updatedHints[nextHintIndex].revealed = true;
      setHints(updatedHints);
      
      const hintType = updatedHints[nextHintIndex].type;
      const hintContent = updatedHints[nextHintIndex].content;
      
      const hintMessages: Record<string, string> = {
        genre: `Género: ${hintContent}`,
        year: `Año de lanzamiento: ${hintContent}`,
        artist: `Artista: ${hintContent}`,
        album: `Álbum: ${hintContent}`
      };
      
      toast.success(`Pista revelada: ${hintMessages[hintType]}`);
    }
  };

  return (
    <GameContext.Provider value={{
      isLoading,
      currentSong,
      guesses,
      hints,
      searchResults,
      remainingAttempts,
      gameStatus,
      currentDate,
      audioReady,
      isSearching,
      makeGuess,
      searchSongsByQuery,
      resetGame,
      revealHint
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};