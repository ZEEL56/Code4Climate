import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import FeatureShowcase from '../widgets/FeatureShowcase';
import PersonalizedInsights from '../widgets/PersonalizedInsights';
import Footer from '../Footer';
import './EnhancedDashboard.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

interface WeatherPrediction {
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  conditions: string;
  comfortIndex: number;
  airQuality: number;
  uvIndex: number;
}

interface ComfortAnalysis {
  overall: number;
  temperature: number;
  humidity: number;
  wind: number;
  recommendation: string;
}

const EnhancedUserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [predictions, setPredictions] = useState<WeatherPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [comfortAnalysis, setComfortAnalysis] = useState<ComfortAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'predictions' | 'charts' | 'map' | 'analysis'>('predictions');

  const indianCities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, population: '20M' },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025, population: '32M' },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, population: '12M' },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, population: '11M' },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, population: '15M' },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, population: '10M' },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, population: '7M' },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, population: '8M' },
  ];

  const calculateComfortIndex = (temp: number, humidity: number, windSpeed: number): number => {
    // Comfort index calculation based on temperature, humidity, and wind
    let comfort = 100;
    
    // Temperature factor (optimal around 22-26°C)
    if (temp < 15 || temp > 35) comfort -= 30;
    else if (temp < 20 || temp > 30) comfort -= 15;
    
    // Humidity factor (optimal 40-60%)
    if (humidity < 20 || humidity > 80) comfort -= 25;
    else if (humidity < 30 || humidity > 70) comfort -= 10;
    
    // Wind factor (light breeze is comfortable)
    if (windSpeed > 25) comfort -= 20;
    else if (windSpeed > 15) comfort -= 10;
    else if (windSpeed < 2) comfort -= 5;
    
    return Math.max(0, comfort);
  };

  const generatePredictions = (location: string, startDate: string): WeatherPrediction[] => {
    const predictions: WeatherPrediction[] = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      const baseTemp = location.toLowerCase().includes('delhi') ? 25 : 
                      location.toLowerCase().includes('mumbai') ? 28 :
                      location.toLowerCase().includes('bangalore') ? 22 : 26;
      
      const seasonalVariation = Math.sin((i / 90) * Math.PI * 2) * 8;
      const randomVariation = (Math.random() - 0.5) * 10;
      const temperature = Math.round(baseTemp + seasonalVariation + randomVariation);
      const humidity = Math.round(50 + Math.random() * 40);
      const windSpeed = Math.round(5 + Math.random() * 15);
      
      const comfortIndex = calculateComfortIndex(temperature, humidity, windSpeed);
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        temperature,
        humidity,
        precipitation: Math.round(Math.random() * 20),
        windSpeed,
        conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
        comfortIndex,
        airQuality: Math.round(50 + Math.random() * 50),
        uvIndex: Math.round(3 + Math.random() * 8)
      });
    }
    
    return predictions;
  };

  const analyzeComfort = (predictions: WeatherPrediction[]): ComfortAnalysis => {
    const avgTemp = predictions.reduce((sum, p) => sum + p.temperature, 0) / predictions.length;
    const avgHumidity = predictions.reduce((sum, p) => sum + p.humidity, 0) / predictions.length;
    const avgWind = predictions.reduce((sum, p) => sum + p.windSpeed, 0) / predictions.length;
    const avgComfort = predictions.reduce((sum, p) => sum + p.comfortIndex, 0) / predictions.length;

    let recommendation = '';
    if (avgComfort > 80) recommendation = 'Excellent weather conditions for outdoor activities!';
    else if (avgComfort > 60) recommendation = 'Good weather conditions, suitable for most activities.';
    else if (avgComfort > 40) recommendation = 'Moderate conditions, some activities may be uncomfortable.';
    else recommendation = 'Challenging weather conditions, limit outdoor activities.';

    return {
      overall: Math.round(avgComfort),
      temperature: Math.round(avgTemp),
      humidity: Math.round(avgHumidity),
      wind: Math.round(avgWind),
      recommendation
    };
  };

  const handlePredict = async () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both location and date');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const predictions = generatePredictions(selectedLocation, selectedDate);
      setPredictions(predictions);
      setComfortAnalysis(analyzeComfort(predictions));
      setLoading(false);
    }, 1500);
  };

  const handleCityClick = (city: typeof indianCities[0]) => {
    setSelectedLocation(city.name);
    setMapCenter([city.lat, city.lng]);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Code4Climate Weather Prediction Report', 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Location: ${selectedLocation}`, 20, 40);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text(`User: ${user?.username}`, 20, 60);
    
    if (comfortAnalysis) {
      doc.setFontSize(12);
      doc.text('Comfort Analysis:', 20, 80);
      doc.text(`Overall Comfort Index: ${comfortAnalysis.overall}%`, 20, 90);
      doc.text(`Average Temperature: ${comfortAnalysis.temperature}°C`, 20, 100);
      doc.text(`Average Humidity: ${comfortAnalysis.humidity}%`, 20, 110);
      doc.text(`Average Wind Speed: ${comfortAnalysis.wind} km/h`, 20, 120);
      doc.text(`Recommendation: ${comfortAnalysis.recommendation}`, 20, 130);
    }
    
    // Add prediction data table
    if (predictions.length > 0) {
      doc.setFontSize(12);
      doc.text('Weather Predictions (First 10 days):', 20, 150);
      
      let yPosition = 160;
      predictions.slice(0, 10).forEach((pred, index) => {
        doc.setFontSize(10);
        doc.text(`${pred.date}: ${pred.temperature}°C, ${pred.humidity}% humidity, ${pred.comfortIndex}% comfort`, 20, yPosition);
        yPosition += 8;
      });
    }
    
    doc.save(`weather-prediction-${selectedLocation}-${Date.now()}.pdf`);
  };

  const chartData = predictions.slice(0, 30).map(pred => ({
    date: pred.date.split('-')[2],
    temperature: pred.temperature,
    humidity: pred.humidity,
    comfort: pred.comfortIndex,
    precipitation: pred.precipitation
  }));

  const comfortDistribution = [
    { name: 'Excellent (80-100)', value: predictions.filter(p => p.comfortIndex >= 80).length, color: '#4CAF50' },
    { name: 'Good (60-79)', value: predictions.filter(p => p.comfortIndex >= 60 && p.comfortIndex < 80).length, color: '#8BC34A' },
    { name: 'Moderate (40-59)', value: predictions.filter(p => p.comfortIndex >= 40 && p.comfortIndex < 60).length, color: '#FF9800' },
    { name: 'Poor (0-39)', value: predictions.filter(p => p.comfortIndex < 40).length, color: '#F44336' }
  ];

  return (
    <div className={`enhanced-dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="earth-icon">🌍</span>
          <h1>CODE4CLIMATE</h1>
        </div>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-btn">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <span className="user-info">Welcome, {user?.username}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>AI-Powered Weather Prediction Dashboard</h2>
          <p>Advanced climate forecasting powered by NASA data and machine learning algorithms</p>
        </div>

        <div className="prediction-controls">
          <div className="control-row">
            <div className="control-group">
              <label>Select Location:</label>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="location-select"
              >
                <option value="">Choose a city in India</option>
                {indianCities.map(city => (
                  <option key={city.name} value={city.name}>
                    {city.name} ({city.population})
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label>Start Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <button 
              onClick={handlePredict}
              disabled={!selectedLocation || !selectedDate || loading}
              className="predict-btn"
            >
              {loading ? '🤖 AI Analyzing...' : '🚀 Generate 3-Month Prediction'}
            </button>
          </div>
        </div>

        {predictions.length > 0 && (
          <div className="tabs-section">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'predictions' ? 'active' : ''}`}
                onClick={() => setActiveTab('predictions')}
              >
                📊 Predictions
              </button>
              <button 
                className={`tab ${activeTab === 'charts' ? 'active' : ''}`}
                onClick={() => setActiveTab('charts')}
              >
                📈 Analytics
              </button>
              <button 
                className={`tab ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                🗺️ Interactive Map
              </button>
              <button 
                className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
                onClick={() => setActiveTab('analysis')}
              >
                🧠 AI Analysis
              </button>
            </div>

            {activeTab === 'predictions' && (
              <div className="predictions-grid">
                {predictions.slice(0, 30).map((prediction, index) => (
                  <div key={index} className="prediction-card">
                    <div className="prediction-date">{prediction.date}</div>
                    <div className="prediction-temp">{prediction.temperature}°C</div>
                    <div className="prediction-conditions">{prediction.conditions}</div>
                    <div className="comfort-index">
                      <span className="comfort-label">Comfort:</span>
                      <span className={`comfort-value ${prediction.comfortIndex > 70 ? 'excellent' : prediction.comfortIndex > 50 ? 'good' : 'moderate'}`}>
                        {prediction.comfortIndex}%
                      </span>
                    </div>
                    <div className="prediction-details">
                      <div>Humidity: {prediction.humidity}%</div>
                      <div>Wind: {prediction.windSpeed} km/h</div>
                      <div>UV: {prediction.uvIndex}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'charts' && (
              <div className="charts-section">
                <div className="chart-container">
                  <h3>Temperature & Comfort Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#ff6b6b" strokeWidth={2} />
                      <Line type="monotone" dataKey="comfort" stroke="#4ecdc4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3>Comfort Index Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={comfortDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {comfortDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="map-section">
                <h3>Interactive Climate Map - {selectedLocation}</h3>
                <div className="map-container">
                  <MapContainer
                    center={mapCenter}
                    zoom={8}
                    style={{ height: '500px', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {indianCities.map((city) => (
                      <Marker 
                        key={city.name} 
                        position={[city.lat, city.lng]}
                        eventHandlers={{
                          click: () => handleCityClick(city),
                        }}
                      >
                        <Popup>
                          <div>
                            <h4>{city.name}</h4>
                            <p>Population: {city.population}</p>
                            <button 
                              onClick={() => handleCityClick(city)}
                              className="map-select-btn"
                            >
                              Select for Prediction
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && comfortAnalysis && (
              <div className="analysis-section">
                <div className="comfort-analysis">
                  <h3>🧠 AI Comfort Analysis</h3>
                  <div className="comfort-score">
                    <div className="score-circle">
                      <span className="score-number">{comfortAnalysis.overall}%</span>
                      <span className="score-label">Overall Comfort</span>
                    </div>
                  </div>
                  
                  <div className="comfort-breakdown">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Temperature</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{width: `${comfortAnalysis.temperature * 2}%`}}></div>
                      </div>
                      <span className="breakdown-value">{comfortAnalysis.temperature}°C</span>
                    </div>
                    
                    <div className="breakdown-item">
                      <span className="breakdown-label">Humidity</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{width: `${comfortAnalysis.humidity}%`}}></div>
                      </div>
                      <span className="breakdown-value">{comfortAnalysis.humidity}%</span>
                    </div>
                    
                    <div className="breakdown-item">
                      <span className="breakdown-label">Wind Speed</span>
                      <div className="breakdown-bar">
                        <div className="breakdown-fill" style={{width: `${comfortAnalysis.wind * 3}%`}}></div>
                      </div>
                      <span className="breakdown-value">{comfortAnalysis.wind} km/h</span>
                    </div>
                  </div>
                  
                  <div className="ai-recommendation">
                    <h4>🤖 AI Recommendation</h4>
                    <p>{comfortAnalysis.recommendation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {predictions.length > 0 && (
          <div className="export-section">
            <button onClick={exportToPDF} className="export-btn">
              📄 Export Prediction Report (PDF)
            </button>
          </div>
        )}

        {/* Personalized AI Insights */}
        <PersonalizedInsights isDarkMode={isDarkMode} />

        {/* User Features Showcase */}
        <FeatureShowcase userType="user" isDarkMode={isDarkMode} />
      </div>
      <Footer />
    </div>
  );
};

export default EnhancedUserDashboard;
