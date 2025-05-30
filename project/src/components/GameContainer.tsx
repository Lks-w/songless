import React from 'react';
import { motion } from 'framer-motion';
import MusicPlayer from './MusicPlayer';
import GuessInput from './GuessInput';
import GuessHistory from './GuessHistory';
import HintPanel from './HintPanel';
import GameStatus from './GameStatus';
import { useGame } from '../context/GameContext';
import Loader from './Loader';

const GameContainer: React.FC = () => {
  const { isLoading, gameStatus, audioReady } = useGame();

  if (isLoading) {
    return <Loader message="Cargando canción del día..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <MusicPlayer />
      </motion.div>

      {gameStatus === 'playing' && audioReady && (
        <motion.div variants={itemVariants} className="mt-6">
          <GuessInput />
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="mt-6">
        <HintPanel />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6">
        <GuessHistory />
      </motion.div>

      {gameStatus !== 'playing' && (
        <motion.div 
          variants={itemVariants} 
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <GameStatus />
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameContainer;