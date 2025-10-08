import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<'user' | 'admin' | 'visitor'>('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, loginAsVisitor } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (loginType === 'visitor') {
      loginAsVisitor();
      setLoading(false);
      return;
    }

    try {
      const success = await login(username, password, loginType);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const success = await loginWithGoogle();
      if (!success) {
        setError('Google login failed. Please try again.');
      }
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality coming soon!');
  };

  const handleCreateAccount = () => {
    alert('Account creation functionality coming soon!');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="earth-logo">
          🌍
        </div>
        <div className="login-card">
        <div className="logo-section">
          <div className="theme-toggle">
            <button onClick={toggleTheme} className="theme-btn">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <h1 className="app-title">CODE4CLIMATE</h1>
          <p className="app-subtitle">AI-Powered Climate Data & Weather Prediction Platform</p>
        </div>

          <div className="login-options">
            <button
              className={`option-btn ${loginType === 'visitor' ? 'active' : ''}`}
              onClick={() => setLoginType('visitor')}
            >
              Visitor
            </button>
            <button
              className={`option-btn ${loginType === 'user' ? 'active' : ''}`}
              onClick={() => setLoginType('user')}
            >
              Registered Users
            </button>
            <button
              className={`option-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => setLoginType('admin')}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginType !== 'visitor' && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : loginType === 'visitor' ? 'Enter as Visitor' : 'Login'}
            </button>

            {loginType !== 'visitor' && (
              <>
                <div className="additional-options">
                  <button type="button" onClick={handleForgotPassword} className="link-btn">
                    Forgot Password?
                  </button>
                  <button type="button" onClick={handleCreateAccount} className="link-btn">
                    Create Account
                  </button>
                </div>

                <div className="divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google-btn"
                  disabled={loading}
                >
                  <span className="google-icon">🔍</span>
                  Login with Google
                </button>
              </>
            )}
          </form>

          <div className="info-section">
            <h4>🚀 Features:</h4>
            <p>• AI-powered weather predictions</p>
            <p>• Interactive climate maps</p>
            <p>• NASA data integration</p>
            <p>• Comfort index analysis</p>
            <p>• Export predictions as PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
