import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';

interface ComfortIndexProps {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

const ComfortIndex: React.FC<ComfortIndexProps> = ({ location, dateRange }) => {
  const [comfortScore, setComfortScore] = useState(82);
  const [comfortLevel, setComfortLevel] = useState('Comfortable');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI calculation
    const timer = setTimeout(() => {
      calculateComfortIndex();
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location, dateRange]);

  const calculateComfortIndex = () => {
    // Mock AI calculation based on weather data
    const baseScore = Math.floor(Math.random() * 40) + 60; // 60-100
    setComfortScore(baseScore);
    
    if (baseScore >= 80) {
      setComfortLevel('Excellent');
      setRecommendations([
        'Perfect day for outdoor activities',
        'Ideal conditions for hiking and sports',
        'Great weather for outdoor events',
        'Optimal for gardening and yard work'
      ]);
    } else if (baseScore >= 70) {
      setComfortLevel('Comfortable');
      setRecommendations([
        'Good conditions for outdoor activities',
        'Light clothing recommended',
        'Stay hydrated during extended outdoor time',
        'Consider sunscreen for prolonged exposure'
      ]);
    } else if (baseScore >= 50) {
      setComfortLevel('Moderate');
      setRecommendations([
        'Moderate outdoor conditions',
        'Dress in layers for comfort',
        'Monitor weather changes',
        'Consider indoor alternatives if sensitive'
      ]);
    } else if (baseScore >= 30) {
      setComfortLevel('Uncomfortable');
      setRecommendations([
        'Challenging outdoor conditions',
        'Limit outdoor activities',
        'Dress appropriately for conditions',
        'Consider indoor activities'
      ]);
    } else {
      setComfortLevel('Harsh');
      setRecommendations([
        'Avoid outdoor activities if possible',
        'Stay indoors with climate control',
        'Monitor health conditions',
        'Check weather alerts regularly'
      ]);
    }
  };

  const getComfortColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 30) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getComfortBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getComfortEmoji = (score: number) => {
    if (score >= 80) return '😊';
    if (score >= 70) return '🙂';
    if (score >= 50) return '😐';
    if (score >= 30) return '😕';
    return '😰';
  };

  const comfortFactors = [
    { name: 'Temperature', value: 85, icon: '🌡️', description: 'Optimal range' },
    { name: 'Humidity', value: 78, icon: '💧', description: 'Comfortable level' },
    { name: 'Wind Speed', value: 92, icon: '🌬️', description: 'Light breeze' },
    { name: 'Air Quality', value: 88, icon: '🏭', description: 'Good quality' },
    { name: 'UV Index', value: 75, icon: '☀️', description: 'Moderate exposure' },
    { name: 'Precipitation', value: 90, icon: '☔', description: 'No rain expected' }
  ];

  if (isLoading) {
    return (
      <Card title="😊 AI Comfort Index" subtitle="Calculating personalized comfort score...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">AI is analyzing weather conditions...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="😊 AI Comfort Index" subtitle="Personalized comfort analysis powered by machine learning">
      <div className="space-y-6">
        {/* Main Comfort Score */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center relative overflow-hidden">
              <div
                className={`absolute inset-0 rounded-full ${getComfortBgColor(comfortScore)} opacity-20`}
                style={{ 
                  background: `conic-gradient(${getComfortBgColor(comfortScore)} ${comfortScore * 3.6}deg, transparent 0deg)`
                }}
              ></div>
              <div className="relative z-10 text-center">
                <div className={`text-3xl font-bold ${getComfortColor(comfortScore)}`}>
                  {comfortScore}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">/100</div>
                <div className="text-2xl mt-1">{getComfortEmoji(comfortScore)}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className={`text-2xl font-bold ${getComfortColor(comfortScore)}`}>
              {comfortLevel}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Weather comfort level for {location.name}
            </p>
          </div>
        </div>

        {/* Comfort Factors */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Comfort Factors Analysis
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {comfortFactors.map((factor, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{factor.icon}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {factor.value}%
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">
                  {factor.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {factor.description}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${factor.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            💡 AI Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">💡</span>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-purple-600 dark:text-purple-400">🤖</span>
            <span className="font-medium text-purple-800 dark:text-purple-200">
              AI Model: ComfortPredict v2.1
            </span>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            This comfort index is calculated using advanced machine learning algorithms that analyze 
            multiple weather parameters, historical patterns, and user preferences to provide 
            personalized comfort recommendations.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ComfortIndex;
