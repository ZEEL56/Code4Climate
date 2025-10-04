import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import MainDashboard from './pages/MainDashboard';
import './style.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Main Dashboard - accessible to all authenticated users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['visitor', 'user', 'admin']}>
                  <MainDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Legacy dashboard routes - redirect to main dashboard */}
            <Route
              path="/visitor-dashboard"
              element={<Navigate to="/dashboard" replace />}
            />
            
            <Route
              path="/user-dashboard"
              element={<Navigate to="/dashboard" replace />}
            />
            
            <Route
              path="/admin-dashboard"
              element={<Navigate to="/dashboard" replace />}
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
