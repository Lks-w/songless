import React from 'react';
import { Music } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Music className="h-12 w-12 text-primary-500 animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full animate-spin">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-accent-500 rounded-full transform -translate-x-1/2"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
};

export default Loader;