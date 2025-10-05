import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import Card from '../components/ui/Card';
import ChartCard from '../components/charts/ChartCard';
import MapCard from '../components/maps/MapCard';
import LoadingScreen from '../components/ui/LoadingScreen';
import { mockApi } from '../services/mockApi';
import type { ChartData, MapMarker } from '../types';

interface WeatherVariable {
  id: string;
  name: string;
  icon: string;
  unit: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
}

const UserDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [customLocation, setCustomLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedVariables, setSelectedVariables] = useState<string[]>(['temperature', 'rainfall']);
  const [temperatureData, setTemperatureData] = useState<ChartData[]>([]);
  const [rainfallData, setRainfallData] = useState<ChartData[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);

  const indianCities = [
    { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 }
  ];

  const weatherVariables: WeatherVariable[] = [
    { id: 'temperature', name: 'Temperature', icon: '🌡️', unit: '°C', value: 28, trend: 'up' },
    { id: 'rainfall', name: 'Rainfall', icon: '🌧️', unit: 'mm', value: 45, trend: 'down' },
    { id: 'wind', name: 'Wind Speed', icon: '💨', unit: 'km/h', value: 15, trend: 'stable' },
    { id: 'humidity', name: 'Humidity', icon: '💧', unit: '%', value: 65, trend: 'up' },
    { id: 'airquality', name: 'Air Quality', icon: '🌫️', unit: 'AQI', value: 120, trend: 'down' }
  ];

  const weatherProbabilities = [
    { condition: 'Sunny', probability: 65, icon: '☀️', color: '#f59e0b' },
    { condition: 'Cloudy', probability: 25, icon: '☁️', color: '#6b7280' },
    { condition: 'Rainy', probability: 10, icon: '🌧️', color: '#3b82f6' }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTemperatureData([
          { name: 'Mon', value: 28 },
          { name: 'Tue', value: 30 },
          { name: 'Wed', value: 29 },
          { name: 'Thu', value: 31 },
          { name: 'Fri', value: 32 },
          { name: 'Sat', value: 30 },
          { name: 'Sun', value: 29 }
        ]);

        setRainfallData([
          { name: 'Mon', value: 5 },
          { name: 'Tue', value: 12 },
          { name: 'Wed', value: 8 },
          { name: 'Thu', value: 0 },
          { name: 'Fri', value: 3 },
          { name: 'Sat', value: 15 },
          { name: 'Sun', value: 10 }
        ]);

        const markers = await mockApi.getMapMarkers();
        setMapMarkers(markers);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCity, dateRange]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const cityData = indianCities.find(c => c.name === city);
    if (cityData) {
      setCustomLocation({ lat: cityData.lat, lng: cityData.lng });
    }
  };

  const toggleVariable = (varId: string) => {
    setSelectedVariables(prev =>
      prev.includes(varId) ? prev.filter(v => v !== varId) : [...prev, varId]
    );
  };

  const calculateComfortIndex = () => {
    const temp = weatherVariables.find(v => v.id === 'temperature')?.value || 0;
    const humidity = weatherVariables.find(v => v.id === 'humidity')?.value || 0;
    const aqi = weatherVariables.find(v => v.id === 'airquality')?.value || 0;
    
    let score = 100;
    if (temp < 15 || temp > 35) score -= 20;
    if (humidity > 70) score -= 15;
    if (aqi > 100) score -= 25;
    
    return Math.max(0, score);
  };

  const getComfortSuggestion = (score: number) => {
    if (score >= 80) return { text: 'Excellent conditions for outdoor activities!', color: '#10b981' };
    if (score >= 60) return { text: 'Good weather, suitable for most activities', color: '#3b82f6' };
    if (score >= 40) return { text: 'Moderate conditions, take precautions', color: '#f59e0b' };
    return { text: 'Poor conditions, stay indoors if possible', color: '#ef4444' };
  };

  const handleExportPDF = () => {
    alert('Exporting climate data as PDF... (Feature will be implemented with jsPDF library)');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const comfortScore = calculateComfortIndex();
  const comfortSuggestion = getComfortSuggestion(comfortScore);

  return (
    <ResponsiveLayout title="Climate Prediction Portal">
      {/* Location Input Section */}
      <Card title="📍 Location Selection" subtitle="Choose your location for climate predictions">
        <div className="location-input-grid">
          <div className="input-section">
            <label className="input-label">Select City</label>
            <select 
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="location-select"
            >
              {indianCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>

          <div className="input-section">
            <label className="input-label">Custom Coordinates</label>
            <div className="coordinates-input">
              <input
                type="number"
                step="0.0001"
                value={customLocation.lat}
                onChange={(e) => setCustomLocation({...customLocation, lat: parseFloat(e.target.value)})}
                placeholder="Latitude"
                className="coordinate-input"
              />
              <input
                type="number"
                step="0.0001"
                value={customLocation.lng}
                onChange={(e) => setCustomLocation({...customLocation, lng: parseFloat(e.target.value)})}
                placeholder="Longitude"
                className="coordinate-input"
              />
            </div>
          </div>

          <div className="input-section">
            <label className="input-label">📅 Date Range</label>
            <div className="date-range-input">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="date-input"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="date-input"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Variable Selector */}
      <Card title="🔬 Climate Variables" subtitle="Select variables to analyze">
        <div className="variables-grid">
          {weatherVariables.map(variable => (
            <div
              key={variable.id}
              onClick={() => toggleVariable(variable.id)}
              className={`variable-card ${selectedVariables.includes(variable.id) ? 'variable-selected' : ''}`}
            >
              <div className="variable-icon">{variable.icon}</div>
              <div className="variable-name">{variable.name}</div>
              <div className="variable-value">{variable.value}{variable.unit}</div>
              <div className={`variable-trend trend-${variable.trend}`}>
                {variable.trend === 'up' && '↑'}
                {variable.trend === 'down' && '↓'}
                {variable.trend === 'stable' && '→'}
              </div>
              {selectedVariables.includes(variable.id) && <div className="variable-check">✓</div>}
            </div>
          ))}
        </div>
      </Card>

      {/* Weather Probability Cards */}
      <Card title="🌤️ Weather Forecast Probability" subtitle="7-day weather prediction">
        <div className="probability-cards-grid">
          {weatherProbabilities.map((weather, index) => (
            <div key={index} className="probability-card" style={{ borderColor: weather.color }}>
              <div className="probability-icon">{weather.icon}</div>
              <div className="probability-condition">{weather.condition}</div>
              <div className="probability-bar-container">
                <div 
                  className="probability-bar" 
                  style={{ width: `${weather.probability}%`, backgroundColor: weather.color }}
                ></div>
              </div>
              <div className="probability-value">{weather.probability}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Interactive Map */}
      <MapCard
        title="🗺️ Interactive Climate Map"
        subtitle="Climate zones and monitoring stations across India"
        markers={mapMarkers}
        height={450}
        center={[customLocation.lat, customLocation.lng]}
        zoom={8}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Temperature Trends"
          subtitle="7-day temperature forecast (°C)"
          data={temperatureData}
          type="bar"
          height={300}
        />
        
        <ChartCard
          title="Rainfall Prediction"
          subtitle="Expected precipitation (mm)"
          data={rainfallData}
          type="bar"
          height={300}
        />
      </div>

      {/* Comfort Index */}
      <Card title="🎯 Travel Comfort Index" subtitle="AI-powered comfort score for your location">
        <div className="comfort-index-container">
          <div className="comfort-score-circle" style={{ borderColor: comfortSuggestion.color }}>
            <div className="comfort-score-value" style={{ color: comfortSuggestion.color }}>
              {comfortScore}
            </div>
            <div className="comfort-score-label">Comfort Score</div>
          </div>
          <div className="comfort-details">
            <div className="comfort-suggestion" style={{ backgroundColor: `${comfortSuggestion.color}20`, borderLeft: `4px solid ${comfortSuggestion.color}` }}>
              <div className="suggestion-icon">💡</div>
              <div className="suggestion-text">{comfortSuggestion.text}</div>
            </div>
            <div className="comfort-factors">
              <div className="factor-item">
                <span className="factor-label">Temperature:</span>
                <span className="factor-value">Optimal</span>
              </div>
              <div className="factor-item">
                <span className="factor-label">Humidity:</span>
                <span className="factor-value">Moderate</span>
              </div>
              <div className="factor-item">
                <span className="factor-label">Air Quality:</span>
                <span className="factor-value">Fair</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* NASA Data Info Panel */}
      <Card title="🛰️ NASA Data Sources" subtitle="Official satellite and climate data">
        <div className="nasa-info-grid">
          <div className="nasa-info-card">
            <div className="nasa-info-icon">🛰️</div>
            <h4 className="nasa-info-title">MODIS Satellite</h4>
            <p className="nasa-info-desc">Terra & Aqua satellites providing daily climate observations</p>
          </div>
          <div className="nasa-info-card">
            <div className="nasa-info-icon">🌍</div>
            <h4 className="nasa-info-title">GISS Surface Temp</h4>
            <p className="nasa-info-desc">Global surface temperature analysis from NASA GISS</p>
          </div>
          <div className="nasa-info-card">
            <div className="nasa-info-icon">☁️</div>
            <h4 className="nasa-info-title">AIRS Data</h4>
            <p className="nasa-info-desc">Atmospheric Infrared Sounder for humidity & temperature</p>
          </div>
        </div>
      </Card>

      {/* Alerts Section */}
      <Card title="⚠️ Climate Alerts" subtitle="Important weather warnings">
        <div className="alerts-container">
          <div className="alert-item alert-warning">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <div className="alert-title">High Temperature Alert</div>
              <div className="alert-message">Temperature expected to reach 38°C on Thursday. Stay hydrated!</div>
            </div>
          </div>
          <div className="alert-item alert-info">
            <div className="alert-icon">💧</div>
            <div className="alert-content">
              <div className="alert-title">Monsoon Update</div>
              <div className="alert-message">Moderate rainfall expected this weekend. Plan accordingly.</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Export Data */}
      <Card title="📥 Export Climate Data" subtitle="Download your analysis">
        <div className="export-section">
          <button onClick={handleExportPDF} className="export-btn">
            <span className="export-icon">📄</span>
            <span>Export as PDF</span>
          </button>
          <p className="export-info">Download complete climate analysis report with charts and predictions</p>
        </div>
      </Card>

      {/* Footer with Credits */}
      <div className="dashboard-footer">
        <div className="footer-section">
          <h4 className="footer-title">🛰️ NASA Open Data</h4>
          <p className="footer-text">Powered by NASA Earth Observing System Data and Information System (EOSDIS)</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">👥 Team Info</h4>
          <p className="footer-text">ClimateTrack Development Team • Weather Vision Initiative</p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-title">🔗 Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-link">🐦 Twitter</a>
            <a href="#" className="social-link">💼 LinkedIn</a>
            <a href="#" className="social-link">📧 Email</a>
            <a href="#" className="social-link">🌐 Website</a>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default UserDashboard;