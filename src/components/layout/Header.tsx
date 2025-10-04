import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <div className="header-actions">
          <button className="header-button">
            <span>🔔</span>
          </button>
          <button className="header-button">
            <span>⚙️</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;