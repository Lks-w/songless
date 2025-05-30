import React from 'react';
import { Music, HelpCircle, Sun, Moon, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface HeaderProps {
  onHowToPlayClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHowToPlayClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { gameStatus, guesses, currentSong } = useGame();

  const handleShare = () => {
    if (gameStatus !== 'won' && gameStatus !== 'lost') {
      toast.error('Termina el juego primero para compartir tus resultados.');
      return;
    }

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

  return (
    <motion.header 
      className="bg-primary-500 text-white shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8" />
          <h1 className="text-2xl font-heading font-bold">MusicWordle</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-primary-600 transition-colors"
            aria-label="Compartir resultados"
          >
            <Share2 className="h-5 w-5" />
          </button>
          
          <button 
            onClick={onHowToPlayClick}
            className="p-2 rounded-full hover:bg-primary-600 transition-colors"
            aria-label="Cómo jugar"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary-600 transition-colors"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;