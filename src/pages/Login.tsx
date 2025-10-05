import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('visitor');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    login({ username, password, role: selectedRole });
    
    const dashboardRoutes = {
      visitor: '/visitor-dashboard',
      user: '/user-dashboard',
      admin: '/admin-dashboard'
    };
    
    navigate(dashboardRoutes[selectedRole]);
    setIsLoading(false);
  };

  const handleVisitorAccess = () => {
    // Auto-login as visitor without credentials
    login({ username: 'Guest User', password: '', role: 'visitor' });
    navigate('/visitor-dashboard');
  };

  const handleCreateAccount = () => {
    alert('Account creation feature coming soon!');
  };

  const roleButtons = [
    { value: 'visitor' as UserRole, label: 'Visitor', icon: '👁️', description: 'Read-only access to data' },
    { value: 'user' as UserRole, label: 'User', icon: '👤', description: 'Submit data for approval' },
    { value: 'admin' as UserRole, label: 'Admin', icon: '⭐', description: 'Approve & manage data' }
  ];

  return (
    <div className="nasa-login-container">
      <div className="nasa-stars"></div>
      <div className="nasa-stars-2"></div>
      <div className="nasa-stars-3"></div>

      <div className="nasa-login-card">
        <div className="nasa-header">
          <div className="nasa-logo-container">
            <img src="/logo.png.jpeg" alt="Code4Climate Logo" className="nasa-logo-img" />
          </div>
          <h1 className="nasa-title">ClimateTrack</h1>
          <p className="nasa-subtitle">Environmental Data Platform</p>
          <div className="nasa-badge">
            <span className="nasa-badge-icon">🛰️</span>
            <span className="nasa-badge-text">Powered by NASA Data</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="nasa-form">
          <div className="role-selection-section">
            <label className="nasa-label">Select Access Level</label>
            <div className="role-buttons-grid">
              {roleButtons.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`role-button ${selectedRole === role.value ? 'role-button-active' : ''}`}
                >
                  <span className="role-icon">{role.icon}</span>
                  <span className="role-label">{role.label}</span>
                  <span className="role-description">{role.description}</span>
                  {selectedRole === role.value && <div className="role-check">✓</div>}
                </button>
              ))}
            </div>
          </div>

          <div className="nasa-input-group">
            <label htmlFor="username" className="nasa-label">Username</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="nasa-input"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="nasa-input-group">
            <label htmlFor="password" className="nasa-label">Password</label>
            <div className="nasa-password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="nasa-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="nasa-password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Continue as Visitor Button */}
          <div className="visitor-access-section">
            <button
              type="button"
              onClick={handleVisitorAccess}
              className="visitor-access-button"
            >
              <span className="visitor-icon">🌍</span>
              <div className="visitor-text-content">
                <span className="visitor-button-title">Continue as Visitor</span>
                <span className="visitor-button-desc">Browse public data and climate predictions without signing in</span>
              </div>
            </button>
          </div>

          <div className="nasa-forgot-password">
            <a href="#" className="nasa-link">Forgot password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="nasa-btn-primary">
            {isLoading ? (
              <>
                <span className="nasa-spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <span className="nasa-btn-arrow">→</span>
              </>
            )}
          </button>

          <div className="nasa-divider"><span>or</span></div>

          <button type="button" onClick={handleCreateAccount} className="nasa-btn-secondary">
            <span className="nasa-btn-icon">✨</span>
            Create New Account
          </button>
        </form>

        <div className="nasa-footer">
          <p className="nasa-footer-text">Secure access to real-time climate data and analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Login;