import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import VisitorDashboard from './pages/VisitorDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './style.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Visitor Dashboard - Read-only access */}
            <Route
              path="/visitor-dashboard"
              element={
                <ProtectedRoute allowedRoles={['visitor']}>
                  <VisitorDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* User Dashboard - Data submission */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Dashboard - Approval controls */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Default redirect based on role - handled by AuthContext */}
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />
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