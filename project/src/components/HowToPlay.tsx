import React from 'react';
import { X, Music, Headphones, Search, Lightbulb, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HowToPlayProps {
  onClose: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary-500">¿Cómo jugar?</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full">
                <Headphones className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Escucha el fragmento</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cada día hay una nueva canción. Escucha el fragmento de 30 segundos para intentar identificarla.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 bg-secondary-100 dark:bg-secondary-900/30 p-2 rounded-full">
                <Search className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Busca y adivina</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Utiliza la barra de búsqueda para encontrar y seleccionar la canción que crees que es. Tienes 6 intentos.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 bg-accent-100 dark:bg-accent-900/30 p-2 rounded-full">
                <Lightbulb className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Usa las pistas</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Si te resulta difícil, puedes revelar pistas sobre el género, año, artista o álbum para ayudarte.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 bg-success-100 dark:bg-success-900/30 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-success-500 dark:text-success-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Comparte tus resultados</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Al terminar el juego, podrás compartir tus resultados con amigos sin revelar la canción.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
            <div className="flex items-center mb-2">
              <Music className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
              <h4 className="font-bold text-primary-600 dark:text-primary-400">¡Nueva canción cada día!</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Regresa mañana para un nuevo desafío musical. La canción cambia cada día a medianoche.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            ¡Empezar a jugar!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToPlay;