import React from 'react';

interface WeatherCardProps {
  title: string;
  probability: number;
  icon: string;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, probability, icon, onClick }) => {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'bg-red-500';
    if (prob >= 50) return 'bg-orange-500';
    if (prob >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProbabilityTextColor = (prob: number) => {
    if (prob >= 70) return 'text-red-600';
    if (prob >= 50) return 'text-orange-600';
    if (prob >= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <div className={`w-3 h-3 rounded-full ${getProbabilityColor(probability)}`}></div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {title}
      </h3>
      
      <div className="flex items-baseline space-x-1">
        <span className={`text-2xl font-bold ${getProbabilityTextColor(probability)}`}>
          {probability}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">chance</span>
      </div>
      
      <div className="mt-3">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProbabilityColor(probability)}`}
            style={{ width: `${probability}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
