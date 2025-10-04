import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar />
      </div>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Main content area */}
      <div className="main-content-wrapper">
        <Header title={title} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ResponsiveLayout;