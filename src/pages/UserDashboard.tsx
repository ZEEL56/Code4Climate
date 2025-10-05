import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import Card from '../components/ui/Card';
import ChartCard from '../components/charts/ChartCard';
import LoadingScreen from '../components/ui/LoadingScreen';
import { mockApi } from '../services/mockApi';
import type { ChartData } from '../types';

interface CityForecast {
  city: string;
  state: string;
  temp: number;
  condition: string;
  precipitation: number;
  humidity: number;
  icon: string;
  recommendation: string;
}

const UserDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [temperatureData, setTemperatureData] = useState<ChartData[]>([]);
  const [precipitationData, setPrecipitationData] = useState<ChartData[]>([]);

  const cityForecasts: CityForecast[] = [
    { city: 'Mumbai', state: 'Maharashtra', temp: 32, condition: 'Partly Cloudy', precipitation: 45, humidity: 78, icon: '⛅', recommendation: 'Good for travel' },
    { city: 'Delhi', state: 'Delhi', temp: 28, condition: 'Clear', precipitation: 10, humidity: 45, icon: '☀️', recommendation: 'Excellent for sightseeing' },
    { city: 'Bangalore', state: 'Karnataka', temp: 25, condition: 'Pleasant', precipitation: 20, humidity: 60, icon: '🌤️', recommendation: 'Perfect weather' },
    { city: 'Chennai', state: 'Tamil Nadu', temp: 34, condition: 'Hot & Humid', precipitation: 55, humidity: 82, icon: '🌡️', recommendation: 'Stay hydrated' },
    { city: 'Kolkata', state: 'West Bengal', temp: 31, condition: 'Humid', precipitation: 40, humidity: 75, icon: '☁️', recommendation: 'Carry umbrella' },
    { city: 'Jaipur', state: 'Rajasthan', temp: 38, condition: 'Very Hot', precipitation: 5, humidity: 25, icon: '🔥', recommendation: 'Avoid midday sun' },
    { city: 'Goa', state: 'Goa', temp: 30, condition: 'Tropical', precipitation: 65, humidity: 80, icon: '🌴', recommendation: 'Beach weather' },
    { city: 'Shimla', state: 'Himachal Pradesh', temp: 18, condition: 'Cool', precipitation: 15, humidity: 55, icon: '🏔️', recommendation: 'Ideal for trekking' },
  ];

  const climateZones = [
    { name: 'Tropical Wet', color: '#10b981', regions: 'Kerala, Goa, Western Ghats' },
    { name: 'Tropical Dry', color: '#f59e0b', regions: 'Central India, Deccan Plateau' },
    { name: 'Subtropical Humid', color: '#3b82f6', regions: 'Northern Plains, Eastern India' },
    { name: 'Mountain', color: '#8b5cf6', regions: 'Himalayas, Kashmir' },
    { name: 'Arid', color: '#ef4444', regions: 'Rajasthan, Gujarat' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading climate data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTemperatureData([
          { name: 'Jan', value: 22 },
          { name: 'Feb', value: 24 },
          { name: 'Mar', value: 28 },
          { name: 'Apr', value: 32 },
          { name: 'May', value: 35 },
          { name: 'Jun', value: 33 },
          { name: 'Jul', value: 30 },
          { name: 'Aug', value: 29 },
          { name: 'Sep', value: 30 },
          { name: 'Oct', value: 28 },
          { name: 'Nov', value: 25 },
          { name: 'Dec', value: 23 },
        ]);

        setPrecipitationData([
          { name: 'Jan', value: 15 },
          { name: 'Feb', value: 20 },
          { name: 'Mar', value: 25 },
          { name: 'Apr', value: 35 },
          { name: 'May', value: 60 },
          { name: 'Jun', value: 150 },
          { name: 'Jul', value: 280 },
          { name: 'Aug', value: 250 },
          { name: 'Sep', value: 180 },
          { name: 'Oct', value: 90 },
          { name: 'Nov', value: 40 },
          { name: 'Dec', value: 20 },
        ]);
      } catch (error) {
        console.error('Error loading climate data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout title="Climate Prediction Portal">
      {/* Hero Section */}
      <div className="climate-hero-section">
        <div className="climate-hero-content">
          <h2 className="climate-hero-title">🇮🇳 Climate Forecast Prediction for India</h2>
          <p className="climate-hero-subtitle">
            Plan your travel with AI-powered climate predictions and real-time weather data across India
          </p>
        </div>
      </div>

      {/* Climate Zones */}
      <Card title="India Climate Zones" subtitle="Understanding regional climate patterns">
        <div className="climate-zones-grid">
          {climateZones.map((zone) => (
            <div key={zone.name} className="climate-zone-card">
              <div className="climate-zone-indicator" style={{ backgroundColor: zone.color }}></div>
              <div className="climate-zone-info">
                <h4 className="climate-zone-name">{zone.name}</h4>
                <p className="climate-zone-regions">{zone.regions}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* India Map Placeholder */}
      <Card title="Interactive India Climate Map" subtitle="Regional climate zones and current conditions">
        <div className="india-map-container">
          <div className="india-map-placeholder">
            <div className="map-content">
              <div className="india-map-icon">🗺️</div>
              <h3 className="map-title">India Climate Zones Map</h3>
              <p className="map-description">
                Interactive visualization showing climate zones, temperature patterns, and precipitation across India
              </p>
              <div className="map-legend">
                {climateZones.map((zone) => (
                  <div key={zone.name} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: zone.color }}></div>
                    <span className="legend-label">{zone.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* City Forecasts */}
      <Card title="Major Cities Weather Forecast" subtitle="Current conditions and 7-day predictions">
        <div className="city-forecasts-grid">
          {cityForecasts.map((forecast) => (
            <div key={forecast.city} className="city-forecast-card">
              <div className="city-forecast-header">
                <div>
                  <h4 className="city-name">{forecast.city}</h4>
                  <p className="city-state">{forecast.state}</p>
                </div>
                <div className="weather-icon">{forecast.icon}</div>
              </div>
              <div className="temperature-display">
                <span className="temp-value">{forecast.temp}°C</span>
                <span className="temp-condition">{forecast.condition}</span>
              </div>
              <div className="forecast-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <span className="detail-text">{forecast.precipitation}mm</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💨</span>
                  <span className="detail-text">{forecast.humidity}%</span>
                </div>
              </div>
              <div className="travel-recommendation">
                <span className="recommendation-icon">✈️</span>
                <span className="recommendation-text">{forecast.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Climate Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Annual Temperature Trends"
          subtitle="Average monthly temperature across India (°C)"
          data={temperatureData}
          type="line"
          height={300}
        />
        
        <ChartCard
          title="Monsoon & Precipitation Patterns"
          subtitle="Monthly rainfall distribution (mm)"
          data={precipitationData}
          type="bar"
          height={300}
        />
      </div>

      {/* Travel Recommendations */}
      <Card title="Best Time to Visit" subtitle="Seasonal travel recommendations for India">
        <div className="seasonal-recommendations">
          <div className="season-card">
            <div className="season-icon">🌸</div>
            <h4 className="season-name">Spring (Feb-Mar)</h4>
            <p className="season-desc">Pleasant weather, ideal for North India and hill stations</p>
            <div className="season-temp">18-28°C</div>
          </div>
          <div className="season-card">
            <div className="season-icon">☀️</div>
            <h4 className="season-name">Summer (Apr-Jun)</h4>
            <p className="season-desc">Visit hill stations and coastal areas to beat the heat</p>
            <div className="season-temp">25-40°C</div>
          </div>
          <div className="season-card">
            <div className="season-icon">🌧️</div>
            <h4 className="season-name">Monsoon (Jul-Sep)</h4>
            <p className="season-desc">Experience lush greenery in Western Ghats and Northeast</p>
            <div className="season-temp">25-35°C</div>
          </div>
          <div className="season-card">
            <div className="season-icon">🍂</div>
            <h4 className="season-name">Winter (Oct-Jan)</h4>
            <p className="season-desc">Perfect for exploring Rajasthan, South India, and beaches</p>
            <div className="season-temp">10-25°C</div>
          </div>
        </div>
      </Card>
    </ResponsiveLayout>
  );
};

export default UserDashboard;