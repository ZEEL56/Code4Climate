import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import VisitorDashboard from './components/dashboards/VisitorDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import './App.css';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      <Route 
        path="/visitor" 
        element={user?.role === 'visitor' ? <VisitorDashboard /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/user" 
        element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin" 
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/" 
        element={
          user?.role === 'visitor' ? <Navigate to="/visitor" replace /> :
          user?.role === 'user' ? <Navigate to="/user" replace /> :
          user?.role === 'admin' ? <Navigate to="/admin" replace /> :
          <Navigate to="/visitor" replace />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
