import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Song } from '../types';

const GuessInput: React.FC = () => {
  const { searchSongsByQuery, searchResults, makeGuess, isSearching } = useGame();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle search as user types
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length >= 2) {
        searchSongsByQuery(query);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchSongsByQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectSong = (song: Song) => {
    makeGuess(song);
    setQuery('');
    setShowResults(false);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            placeholder="Buscar canción..."
            className="w-full py-3 px-4 pl-10 text-gray-700 dark:text-gray-200 bg-transparent outline-none"
            aria-label="Buscar canción"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        
        {query && (
          <button
            onClick={clearSearch}
            className="px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {showResults && (searchResults.length > 0 || isSearching) && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Buscando...</span>
              </div>
            ) : (
              <ul className="py-2">
                {searchResults.map((song) => (
                  <motion.li
                    key={song.id}
                    whileHover={{ backgroundColor: 'rgba(138, 43, 226, 0.1)' }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleSelectSong(song)}
                  >
                    <div className="flex items-start">
                      {song.albumImageUrl ? (
                        <img 
                          src={song.albumImageUrl} 
                          alt={song.album} 
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded mr-3 flex items-center justify-center">
                          <Music className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{song.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuessInput;