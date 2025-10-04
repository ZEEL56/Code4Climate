import React, { useState } from 'react';
import Card from '../ui/Card';

interface AlertsPanelProps {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ location }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Rainfall Alert',
      message: 'Heavy rainfall expected (80% chance) this week in your area',
      severity: 'high',
      time: '2 hours ago',
      icon: '⚠️',
      action: 'View Details'
    },
    {
      id: 2,
      type: 'info',
      title: 'Heatwave Probability Rising',
      message: 'Temperature above 35°C expected in the next 3 days',
      severity: 'medium',
      time: '4 hours ago',
      icon: '🌡️',
      action: 'Monitor Conditions'
    },
    {
      id: 3,
      type: 'success',
      title: 'Air Quality Improved',
      message: 'Air quality index has improved to "Good" levels',
      severity: 'low',
      time: '6 hours ago',
      icon: '✅',
      action: 'View Report'
    }
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      case 'info': return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      case 'success': return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      case 'error': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-orange-600 dark:text-orange-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card title="🔔 Weather Alerts & Recommendations" subtitle="Stay informed with real-time weather notifications">
      <div className="space-y-6">
        {/* Active Alerts */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Active Alerts for {location.name}
          </h4>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{alert.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {alert.title}
                        </h5>
                        <span className={`text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{alert.time}</span>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                          {alert.action}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Notification Preferences
          </h4>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📧</span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Email Alerts</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Receive weather alerts via email
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📱</span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">SMS Alerts</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Get critical alerts via text message
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </label>

              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🔔</span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Push Notifications</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Browser notifications for weather updates
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Weather Recommendations */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Today's Recommendations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600 dark:text-blue-400">👕</span>
                <span className="font-medium text-blue-800 dark:text-blue-200">Clothing</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Light layers recommended. Temperature will range from 18°C to 25°C throughout the day.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600 dark:text-green-400">🏃</span>
                <span className="font-medium text-green-800 dark:text-green-200">Activities</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Perfect weather for outdoor activities. UV index is moderate - sunscreen recommended.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-600 dark:text-yellow-400">🚗</span>
                <span className="font-medium text-yellow-800 dark:text-yellow-200">Travel</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Good driving conditions. No weather-related travel advisories in effect.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-purple-600 dark:text-purple-400">🌱</span>
                <span className="font-medium text-purple-800 dark:text-purple-200">Health</span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Air quality is good. Pollen levels are moderate - consider allergy medication if sensitive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AlertsPanel;
