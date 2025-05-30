import React from 'react';
import { HelpCircle, Music, Calendar, User, Disc } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const HintPanel: React.FC = () => {
  const { hints, revealHint, gameStatus } = useGame();

  const getIconForHintType = (type: string) => {
    switch (type) {
      case 'genre':
        return <Music className="h-5 w-5" />;
      case 'year':
        return <Calendar className="h-5 w-5" />;
      case 'artist':
        return <User className="h-5 w-5" />;
      case 'album':
        return <Disc className="h-5 w-5" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  };

  const getHintTitle = (type: string) => {
    switch (type) {
      case 'genre':
        return 'Género';
      case 'year':
        return 'Año';
      case 'artist':
        return 'Artista';
      case 'album':
        return 'Álbum';
      default:
        return 'Pista';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Pistas</h3>
        
        {gameStatus === 'playing' && (
          <button
            onClick={revealHint}
            disabled={hints.every(hint => hint.revealed)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium 
              ${hints.every(hint => hint.revealed)
                ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                : 'bg-secondary-500 text-white hover:bg-secondary-600'
              } transition-colors`}
          >
            Revelar pista
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {hints.map((hint, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className={`bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center ${
              hint.revealed 
                ? 'border-2 border-primary-300 dark:border-primary-700' 
                : 'border-2 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex justify-center mb-2">
              <div className={`p-2 rounded-full ${
                hint.revealed 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {getIconForHintType(hint.type)}
              </div>
            </div>
            
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {getHintTitle(hint.type)}
            </h4>
            
            {hint.revealed ? (
              <p className="font-bold text-primary-600 dark:text-primary-400">
                {hint.content}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500">???</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HintPanel;