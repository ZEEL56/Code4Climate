export type UserRole = 'visitor' | 'user' | 'admin';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  email?: string;
}

export interface LocationData {
  id: string;
  date: string;
  time: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface DashboardStats {
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
}

export interface MapMarker {
  id: string;
  position: [number, number];
  popup: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
