import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p className="flex items-center justify-center mb-2">
          Hecho con <Heart className="h-4 w-4 text-secondary-500 mx-1" /> para los amantes de la música
        </p>
        <p>© {new Date().getFullYear()} MusicWordle - Todos los derechos reservados</p>
        <div className="mt-2 flex items-center justify-center">
          <a 
            href="https://github.com/yourusername/music-wordle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            Proyecto en GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;