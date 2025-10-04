import React, { useState } from 'react';

interface LocationInputProps {
  selectedLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  setSelectedLocation: (location: any) => void;
  dateRange: {
    start: string;
    end: string;
  };
  setDateRange: (range: any) => void;
  selectedVariables: string[];
  setSelectedVariables: (variables: string[]) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  selectedLocation,
  setSelectedLocation,
  dateRange,
  setDateRange,
  selectedVariables,
  setSelectedVariables
}) => {
  const [showMap, setShowMap] = useState(false);
  const [customRegion, setCustomRegion] = useState(false);

  const variables = [
    { key: 'temperature', label: '🌡️ Temperature', description: 'Air temperature data' },
    { key: 'precipitation', label: '☔ Precipitation', description: 'Rainfall and snowfall data' },
    { key: 'wind', label: '🌬️ Wind', description: 'Wind speed and direction' },
    { key: 'humidity', label: '🧭 Humidity', description: 'Relative humidity levels' },
    { key: 'air_quality', label: '🏭 Air Quality', description: 'Pollution and air quality index' }
  ];

  const popularCities = [
    { name: 'New York, NY', lat: 40.7128, lng: -74.0060 },
    { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
    { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
    { name: 'Houston, TX', lat: 29.7604, lng: -95.3698 },
    { name: 'Phoenix, AZ', lat: 33.4484, lng: -112.0740 },
    { name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652 }
  ];

  const handleVariableToggle = (variable: string) => {
    if (selectedVariables.includes(variable)) {
      setSelectedVariables(selectedVariables.filter(v => v !== variable));
    } else {
      setSelectedVariables([...selectedVariables, variable]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📍 Location & Data Selection
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Select Location
          </h3>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Type city name..."
              value={selectedLocation.name}
              onChange={(e) => setSelectedLocation({ ...selectedLocation, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                📍 Drop Pin on Map
              </button>
              <button
                onClick={() => setCustomRegion(!customRegion)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                ✏️ Draw Region
              </button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Popular Cities:</p>
              <div className="flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setSelectedLocation(city)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedLocation.name === city.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Date Range
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  const today = new Date();
                  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                  setDateRange({
                    start: weekAgo.toISOString().split('T')[0],
                    end: today.toISOString().split('T')[0]
                  });
                }}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Past Week
              </button>
              <button
                onClick={() => {
                  const today = new Date();
                  const weekAhead = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  setDateRange({
                    start: today.toISOString().split('T')[0],
                    end: weekAhead.toISOString().split('T')[0]
                  });
                }}
                className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Next Week
              </button>
            </div>
          </div>
        </div>

        {/* Variables Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Choose Variables
          </h3>
          
          <div className="space-y-2">
            {variables.map((variable) => (
              <label
                key={variable.key}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedVariables.includes(variable.key)}
                  onChange={() => handleVariableToggle(variable.key)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {variable.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {variable.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
