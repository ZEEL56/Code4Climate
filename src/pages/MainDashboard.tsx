import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/ui/Logo';
import WeatherCard from '../components/weather/WeatherCard';
import InteractiveMap from '../components/maps/InteractiveMap';
import WeatherCharts from '../components/charts/WeatherCharts';
import ComfortIndex from '../components/weather/ComfortIndex';
import LocationInput from '../components/weather/LocationInput';
import NasaDataPanel from '../components/weather/NasaDataPanel';
import AlertsPanel from '../components/weather/AlertsPanel';
import ExportPanel from '../components/weather/ExportPanel';
import FuturePrediction from '../components/weather/FuturePrediction';
import Footer from '../components/layout/Footer';

const MainDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState({
    name: 'New York, NY',
    lat: 40.7128,
    lng: -74.0060
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [selectedVariables, setSelectedVariables] = useState(['temperature', 'precipitation', 'wind', 'humidity', 'air_quality']);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const weatherData = {
    veryHot: { probability: 68, description: 'Very Hot' },
    veryCold: { probability: 22, description: 'Very Cold' },
    veryWindy: { probability: 43, description: 'Very Windy' },
    veryWet: { probability: 54, description: 'Very Wet' },
    veryUncomfortable: { probability: 31, description: 'Very Uncomfortable' }
  };

  const sidebarItems = [
    { name: 'Home', icon: '🏠', href: '#home' },
    { name: 'Map', icon: '🗺️', href: '#map' },
    { name: 'Charts', icon: '📊', href: '#charts' },
    { name: 'Comfort Index', icon: '😊', href: '#comfort' },
    { name: 'Export', icon: '📤', href: '#export' },
    { name: 'NASA Data', icon: '🛰️', href: '#nasa' },
    { name: 'AI Predictions', icon: '💡', href: '#ai' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Logo size="small" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">ClimateTrack Pro</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder="Search city..."
                  className="w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                🔔
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 min-h-screen`}>
          <div className="p-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Location Input */}
            <LocationInput
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              dateRange={dateRange}
              setDateRange={setDateRange}
              selectedVariables={selectedVariables}
              setSelectedVariables={setSelectedVariables}
            />

            {/* Weather Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(weatherData).map(([key, data]) => (
                <WeatherCard
                  key={key}
                  title={data.description}
                  probability={data.probability}
                  icon={key === 'veryHot' ? '🌡️' : key === 'veryCold' ? '❄️' : key === 'veryWindy' ? '🌬️' : key === 'veryWet' ? '☔' : '🥵'}
                  onClick={() => console.log(`Clicked ${key}`)}
                />
              ))}
            </div>

            {/* Interactive Map */}
            <InteractiveMap
              selectedLocation={selectedLocation}
              dateRange={dateRange}
              selectedVariables={selectedVariables}
            />

            {/* Charts & Graphs */}
            <WeatherCharts
              location={selectedLocation}
              dateRange={dateRange}
              selectedVariables={selectedVariables}
            />

            {/* Comfort Index */}
            <ComfortIndex
              location={selectedLocation}
              dateRange={dateRange}
            />

            {/* NASA Data Panel */}
            <NasaDataPanel />

            {/* Alerts & Recommendations */}
            <AlertsPanel location={selectedLocation} />

            {/* Export Data */}
            <ExportPanel
              location={selectedLocation}
              dateRange={dateRange}
              selectedVariables={selectedVariables}
            />

            {/* Future Prediction */}
            <FuturePrediction />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainDashboard;
