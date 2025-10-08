import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin: string;
  predictions: number;
}

interface SystemStats {
  totalUsers: number;
  totalPredictions: number;
  apiCalls: number;
  dataPoints: number;
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'data' | 'logs'>('overview');
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    totalPredictions: 0,
    apiCalls: 0,
    dataPoints: 0
  });
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading system data
    setLoading(true);
    setTimeout(() => {
      setSystemStats({
        totalUsers: 1247,
        totalPredictions: 8932,
        apiCalls: 45231,
        dataPoints: 1247890
      });
      
      setUsers([
        { id: '1', username: 'admin', email: 'admin@code4climate.com', role: 'admin', lastLogin: '2024-01-15 10:30:00', predictions: 0 },
        { id: '2', username: 'user', email: 'user@code4climate.com', role: 'user', lastLogin: '2024-01-15 09:45:00', predictions: 15 },
        { id: '3', username: 'demo', email: 'demo@code4climate.com', role: 'user', lastLogin: '2024-01-15 08:20:00', predictions: 8 },
        { id: '4', username: 'researcher', email: 'researcher@code4climate.com', role: 'user', lastLogin: '2024-01-14 16:15:00', predictions: 42 },
        { id: '5', username: 'analyst', email: 'analyst@code4climate.com', role: 'user', lastLogin: '2024-01-14 14:30:00', predictions: 23 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUserAction = (userId: string, action: string) => {
    alert(`${action} action for user ${userId} - Functionality coming soon!`);
  };

  const exportData = () => {
    alert('Data export functionality coming soon!');
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Data refreshed!');
    }, 1000);
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="earth-icon">🌍</span>
          <h1>CODE4CLIMATE</h1>
        </div>
        <div className="nav-actions">
          <span className="user-info">Admin: {user?.username}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="admin-header">
          <h2>Admin Dashboard</h2>
          <p>System Management & Data Analytics</p>
          <div className="admin-actions">
            <button onClick={refreshData} className="action-btn">
              🔄 Refresh Data
            </button>
            <button onClick={exportData} className="action-btn">
              📊 Export Data
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data Management
          </button>
          <button 
            className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            System Logs
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{systemStats.totalUsers.toLocaleString()}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌡️</div>
                <div className="stat-content">
                  <h3>{systemStats.totalPredictions.toLocaleString()}</h3>
                  <p>Weather Predictions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔗</div>
                <div className="stat-content">
                  <h3>{systemStats.apiCalls.toLocaleString()}</h3>
                  <p>API Calls</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{systemStats.dataPoints.toLocaleString()}</h3>
                  <p>Data Points</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">10:30 AM</span>
                  <span className="activity-text">User 'researcher' generated weather prediction for Mumbai</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">09:45 AM</span>
                  <span className="activity-text">New user registration: 'analyst'</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">08:20 AM</span>
                  <span className="activity-text">NASA API data updated successfully</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">07:15 AM</span>
                  <span className="activity-text">System backup completed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h3>User Management</h3>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Last Login</th>
                    <th>Predictions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>{user.predictions}</td>
                      <td>
                        <button 
                          onClick={() => handleUserAction(user.id, 'Edit')}
                          className="action-btn-small"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, 'Delete')}
                          className="action-btn-small danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="data-section">
            <h3>Data Management</h3>
            <div className="data-controls">
              <div className="data-card">
                <h4>NASA Data Sources</h4>
                <p>Connected to 12 NASA Earth observation APIs</p>
                <div className="data-status">
                  <span className="status-indicator online"></span>
                  <span>All systems operational</span>
                </div>
              </div>
              <div className="data-card">
                <h4>Data Storage</h4>
                <p>2.4 TB of climate data stored</p>
                <div className="storage-bar">
                  <div className="storage-fill" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="data-card">
                <h4>Data Processing</h4>
                <p>Last update: 2 hours ago</p>
                <button className="action-btn-small">Refresh Now</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="logs-section">
            <h3>System Logs</h3>
            <div className="logs-container">
              <div className="log-entry">
                <span className="log-time">2024-01-15 10:30:15</span>
                <span className="log-level info">INFO</span>
                <span className="log-message">User authentication successful: admin</span>
              </div>
              <div className="log-entry">
                <span className="log-time">2024-01-15 10:29:42</span>
                <span className="log-level success">SUCCESS</span>
                <span className="log-message">Weather prediction generated for Delhi</span>
              </div>
              <div className="log-entry">
                <span className="log-time">2024-01-15 10:28:18</span>
                <span className="log-level warning">WARNING</span>
                <span className="log-message">API rate limit approaching for NASA endpoint</span>
              </div>
              <div className="log-entry">
                <span className="log-time">2024-01-15 10:27:05</span>
                <span className="log-level info">INFO</span>
                <span className="log-message">Database backup initiated</span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
