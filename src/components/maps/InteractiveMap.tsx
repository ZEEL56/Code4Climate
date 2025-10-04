import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';

interface InteractiveMapProps {
  selectedLocation: {
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

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedLocation,
  dateRange,
  selectedVariables
}) => {
  const [isClient, setIsClient] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonLocation, setComparisonLocation] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mockWeatherData = [
    { lat: 40.7128, lng: -74.0060, temp: 22, rainfall: 5, humidity: 65, airQuality: 45 },
    { lat: 40.7589, lng: -73.9851, temp: 24, rainfall: 3, humidity: 62, airQuality: 48 },
    { lat: 40.6892, lng: -74.0445, temp: 21, rainfall: 8, humidity: 68, airQuality: 42 },
    { lat: 40.7505, lng: -73.9934, temp: 23, rainfall: 2, humidity: 60, airQuality: 50 },
    { lat: 40.7282, lng: -73.7949, temp: 25, rainfall: 1, humidity: 58, airQuality: 52 }
  ];

  if (!isClient) {
    return (
      <Card title="🗺️ Interactive Weather Map" subtitle="Loading map data...">
        <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading interactive map...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="🗺️ Interactive Weather Map" subtitle="Real-time weather data with NASA overlays">
      <div className="space-y-4">
        {/* Map Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Show Heatmap Overlay</span>
            </label>
            
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              {showComparison ? 'Hide' : 'Compare with Another Location'}
            </button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Data Source: NASA POWER API • Last Updated: 2 minutes ago
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Interactive Weather Map
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Location: {selectedLocation.name}
              </p>
              
              {/* Mock Map Data Points */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {mockWeatherData.map((point, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Point {index + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>🌡️</span>
                        <span>{point.temp}°C</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>☔</span>
                        <span>{point.rainfall}mm</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>🧭</span>
                        <span>{point.humidity}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>🏭</span>
                        <span>{point.airQuality}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
              Legend
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">High Temperature</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">High Precipitation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Air Quality Alert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Panel */}
        {showComparison && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              📊 Location Comparison
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-800 dark:text-white mb-2">
                  {selectedLocation.name}
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Average Temperature:</span>
                    <span className="font-medium">22°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Rainfall:</span>
                    <span className="font-medium">45mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Air Quality Index:</span>
                    <span className="font-medium">45 (Good)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-800 dark:text-white mb-2">
                  Comparison Location
                </h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Average Temperature:</span>
                    <span className="font-medium">18°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Rainfall:</span>
                    <span className="font-medium">62mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Air Quality Index:</span>
                    <span className="font-medium">38 (Good)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InteractiveMap;
