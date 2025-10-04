import React, { useState } from 'react';
import Card from '../ui/Card';

const FuturePrediction: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockPredictions = [
    { day: 'Tomorrow', temp: 24, condition: 'Sunny', confidence: 92 },
    { day: 'Day 2', temp: 26, condition: 'Partly Cloudy', confidence: 88 },
    { day: 'Day 3', temp: 23, condition: 'Light Rain', confidence: 85 },
    { day: 'Day 4', temp: 21, condition: 'Overcast', confidence: 82 },
    { day: 'Day 5', temp: 25, condition: 'Sunny', confidence: 78 }
  ];

  const aiFeatures = [
    {
      title: 'Machine Learning Models',
      description: 'Advanced neural networks trained on 20+ years of weather data',
      icon: '🧠',
      status: 'In Development'
    },
    {
      title: 'Satellite Integration',
      description: 'Real-time satellite imagery analysis for pattern recognition',
      icon: '🛰️',
      status: 'Planned'
    },
    {
      title: 'Climate Modeling',
      description: 'Integration with global climate models for long-term predictions',
      icon: '🌍',
      status: 'Research Phase'
    },
    {
      title: 'Personalized Forecasting',
      description: 'AI learns from your preferences and location patterns',
      icon: '👤',
      status: 'Future Release'
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 80) return 'text-blue-600 dark:text-blue-400';
    if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Research Phase': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Future Release': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Card title="💡 AI Weather Prediction (Future Vision)" subtitle="Next-generation weather forecasting powered by artificial intelligence">
      <div className="space-y-6">
        {/* Current Status */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">
              AI Prediction Engine
            </h3>
            <p className="text-purple-700 dark:text-purple-300 mb-4">
              Currently in development. This feature will use machine learning to predict weather 
              conditions up to 5 days ahead with unprecedented accuracy.
            </p>
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Coming Soon - Q2 2024
              </span>
            </div>
          </div>
        </div>

        {/* Mock 5-Day Forecast */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Preview: 5-Day AI Forecast
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {mockPredictions.map((prediction, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {prediction.day}
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {prediction.temp}°C
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {prediction.condition}
                </div>
                <div className={`text-xs font-medium ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence}% confidence
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${
                      prediction.confidence >= 90 ? 'bg-green-500' :
                      prediction.confidence >= 80 ? 'bg-blue-500' :
                      prediction.confidence >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Features Roadmap */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              AI Features Roadmap
            </h4>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
          
          <div className={`space-y-3 ${isExpanded ? 'block' : 'hidden'}`}>
            {aiFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold text-gray-800 dark:text-white">
                        {feature.title}
                      </h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feature.status)}`}>
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Technology Stack
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl mb-1">🐍</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">Python</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">ML Framework</div>
            </div>
            <div>
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">TensorFlow</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Neural Networks</div>
            </div>
            <div>
              <div className="text-2xl mb-1">☁️</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">AWS</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Cloud Computing</div>
            </div>
            <div>
              <div className="text-2xl mb-1">📊</div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">BigQuery</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Data Processing</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Want to be notified when AI predictions are available?
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
            🔔 Notify Me When Available
          </button>
        </div>
      </div>
    </Card>
  );
};

export default FuturePrediction;
