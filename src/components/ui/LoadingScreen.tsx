import React from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <Logo size="large" animated />
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ClimateTrack</h2>
          <p className="text-gray-600 mb-4">Loading Environmental Data Platform...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
