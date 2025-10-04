import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'visitor':
        return [
          { name: 'Dashboard', href: '/visitor-dashboard', icon: '📊' },
          { name: 'Public Data', href: '/visitor-dashboard', icon: '🌍' },
          { name: 'Monitoring Network', href: '/visitor-dashboard', icon: '🗺️' },
          { name: 'Reports', href: '/visitor-dashboard', icon: '📈' }
        ];
      case 'user':
        return [
          { name: 'Dashboard', href: '/user-dashboard', icon: '📊' },
          { name: 'Submit Data', href: '/user-dashboard', icon: '📝' },
          { name: 'My Submissions', href: '/user-dashboard', icon: '📋' },
          { name: 'Analytics', href: '/user-dashboard', icon: '📈' }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin-dashboard', icon: '📊' },
          { name: 'Pending Reviews', href: '/admin-dashboard', icon: '🔍' },
          { name: 'Approved Data', href: '/admin-dashboard', icon: '✅' },
          { name: 'Analytics', href: '/admin-dashboard', icon: '📈' },
          { name: 'Settings', href: '/admin-dashboard', icon: '⚙️' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'visitor': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <aside className="sidebar-container">
      {/* Platform Branding */}
      <div className="sidebar-header">
        <div className="flex items-center gap-3">
          <img src="/logo.png.jpeg" alt="Code4Climate" className="sidebar-logo" />
        </div>
        <h2 className="sidebar-title">ClimateTrack</h2>
        <p className="sidebar-subtitle">Environmental Data Platform</p>
      </div>

      {/* User Profile Section */}
      <div className="sidebar-user-section">
        <div className="flex items-center gap-3">
          <div className="user-avatar">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="user-name">{user?.username}</p>
            <span className={`role-badge ${getRoleBadgeColor()}`}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <p className="nav-section-title">NAVIGATION</p>
        <div className="nav-items">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-item ${
                location.pathname === item.href ? 'nav-item-active' : ''
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Controls */}
      <div className="sidebar-footer">
        <div className="sidebar-divider"></div>
        <button onClick={handleLogout} className="logout-button">
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
        <div className="sidebar-info">
          <p className="info-text">🛰️ Powered by NASA Data</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;