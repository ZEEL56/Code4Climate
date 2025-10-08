import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const VisitorDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="earth-icon">🌍</span>
          <h1>CODE4CLIMATE</h1>
        </div>
        <div className="nav-actions">
          <span className="user-info">Welcome, Visitor!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome to Code4Climate</h2>
          <p>Explore climate data and environmental insights powered by NASA data</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌡️</div>
            <h3>Climate Data</h3>
            <p>Access real-time climate data from NASA's Earth observation systems</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Weather Analytics</h3>
            <p>View comprehensive weather analytics and historical data</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Interactive Maps</h3>
            <p>Explore climate data through interactive geographic visualizations</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Trend Analysis</h3>
            <p>Understand climate trends and patterns over time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Environmental Impact</h3>
            <p>Learn about environmental changes and their global impact</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Research Data</h3>
            <p>Access scientific research data and climate studies</p>
          </div>
        </div>

        <div className="public-data-section">
          <h3>Public Climate Data</h3>
          <div className="data-cards">
            <div className="data-card">
              <h4>Global Temperature</h4>
              <div className="data-value">+1.1°C</div>
              <p>Average temperature increase since pre-industrial era</p>
            </div>
            <div className="data-card">
              <h4>Sea Level Rise</h4>
              <div className="data-value">3.3mm/year</div>
              <p>Current global sea level rise rate</p>
            </div>
            <div className="data-card">
              <h4>CO2 Concentration</h4>
              <div className="data-value">417 ppm</div>
              <p>Current atmospheric CO2 concentration</p>
            </div>
          </div>
        </div>

        <div className="news-section">
          <h3>Latest Climate News</h3>
          <div className="news-cards">
            <div className="news-card">
              <h4>NASA's Latest Climate Findings</h4>
              <p>Recent satellite data shows significant changes in Arctic ice coverage...</p>
              <span className="news-date">2 hours ago</span>
            </div>
            <div className="news-card">
              <h4>Climate Prediction Models</h4>
              <p>New AI models improve weather prediction accuracy by 15%...</p>
              <span className="news-date">5 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorDashboard;
