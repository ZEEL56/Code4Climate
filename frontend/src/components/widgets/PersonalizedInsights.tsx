import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './PersonalizedInsights.css';

interface PersonalizedInsightsProps {
  isDarkMode?: boolean;
}

const PersonalizedInsights: React.FC<PersonalizedInsightsProps> = ({ isDarkMode = false }) => {
  const [insights, setInsights] = useState([
    {
      type: 'recommendation',
      title: 'Best Time for Outdoor Activities',
      description: 'Based on current conditions, 2-4 PM is optimal for outdoor activities',
      icon: '🌞',
      priority: 'high',
      timeLeft: '3 hours'
    },
    {
      type: 'alert',
      title: 'UV Index Alert',
      description: 'High UV levels detected. Sunscreen recommended for outdoor activities',
      icon: '⚠️',
      priority: 'medium',
      timeLeft: 'All day'
    },
    {
      type: 'prediction',
      title: 'Weather Trend',
      description: 'Temperature expected to rise by 3°C over the next 2 days',
      icon: '📈',
      priority: 'low',
      timeLeft: '2 days'
    },
    {
      type: 'health',
      title: 'Air Quality Update',
      description: 'Good air quality conditions. Perfect for outdoor exercise',
      icon: '💨',
      priority: 'high',
      timeLeft: '6 hours'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#2196F3';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return '💡';
      case 'alert': return '🚨';
      case 'prediction': return '🔮';
      case 'health': return '🏥';
      default: return '📊';
    }
  };

  return (
    <div className={`personalized-insights ${isDarkMode ? 'dark' : ''}`}>
      <div className="insights-header">
        <div className="header-content">
          <h3>🧠 AI Personal Insights</h3>
          <p>Personalized weather recommendations just for you</p>
          <div className="last-updated">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="ai-brain">
          <span className="brain-icon">🤖</span>
          <div className="brain-pulse"></div>
        </div>
      </div>

      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`insight-card ${insight.type} ${insight.priority}`}
            style={{ '--priority-color': getPriorityColor(insight.priority) } as React.CSSProperties}
          >
            <div className="card-header">
              <div className="type-icon">{getTypeIcon(insight.type)}</div>
              <div className="priority-indicator">
                <span 
                  className="priority-dot"
                  style={{ backgroundColor: getPriorityColor(insight.priority) }}
                ></span>
                <span className="priority-text">{insight.priority}</span>
              </div>
            </div>

            <div className="card-body">
              <div className="insight-icon">{insight.icon}</div>
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>

            <div className="card-footer">
              <div className="time-indicator">
                <span className="time-icon">⏰</span>
                <span className="time-text">{insight.timeLeft}</span>
              </div>
              <button className="action-btn">Learn More</button>
            </div>

            <div className="card-glow"></div>
          </div>
        ))}
      </div>

      <div className="insights-summary">
        <div className="summary-card">
          <h4>📊 Your Weather Profile</h4>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">85%</span>
              <span className="stat-label">Prediction Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-value">12</span>
              <span className="stat-label">Active Alerts</span>
            </div>
            <div className="stat">
              <span className="stat-value">7</span>
              <span className="stat-label">Saved Locations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedInsights;
