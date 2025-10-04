import React, { useState } from 'react';
import Card from '../ui/Card';

interface WeatherChartsProps {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  selectedVariables: string[];
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({
  location,
  dateRange,
  selectedVariables
}) => {
  const [activeDataset, setActiveDataset] = useState('nasa_power');
  const [activeChart, setActiveChart] = useState('temperature');

  const datasets = [
    { key: 'nasa_power', label: 'NASA POWER', description: 'High-resolution weather data' },
    { key: 'gpm', label: 'GPM', description: 'Global Precipitation Measurement' },
    { key: 'earthdata', label: 'EarthData', description: 'Comprehensive Earth observation data' }
  ];

  const chartTypes = [
    { key: 'temperature', label: '🌡️ Temperature Trends', icon: '📈' },
    { key: 'rainfall', label: '☔ Rainfall Probability', icon: '📊' },
    { key: 'conditions', label: '🌤️ Condition Distribution', icon: '🥧' }
  ];

  // Mock data for charts
  const temperatureData = [
    { date: '2024-01-15', temp: 18, humidity: 65 },
    { date: '2024-01-16', temp: 22, humidity: 62 },
    { date: '2024-01-17', temp: 25, humidity: 58 },
    { date: '2024-01-18', temp: 20, humidity: 70 },
    { date: '2024-01-19', temp: 23, humidity: 60 },
    { date: '2024-01-20', temp: 26, humidity: 55 },
    { date: '2024-01-21', temp: 24, humidity: 63 }
  ];

  const rainfallData = [
    { day: 'Mon', probability: 20, amount: 2 },
    { day: 'Tue', probability: 45, amount: 8 },
    { day: 'Wed', probability: 70, amount: 15 },
    { day: 'Thu', probability: 30, amount: 5 },
    { day: 'Fri', probability: 15, amount: 1 },
    { day: 'Sat', probability: 60, amount: 12 },
    { day: 'Sun', probability: 25, amount: 3 }
  ];

  const conditionData = [
    { condition: 'Sunny', percentage: 35, color: '#fbbf24' },
    { condition: 'Cloudy', percentage: 28, color: '#6b7280' },
    { condition: 'Rainy', percentage: 22, color: '#3b82f6' },
    { condition: 'Stormy', percentage: 15, color: '#1f2937' }
  ];

  const renderTemperatureChart = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          Temperature Trends
        </h4>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
            °C
          </button>
          <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
            °F
          </button>
        </div>
      </div>
      
      <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-end justify-between h-full space-x-2">
          {temperatureData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t mb-2 transition-all duration-500"
                style={{ height: `${(data.temp / 30) * 200}px` }}
              ></div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                <div className="font-medium">{data.temp}°</div>
                <div>{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="font-medium text-blue-800 dark:text-blue-200">Average Temperature</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">22.6°C</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="font-medium text-green-800 dark:text-green-200">Average Humidity</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-300">62%</div>
        </div>
      </div>
    </div>
  );

  const renderRainfallChart = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        Rainfall Probability & Amount
      </h4>
      
      <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-end justify-between h-full space-x-2">
          {rainfallData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex flex-col items-center h-full justify-end">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t mb-1"
                  style={{ height: `${(data.probability / 100) * 120}px` }}
                ></div>
                <div
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-200 rounded-t"
                  style={{ height: `${(data.amount / 20) * 80}px` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                <div className="font-medium">{data.probability}%</div>
                <div>{data.day}</div>
                <div className="text-blue-600 dark:text-blue-400">{data.amount}mm</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
          <div className="font-medium text-blue-800 dark:text-blue-200">Total Rainfall</div>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-300">46mm</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-center">
          <div className="font-medium text-orange-800 dark:text-orange-200">Rainy Days</div>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-300">4</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
          <div className="font-medium text-purple-800 dark:text-purple-200">Max Daily</div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-300">15mm</div>
        </div>
      </div>
    </div>
  );

  const renderConditionChart = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        Weather Condition Distribution
      </h4>
      
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-gray-400 to-blue-500 opacity-20"></div>
          <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {conditionData.map((condition, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: condition.color }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {condition.condition}
                </span>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  {condition.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${condition.percentage}%`,
                    backgroundColor: condition.color
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card title="📊 Weather Analytics & Charts" subtitle="Comprehensive weather data visualization">
      <div className="space-y-6">
        {/* Dataset Toggle */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex space-x-2">
            {datasets.map((dataset) => (
              <button
                key={dataset.key}
                onClick={() => setActiveDataset(dataset.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeDataset === dataset.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {dataset.label}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Active: {datasets.find(d => d.key === activeDataset)?.label} • 
            {datasets.find(d => d.key === activeDataset)?.description}
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex space-x-2">
          {chartTypes.map((chart) => (
            <button
              key={chart.key}
              onClick={() => setActiveChart(chart.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === chart.key
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span>{chart.icon}</span>
              <span>{chart.label}</span>
            </button>
          ))}
        </div>

        {/* Chart Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          {activeChart === 'temperature' && renderTemperatureChart()}
          {activeChart === 'rainfall' && renderRainfallChart()}
          {activeChart === 'conditions' && renderConditionChart()}
        </div>

        {/* Data Source Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600 dark:text-blue-400">🛰️</span>
            <span className="font-medium text-blue-800 dark:text-blue-200">
              Data Source: {datasets.find(d => d.key === activeDataset)?.label}
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {datasets.find(d => d.key === activeDataset)?.description}. 
            Data is updated every 3 hours and provides high-resolution weather information 
            for accurate analysis and forecasting.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCharts;
