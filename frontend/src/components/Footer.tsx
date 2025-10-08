import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>🌍 CODE4CLIMATE</h3>
          <p>AI-Powered Climate Data & Weather Prediction Platform</p>
          <div className="social-links">
            <a href="https://github.com/aastha11-hub/Code4Climate" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📱</span> GitHub
            </a>
            <a href="mailto:contact@code4climate.com">
              <span className="social-icon">📧</span> Contact
            </a>
            <a href="https://twitter.com/code4climate" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">🐦</span> Twitter
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>🚀 Features</h4>
          <ul>
            <li>AI Weather Predictions</li>
            <li>Interactive Climate Maps</li>
            <li>Comfort Index Analysis</li>
            <li>PDF Export Reports</li>
            <li>Real-time Data Updates</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>📊 Data Sources</h4>
          <ul>
            <li>NASA Earth Observatory</li>
            <li>NOAA Climate Data</li>
            <li>OpenWeather API</li>
            <li>Indian Meteorological Department</li>
            <li>Machine Learning Models</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>🔬 Technology</h4>
          <ul>
            <li>React & TypeScript</li>
            <li>Firebase Authentication</li>
            <li>Leaflet Maps</li>
            <li>Recharts Analytics</li>
            <li>AI Prediction Algorithms</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="nasa-credits">
          <span className="nasa-logo">🚀</span>
          <span>Powered by <strong>NASA Open Data</strong> and advanced AI algorithms</span>
        </div>
        <div className="copyright">
          <p>&copy; 2024 Code4Climate. All rights reserved. | Built with ❤️ for climate awareness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

