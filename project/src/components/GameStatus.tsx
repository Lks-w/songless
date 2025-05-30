import React from 'react';
import { Trophy, Frown, RotateCcw, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import toast from 'react-hot-toast';

const GameStatus: React.FC = () => {
  const { gameStatus, currentSong, guesses, resetGame } = useGame();

  const handleShare = () => {
    const emoji = gameStatus === 'won' ? '🎵' : '❌';
    const attemptsText = gameStatus === 'won' 
      ? `${guesses.length}/${6}` 
      : 'X/6';
    
    const date = new Date().toLocaleDateString('es-ES');
    let shareText = `MusicWordle ${date} - ${attemptsText}\n\n`;
    
    // Add emoji grid representation of guesses
    guesses.forEach(() => {
      shareText += gameStatus === 'won' ? '🟪 ' : '⬜ ';
    });
    
    shareText += `\n\n${emoji} ${currentSong?.title} - ${currentSong?.artist} ${emoji}\n\nJuega en: musicwordle.com`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText)
      .then(() => toast.success('¡Resultados copiados al portapapeles!'))
      .catch(() => toast.error('No se pudo copiar al portapapeles'));
  };

  const isGameOver = gameStatus === 'won' || gameStatus === 'lost';

  if (!isGameOver || !currentSong) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center ${
        gameStatus === 'won' 
          ? 'border-4 border-success-500' 
          : 'border-4 border-error-500'
      }`}
    >
      {gameStatus === 'won' ? (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-success-500 flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-success-500 mb-2">¡Felicidades!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Has adivinado la canción en {guesses.length} intento{guesses.length !== 1 ? 's' : ''}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-error-500 flex items-center justify-center mb-4">
            <Frown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-error-500 mb-2">¡Has perdido!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            La canción era:
          </p>
          <p className="text-xl font-bold text-primary-500 mb-4">
            {currentSong.title} - {currentSong.artist}
          </p>
        </div>
      )}
      
      <div className="flex justify-center space-x-4 mt-2">
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-secondary-500 text-white rounded-full hover:bg-secondary-600 transition-colors"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Compartir
        </button>
        
        <button
          onClick={resetGame}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Reiniciar
        </button>
      </div>
    </motion.div>
  );
};

export default GameStatus;