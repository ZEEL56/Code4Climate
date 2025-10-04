import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import Logo from '../components/ui/Logo';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('visitor');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    login({ username, password, role });

    // Navigate to main dashboard
    navigate('/dashboard');

    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'visitor', label: 'Continue as Guest', description: 'Access basic weather data and forecasts' },
    { value: 'user', label: 'Registered User', description: 'Full access to advanced features and data export' },
    { value: 'admin', label: 'Premium User', description: 'AI predictions, custom reports, and priority support' }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" animated />
        </div>
        <h2 className="mt-8 text-center text-4xl font-extrabold text-white">
          ClimateTrack Pro
        </h2>
        <p className="mt-4 text-center text-lg text-white/80">
          Advanced Weather & Climate Analytics Platform
        </p>
        <p className="mt-2 text-center text-sm text-white/60">
          Powered by NASA Data & AI Predictions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="space-y-3">
                {roleOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <input
                      type="radio"
                      id={option.value}
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={option.value}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        role === option.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {option.description}
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          role === option.value
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {role === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p><strong>Visitor:</strong> Any username/password</p>
              <p><strong>User:</strong> Any username/password</p>
              <p><strong>Admin:</strong> Any username/password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
