import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import YouTube from 'react-youtube';

const MusicPlayer: React.FC = () => {
  const { currentSong, audioReady, gameStatus, guesses } = useGame();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Calculate max duration based on number of guesses
  const getMaxDuration = () => {
    const attempts = guesses.length;
    if (attempts === 0) return 0.5;
    if (attempts === 1) return 1.5;
    if (attempts === 2) return 3;
    if (attempts === 3) return 5;
    return 15;
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handlePlay = () => {
    if (!playerRef.current) return;

    const maxDuration = getMaxDuration();
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    } else {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setIsPlaying(true);
      
      progressIntervalRef.current = window.setInterval(() => {
        const currentTime = playerRef.current.getCurrentTime();
        const currentProgress = (currentTime / maxDuration) * 100;
        setProgress(currentProgress);
        
        if (currentTime >= maxDuration) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
          setProgress(0);
          if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current);
          }
        }
      }, 100);
    }
  };

  const handleStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  // Reveal song details if game is over
  const showSongDetails = gameStatus === 'won' || gameStatus === 'lost';

  const formatTime = (seconds: number) => {
    return `0:${seconds.toFixed(1)}`;
  };

  const videoId = currentSong?.id || '';

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="hidden">
        <YouTube
          videoId={videoId}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
            },
          }}
          onReady={(event) => {
            playerRef.current = event.target;
          }}
          onStateChange={handleStateChange}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-primary-500">
            {showSongDetails ? currentSong?.title : 'Canción del día'}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={toggleMute} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {showSongDetails && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Artista: {currentSong?.artist}</p>
            <p>Álbum: {currentSong?.album}</p>
            <p>Año: {currentSong?.year}</p>
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlay}
            disabled={!audioReady}
            className={`flex items-center justify-center w-12 h-12 rounded-full 
              ${isPlaying 
                ? 'bg-secondary-500 hover:bg-secondary-600' 
                : 'bg-primary-500 hover:bg-primary-600'} 
              text-white transition-colors`}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </button>
          
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-accent-500"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[40px]">
            {isPlaying ? formatTime(getMaxDuration()) : '0:0'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;