import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './FeatureShowcase.css';

interface FeatureShowcaseProps {
  userType: 'visitor' | 'user';
  isDarkMode?: boolean;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ userType, isDarkMode = false }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const visitorFeatures = [
    {
      icon: '🌍',
      title: 'Global Climate Data',
      description: 'Access real-time climate data from NASA Earth Observatory and meteorological stations worldwide',
      color: '#4CAF50',
      animation: 'pulse',
      premium: false
    },
    {
      icon: '📊',
      title: 'Interactive Analytics',
      description: 'Explore climate trends through interactive charts, graphs, and data visualizations',
      color: '#2196F3',
      animation: 'bounce',
      premium: false
    },
    {
      icon: '🗺️',
      title: 'Climate Maps',
      description: 'Visualize climate data on interactive maps with satellite imagery and weather patterns',
      color: '#FF9800',
      animation: 'rotate',
      premium: false
    },
    {
      icon: '🔬',
      title: 'Scientific Research',
      description: 'Access peer-reviewed climate research and scientific publications',
      color: '#9C27B0',
      animation: 'float',
      premium: false
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes',
      color: '#00BCD4',
      animation: 'shake',
      premium: false
    },
    {
      icon: '🌱',
      title: 'Environmental Impact',
      description: 'Learn about environmental changes and their global impact on ecosystems',
      color: '#8BC34A',
      animation: 'glow',
      premium: false
    }
  ];

  const userFeatures = [
    {
      icon: '🤖',
      title: 'AI Weather Predictions',
      description: 'Advanced machine learning algorithms predict weather patterns up to 3 months ahead with 85% accuracy',
      color: '#4CAF50',
      animation: 'pulse',
      premium: true
    },
    {
      icon: '🧠',
      title: 'Comfort Index Analysis',
      description: 'AI-powered comfort analysis considers temperature, humidity, wind, and UV index for optimal planning',
      color: '#2196F3',
      animation: 'bounce',
      premium: true
    },
    {
      icon: '📄',
      title: 'PDF Export Reports',
      description: 'Generate comprehensive weather reports and export them as professional PDF documents',
      color: '#FF9800',
      animation: 'rotate',
      premium: true
    },
    {
      icon: '🎯',
      title: 'Location-Specific Forecasts',
      description: 'Get detailed weather predictions for specific locations across India with city-level accuracy',
      color: '#9C27B0',
      animation: 'float',
      premium: true
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Live weather data updates every 10 minutes with NASA satellite integration',
      color: '#00BCD4',
      animation: 'shake',
      premium: false
    },
    {
      icon: '📈',
      title: 'Trend Analysis',
      description: 'Historical weather data analysis with seasonal patterns and climate trend predictions',
      color: '#8BC34A',
      animation: 'glow',
      premium: false
    },
    {
      icon: '🌡️',
      title: 'Health Alerts',
      description: 'Personalized health alerts based on weather conditions and air quality index',
      color: '#F44336',
      animation: 'pulse',
      premium: true
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Get notified about weather changes, extreme conditions, and optimal outdoor times',
      color: '#795548',
      animation: 'bounce',
      premium: true
    }
  ];

  const features = userType === 'visitor' ? visitorFeatures : userFeatures;

  const getAnimationClass = (animation: string) => {
    return `feature-animation-${animation}`;
  };

  return (
    <div className={`feature-showcase ${isDarkMode ? 'dark' : ''}`}>
      <div className="showcase-header">
        <h3>🚀 Platform Features</h3>
        <p>Discover the powerful capabilities of Code4Climate</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`feature-card ${activeFeature === index ? 'active' : ''} ${getAnimationClass(feature.animation)}`}
            style={{ '--feature-color': feature.color } as React.CSSProperties}
            onMouseEnter={() => setActiveFeature(index)}
            onClick={() => setActiveFeature(index)}
          >
            {feature.premium && (
              <div className="premium-badge">
                <span>⭐</span>
                <span>Premium</span>
              </div>
            )}
            
            <div className="feature-icon" style={{ color: feature.color }}>
              {feature.icon}
            </div>
            
            <div className="feature-content">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
            
            <div className="feature-glow" style={{ background: `linear-gradient(45deg, ${feature.color}, transparent)` }}></div>
            
            {activeFeature === index && (
              <div className="feature-overlay">
                <div className="overlay-content">
                  <h5>Try it now!</h5>
                  <button className="try-button">Explore Feature</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="feature-navigation">
        <div className="nav-dots">
          {features.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${activeFeature === index ? 'active' : ''}`}
              onClick={() => setActiveFeature(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
