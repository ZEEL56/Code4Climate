import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './WeatherWidget.css';

interface WeatherWidgetProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  comfortIndex: number;
  date: string;
  isDarkMode?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  temperature,
  humidity,
  windSpeed,
  condition,
  comfortIndex,
  date,
  isDarkMode = false
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'stormy':
        return '⛈️';
      case 'snowy':
        return '❄️';
      default:
        return '🌤️';
    }
  };

  const getComfortColor = (comfort: number) => {
    if (comfort >= 80) return '#4CAF50';
    if (comfort >= 60) return '#8BC34A';
    if (comfort >= 40) return '#FF9800';
    return '#F44336';
  };

  const getComfortLabel = (comfort: number) => {
    if (comfort >= 80) return 'Excellent';
    if (comfort >= 60) return 'Good';
    if (comfort >= 40) return 'Moderate';
    return 'Poor';
  };

  return (
    <div className={`weather-widget ${isDarkMode ? 'dark' : ''}`}>
      <div className="widget-header">
        <div className="weather-icon">{getWeatherIcon(condition)}</div>
        <div className="weather-info">
          <div className="temperature">{temperature}°C</div>
          <div className="condition">{condition}</div>
          <div className="date">{date}</div>
        </div>
      </div>

      <div className="widget-body">
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon">💧</div>
            <div className="metric-value">{humidity}%</div>
            <div className="metric-label">Humidity</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-icon">💨</div>
            <div className="metric-value">{windSpeed} km/h</div>
            <div className="metric-label">Wind</div>
          </div>
        </div>

        <div className="comfort-section">
          <div className="comfort-label">Comfort Index</div>
          <div className="comfort-bar">
            <div 
              className="comfort-fill"
              style={{ 
                width: `${comfortIndex}%`,
                backgroundColor: getComfortColor(comfortIndex)
              }}
            ></div>
          </div>
          <div className="comfort-value" style={{ color: getComfortColor(comfortIndex) }}>
            {comfortIndex}% - {getComfortLabel(comfortIndex)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
