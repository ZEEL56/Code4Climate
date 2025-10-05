import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
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

  const handleGoogleLogin = () => {
    // Firebase Google login placeholder
    alert('Google Sign-In will be integrated with Firebase Authentication');
  };

  const handleCreateAccount = () => {
    alert('Account creation feature coming soon!');
  };

  const roleButtons = [
    { value: 'user' as UserRole, label: 'User', icon: '👤', description: 'Registered User' },
    { value: 'admin' as UserRole, label: 'Admin', icon: '⭐', description: 'Manage data' }
  ];

  return (
    <div className="nasa-login-container">
      <div className="nasa-stars"></div>
      <div className="nasa-stars-2"></div>
      <div className="nasa-stars-3"></div>

      <div className="nasa-login-card">
        <div className="nasa-header">
          <div className="nasa-logo-container">
            <img 
              src="/logo.png.jpeg" 
              alt="Code4Climate Logo" 
              className="nasa-logo-img"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="nasa-logo-fallback">🌍</div>';
              }}
            />
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

          {/* Google Sign-In Button */}
          <button type="button" onClick={handleGoogleLogin} className="google-signin-btn">
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button type="button" onClick={handleCreateAccount} className="nasa-btn-secondary">
            <span className="nasa-btn-icon">✨</span>
            Create New Account
          </button>
        </form>

        {/* Footer */}
        <div className="nasa-login-footer">
          <p className="login-footer-text">
            <span className="footer-icon">🛰️</span>
            NASA Open Data • Weather Vision
          </p>
          <p className="login-footer-subtext">
            Powered by satellite data and climate intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;