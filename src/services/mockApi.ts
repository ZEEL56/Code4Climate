import { LocationData, DashboardStats, ChartData, MapMarker } from '../types';

// Mock environmental data
const mockLocationData: LocationData[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '10:30',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'Central Park, New York, NY - Air Quality Station'
    },
    userId: 'researcher_001',
    status: 'approved',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    date: '2024-01-16',
    time: '14:15',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Griffith Observatory, Los Angeles, CA - Weather Station'
    },
    userId: 'researcher_002',
    status: 'pending',
    submittedAt: '2024-01-16T14:15:00Z'
  },
  {
    id: '3',
    date: '2024-01-17',
    time: '09:45',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: 'Millennium Park, Chicago, IL - Environmental Sensor'
    },
    userId: 'researcher_003',
    status: 'approved',
    submittedAt: '2024-01-17T09:45:00Z'
  },
  {
    id: '4',
    date: '2024-01-18',
    time: '16:20',
    location: {
      lat: 29.7604,
      lng: -95.3698,
      address: 'Hermann Park, Houston, TX - Water Quality Monitor'
    },
    userId: 'researcher_004',
    status: 'rejected',
    submittedAt: '2024-01-18T16:20:00Z'
  },
  {
    id: '5',
    date: '2024-01-19',
    time: '08:00',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'Golden Gate Park, San Francisco, CA - Air Quality Station'
    },
    userId: 'researcher_005',
    status: 'approved',
    submittedAt: '2024-01-19T08:00:00Z'
  },
  {
    id: '6',
    date: '2024-01-20',
    time: '12:30',
    location: {
      lat: 25.7617,
      lng: -80.1918,
      address: 'Biscayne Bay, Miami, FL - Marine Monitoring Station'
    },
    userId: 'researcher_006',
    status: 'pending',
    submittedAt: '2024-01-20T12:30:00Z'
  }
];

export const mockApi = {
  // Get all location data
  getLocationData: async (): Promise<LocationData[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [...mockLocationData];
  },

  // Get location data by status
  getLocationDataByStatus: async (status: 'pending' | 'approved' | 'rejected'): Promise<LocationData[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLocationData.filter(data => data.status === status);
  },

  // Submit new location data
  submitLocationData: async (data: Omit<LocationData, 'id' | 'submittedAt' | 'status'>): Promise<LocationData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newData: LocationData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    mockLocationData.push(newData);
    return newData;
  },

  // Update location data status (admin only)
  updateLocationStatus: async (id: string, status: 'approved' | 'rejected'): Promise<LocationData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockLocationData.findIndex(data => data.id === id);
    if (index !== -1) {
      mockLocationData[index].status = status;
      return mockLocationData[index];
    }
    throw new Error('Location data not found');
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const total = mockLocationData.length;
    const pending = mockLocationData.filter(data => data.status === 'pending').length;
    const approved = mockLocationData.filter(data => data.status === 'approved').length;
    const rejected = mockLocationData.filter(data => data.status === 'rejected').length;

    return {
      totalSubmissions: total,
      pendingSubmissions: pending,
      approvedSubmissions: approved,
      rejectedSubmissions: rejected
    };
  },

  // Get chart data for submissions by status
  getSubmissionsChartData: async (): Promise<ChartData[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const stats = await mockApi.getDashboardStats();
    return [
      { name: 'Quality Verified', value: stats.approvedSubmissions, color: '#10b981' },
      { name: 'Under Review', value: stats.pendingSubmissions, color: '#f59e0b' },
      { name: 'Quality Issues', value: stats.rejectedSubmissions, color: '#ef4444' }
    ];
  },

  // Get chart data for submissions by date
  getSubmissionsByDateChartData: async (): Promise<ChartData[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const dateCounts: { [key: string]: number } = {};
    
    mockLocationData.forEach(data => {
      const date = data.date;
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    return Object.entries(dateCounts).map(([date, count]) => ({
      name: new Date(date).toLocaleDateString(),
      value: count
    }));
  },

  // Get map markers
  getMapMarkers: async (): Promise<MapMarker[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockLocationData.map(data => ({
      id: data.id,
      position: [data.location.lat, data.location.lng] as [number, number],
      popup: `${data.location.address} - ${data.date} ${data.time}`,
      status: data.status
    }));
  }
};
