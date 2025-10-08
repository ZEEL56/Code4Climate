import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'visitor' | 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
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
    // Simulate API call - replace with actual authentication
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@code4climate.com',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (role === 'user' && (username === 'user' || username === 'demo') && password === 'user123') {
      const regularUser: User = {
        id: '2',
        username: username,
        email: `${username}@code4climate.com`,
        role: 'user'
      };
      setUser(regularUser);
      localStorage.setItem('user', JSON.stringify(regularUser));
      return true;
    }
    return false;
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
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
