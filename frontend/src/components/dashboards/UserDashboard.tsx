import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface WeatherPrediction {
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  conditions: string;
}

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [predictions, setPredictions] = useState<WeatherPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center

  const indianCities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  ];

  const generatePredictions = (location: string, startDate: string): WeatherPrediction[] => {
    const predictions: WeatherPrediction[] = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      // Simulate NASA data-based predictions with realistic variations
      const baseTemp = location.toLowerCase().includes('delhi') ? 25 : 
                      location.toLowerCase().includes('mumbai') ? 28 :
                      location.toLowerCase().includes('bangalore') ? 22 : 26;
      
      const seasonalVariation = Math.sin((i / 90) * Math.PI * 2) * 8;
      const randomVariation = (Math.random() - 0.5) * 10;
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        temperature: Math.round(baseTemp + seasonalVariation + randomVariation),
        humidity: Math.round(50 + Math.random() * 40),
        precipitation: Math.round(Math.random() * 20),
        windSpeed: Math.round(5 + Math.random() * 15),
        conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)]
      });
    }
    
    return predictions;
  };

  const handlePredict = async () => {
    if (!selectedLocation || !selectedDate) {
      alert('Please select both location and date');
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const predictions = generatePredictions(selectedLocation, selectedDate);
      setPredictions(predictions);
      setLoading(false);
    }, 1500);
  };

  const handleCityClick = (city: typeof indianCities[0]) => {
    setSelectedLocation(city.name);
    setMapCenter([city.lat, city.lng]);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="earth-icon">🌍</span>
          <h1>CODE4CLIMATE</h1>
        </div>
        <div className="nav-actions">
          <span className="user-info">Welcome, {user?.username}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Weather Prediction Dashboard</h2>
          <p>Powered by NASA Earth observation data - Predict weather for 3 months ahead</p>
        </div>

        <div className="prediction-controls">
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
                  {city.name}
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
            {loading ? 'Generating Predictions...' : 'Generate 3-Month Prediction'}
          </button>
        </div>

        <div className="map-section">
          <h3>India Map - Click on cities to select</h3>
          <div className="map-container">
            <MapContainer
              center={mapCenter}
              zoom={5}
              style={{ height: '400px', width: '100%' }}
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
                      <button 
                        onClick={() => handleCityClick(city)}
                        style={{ 
                          padding: '5px 10px', 
                          background: '#4CAF50', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
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

        {predictions.length > 0 && (
          <div className="predictions-section">
            <h3>3-Month Weather Predictions for {selectedLocation}</h3>
            <div className="predictions-grid">
              {predictions.slice(0, 30).map((prediction, index) => (
                <div key={index} className="prediction-card">
                  <div className="prediction-date">{prediction.date}</div>
                  <div className="prediction-temp">{prediction.temperature}°C</div>
                  <div className="prediction-conditions">{prediction.conditions}</div>
                  <div className="prediction-details">
                    <div>Humidity: {prediction.humidity}%</div>
                    <div>Rain: {prediction.precipitation}mm</div>
                    <div>Wind: {prediction.windSpeed} km/h</div>
                  </div>
                </div>
              ))}
            </div>
            {predictions.length > 30 && (
              <div className="more-predictions">
                <p>Showing first 30 days of 90-day prediction</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
