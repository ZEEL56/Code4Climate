import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import WeatherWidget from '../widgets/WeatherWidget';
import ClimateDataPanel from '../widgets/ClimateDataPanel';
import Footer from '../Footer';
import './EnhancedDashboard.css';

const EnhancedVisitorDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    comfortIndex: 75,
    date: new Date().toLocaleDateString()
  });

  // Sample climate trend data
  const climateTrends = [
    { month: 'Jan', temperature: 22, co2: 410, seaLevel: 2.8 },
    { month: 'Feb', temperature: 24, co2: 412, seaLevel: 2.9 },
    { month: 'Mar', temperature: 27, co2: 414, seaLevel: 3.0 },
    { month: 'Apr', temperature: 30, co2: 415, seaLevel: 3.1 },
    { month: 'May', temperature: 32, co2: 416, seaLevel: 3.2 },
    { month: 'Jun', temperature: 29, co2: 417, seaLevel: 3.3 }
  ];

  const weatherDistribution = [
    { name: 'Sunny', value: 35, color: '#FFD700' },
    { name: 'Partly Cloudy', value: 25, color: '#87CEEB' },
    { name: 'Cloudy', value: 20, color: '#708090' },
    { name: 'Rainy', value: 15, color: '#4682B4' },
    { name: 'Stormy', value: 5, color: '#2F4F4F' }
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI Weather Predictions',
      description: 'Advanced machine learning algorithms predict weather patterns up to 3 months ahead',
      color: '#4CAF50'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Interactive charts and visualizations powered by NASA climate data',
      color: '#2196F3'
    },
    {
      icon: '🗺️',
      title: 'Interactive Maps',
      description: 'Explore climate data through interactive geographic visualizations',
      color: '#FF9800'
    },
    {
      icon: '🧠',
      title: 'Comfort Analysis',
      description: 'AI-powered comfort index analysis for optimal outdoor planning',
      color: '#9C27B0'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Responsive design works perfectly on all devices and screen sizes',
      color: '#00BCD4'
    },
    {
      icon: '🔬',
      title: 'Scientific Data',
      description: 'Access to NASA Earth Observatory and meteorological research data',
      color: '#795548'
    }
  ];

  // Update weather data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeather(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(20, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
        comfortIndex: Math.max(0, Math.min(100, prev.comfortIndex + (Math.random() - 0.5) * 10))
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`enhanced-dashboard visitor-dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="earth-icon">🌍</span>
          <h1>CODE4CLIMATE</h1>
        </div>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-btn">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <span className="user-info">Welcome, Visitor!</span>
          <button onClick={logout} className="logout-btn">Login</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>🌍 Welcome to Code4Climate</h2>
          <p>Explore the world's most advanced AI-powered climate data and weather prediction platform</p>
        </div>

        {/* Current Weather Widget */}
        <div className="weather-section">
          <h3>🌤️ Current Weather Conditions</h3>
          <div className="weather-widget-container">
            <WeatherWidget
              temperature={Math.round(currentWeather.temperature)}
              humidity={Math.round(currentWeather.humidity)}
              windSpeed={Math.round(currentWeather.windSpeed)}
              condition={currentWeather.condition}
              comfortIndex={Math.round(currentWeather.comfortIndex)}
              date={currentWeather.date}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Climate Data Panel */}
        <ClimateDataPanel isDarkMode={isDarkMode} />

        {/* Features Grid */}
        <div className="features-section">
          <h3>🚀 Platform Features</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-enhanced">
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-glow" style={{ background: `linear-gradient(45deg, ${feature.color}, transparent)` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-section">
          <h3>📈 Climate Analytics</h3>
          <div className="charts-grid">
            <div className="chart-container">
              <h4>Global Temperature Trends</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={climateTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#ff6b6b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h4>Weather Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={weatherDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {weatherDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h4>CO2 Concentration vs Sea Level</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={climateTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="co2" fill="#4CAF50" />
                  <Bar dataKey="seaLevel" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-card">
            <div className="cta-content">
              <h3>🔓 Unlock Full Features</h3>
              <p>Create a free account to access advanced weather predictions, personalized comfort analysis, and export detailed reports.</p>
              <div className="cta-buttons">
                <button className="cta-btn primary">Create Free Account</button>
                <button className="cta-btn secondary">Learn More</button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="floating-icons">
                <span className="icon">🌡️</span>
                <span className="icon">📊</span>
                <span className="icon">🗺️</span>
                <span className="icon">🤖</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EnhancedVisitorDashboard;
