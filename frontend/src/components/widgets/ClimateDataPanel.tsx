import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ClimateDataPanel.css';

interface ClimateDataPanelProps {
  isDarkMode?: boolean;
}

const ClimateDataPanel: React.FC<ClimateDataPanelProps> = ({ isDarkMode = false }) => {
  const climateData = [
    { 
      label: 'Global Temperature', 
      value: '+1.1°C', 
      change: '+0.2°C', 
      icon: '🌡️',
      status: 'warning',
      description: 'Above pre-industrial average'
    },
    { 
      label: 'Sea Level Rise', 
      value: '3.3mm/year', 
      change: '+0.4mm', 
      icon: '🌊',
      status: 'critical',
      description: 'Current global rate'
    },
    { 
      label: 'CO2 Concentration', 
      value: '417 ppm', 
      change: '+2.1 ppm', 
      icon: '☁️',
      status: 'critical',
      description: 'Atmospheric levels'
    },
    { 
      label: 'Arctic Ice Loss', 
      value: '13.1%', 
      change: '-0.8%', 
      icon: '🧊',
      status: 'warning',
      description: 'Per decade since 1980s'
    },
    { 
      label: 'Renewable Energy', 
      value: '29.4%', 
      change: '+3.2%', 
      icon: '☀️',
      status: 'positive',
      description: 'Global electricity share'
    },
    { 
      label: 'Carbon Footprint', 
      value: '4.8 tons', 
      change: '-0.3 tons', 
      icon: '👣',
      status: 'positive',
      description: 'Global per capita average'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <div className={`climate-data-panel ${isDarkMode ? 'dark' : ''}`}>
      <div className="panel-header">
        <div className="nasa-logo">
          <span className="logo-icon">🚀</span>
          <div className="logo-text">
            <h3>NASA Climate Data</h3>
            <p>Real-time Earth Observation</p>
          </div>
        </div>
      </div>

      <div className="data-grid">
        {climateData.map((item, index) => (
          <div key={index} className="data-card">
            <div className="card-header">
              <div className="data-icon">{item.icon}</div>
              <div className="data-status">
                <span 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                ></span>
              </div>
            </div>
            
            <div className="card-body">
              <div className="data-label">{item.label}</div>
              <div className="data-value">{item.value}</div>
              <div className="data-change">
                <span 
                  className={`change-value ${item.status}`}
                  style={{ color: getStatusColor(item.status) }}
                >
                  {item.change}
                </span>
                <span className="change-label">vs last year</span>
              </div>
              <div className="data-description">{item.description}</div>
            </div>

            <div className="card-footer">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${Math.random() * 100}%`,
                    backgroundColor: getStatusColor(item.status)
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel-footer">
        <div className="data-source">
          <span className="source-icon">📡</span>
          <span>Data updated: {new Date().toLocaleString()}</span>
        </div>
        <div className="data-attribution">
          <span>Powered by NASA Earth Observatory & Open Data Initiative</span>
        </div>
      </div>
    </div>
  );
};

export default ClimateDataPanel;
