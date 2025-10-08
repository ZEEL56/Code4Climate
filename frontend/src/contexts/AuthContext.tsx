import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'visitor' | 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginAsVisitor: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: 'user' | 'admin'): Promise<boolean> => {
    // Accept any username and password for demo purposes
    if (username.trim() && password.trim()) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        email: `${username}@code4climate.com`,
        role: role
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const googleUser: User = {
        id: user.uid,
        username: user.displayName || user.email?.split('@')[0] || 'Google User',
        email: user.email || '',
        role: 'user'
      };
      
      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  const loginAsVisitor = () => {
    const visitorUser: User = {
      id: 'visitor',
      username: 'visitor',
      email: '',
      role: 'visitor'
    };
    setUser(visitorUser);
    localStorage.setItem('user', JSON.stringify(visitorUser));
  };

  const logout = async () => {
    try {
      if (user?.id !== 'visitor') {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    loginAsVisitor,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
