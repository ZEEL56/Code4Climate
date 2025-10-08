import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Code4Climate</h1>
        <p>Climate Action Platform</p>
        <div className="features">
          <div className="feature-card">
            <h3>🌱 Environmental Tracking</h3>
            <p>Monitor your environmental impact</p>
          </div>
          <div className="feature-card">
            <h3>📊 Analytics</h3>
            <p>Get insights on your climate actions</p>
          </div>
          <div className="feature-card">
            <h3>🤝 Community</h3>
            <p>Connect with like-minded individuals</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
