import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import HowToPlay from './components/HowToPlay';

function App() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowHowToPlay(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <ThemeProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Toaster position="top-center" />
          <Header onHowToPlayClick={() => setShowHowToPlay(true)} />
          <main className="flex-grow container mx-auto px-4 py-6">
            <GameContainer />
          </main>
          <Footer />
          {showHowToPlay && <HowToPlay onClose={() => setShowHowToPlay(false)} />}
        </div>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;