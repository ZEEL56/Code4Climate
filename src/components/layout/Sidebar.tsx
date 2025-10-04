import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../ui/Logo';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'visitor':
        return [
          { name: 'Public Data', href: '/visitor-dashboard', icon: '🌍' },
          { name: 'Monitoring Network', href: '/visitor-dashboard', icon: '🗺️' },
          { name: 'Environmental Reports', href: '/visitor-dashboard', icon: '📊' }
        ];
      case 'user':
        return [
          { name: 'Contributor Portal', href: '/user-dashboard', icon: '🔬' },
          { name: 'Submit Observations', href: '/user-dashboard', icon: '📝' },
          { name: 'My Data Submissions', href: '/user-dashboard', icon: '📋' }
        ];
      case 'admin':
        return [
          { name: 'System Overview', href: '/admin-dashboard', icon: '⚙️' },
          { name: 'Quality Review', href: '/admin-dashboard', icon: '🔍' },
          { name: 'Verified Data', href: '/admin-dashboard', icon: '✅' },
          { name: 'Analytics & Reports', href: '/admin-dashboard', icon: '📈' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <Logo size="small" showText />
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.href
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
