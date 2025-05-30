import React from 'react';
import { Check, X, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const GuessHistory: React.FC = () => {
  const { guesses, remainingAttempts } = useGame();
  
  if (guesses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center">
        <p className="text-gray-600 dark:text-gray-300">No hay intentos aún. ¡Escucha y adivina la canción!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
        Tus intentos ({guesses.length}/6)
      </h3>
      
      <div className="space-y-3">
        {guesses.map((guess, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center p-3 rounded-lg ${
              guess.isCorrect 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
            }`}
          >
            <div className="mr-3">
              {guess.isCorrect ? (
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-gray-200">{guess.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{guess.artist}</p>
            </div>
            
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30">
              <Music className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {remainingAttempts > 0 && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Te quedan {remainingAttempts} intento{remainingAttempts !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default GuessHistory;