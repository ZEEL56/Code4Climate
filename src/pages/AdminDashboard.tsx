import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import Card from '../components/ui/Card';
import ChartCard from '../components/charts/ChartCard';
import MapCard from '../components/maps/MapCard';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingScreen from '../components/ui/LoadingScreen';
import { mockApi } from '../services/mockApi';
import { ChartData, MapMarker, LocationData, DashboardStats } from '../types';

const AdminDashboard: React.FC = () => {
  const [allSubmissions, setAllSubmissions] = useState<LocationData[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissionsChartData, setSubmissionsChartData] = useState<ChartData[]>([]);
  const [dateChartData, setDateChartData] = useState<ChartData[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [allData, statsData, chartData, dateData, markersData] = await Promise.all([
        mockApi.getLocationData(),
        mockApi.getDashboardStats(),
        mockApi.getSubmissionsChartData(),
        mockApi.getSubmissionsByDateChartData(),
        mockApi.getMapMarkers()
      ]);

      setAllSubmissions(allData);
      setStats(statsData);
      setSubmissionsChartData(chartData);
      setDateChartData(dateData);
      setMapMarkers(markersData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSubmissions = () => {
    if (filterStatus === 'all') return allSubmissions;
    return allSubmissions.filter(sub => sub.status === filterStatus);
  };

  const filteredSubmissions = getFilteredSubmissions();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout title="Data Management Dashboard">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="dashboard-card">
            <div className="icon primary">📊</div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Submissions</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
          </div>

          <div className="dashboard-card">
            <div className="icon success">✅</div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Approved Data</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.approvedSubmissions}</p>
          </div>

          <div className="dashboard-card">
            <div className="icon warning">⏳</div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Review</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
          </div>

          <div className="dashboard-card">
            <div className="icon danger">❌</div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Rejected Data</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.rejectedSubmissions}</p>
          </div>
        </div>
      )}

      {/* Data Filter */}
      <Card title="All Submissions Data" subtitle="View and analyze all environmental data submissions" className="mb-8">
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`filter-button ${filterStatus === 'all' ? 'filter-button-active' : ''}`}
            >
              All Data ({allSubmissions.length})
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`filter-button ${filterStatus === 'approved' ? 'filter-button-active' : ''}`}
            >
              ✅ Approved ({allSubmissions.filter(s => s.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`filter-button ${filterStatus === 'pending' ? 'filter-button-active' : ''}`}
            >
              ⏳ Pending ({allSubmissions.filter(s => s.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`filter-button ${filterStatus === 'rejected' ? 'filter-button-active' : ''}`}
            >
              ❌ Rejected ({allSubmissions.filter(s => s.status === 'rejected').length})
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No submissions found for this filter
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {submission.id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.date} at {submission.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {submission.location.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {submission.location.lat.toFixed(4)}, {submission.location.lng.toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Data Distribution by Status"
          subtitle="Overview of all environmental data submissions"
          data={submissionsChartData}
          type="pie"
          height={300}
        />
        
        <ChartCard
          title="Submission Trends"
          subtitle="Daily submission activity over time"
          data={dateChartData}
          type="bar"
          height={300}
        />
      </div>

      {/* Geographic Distribution Map */}
      <MapCard
  title="India Geographic Data Distribution"
  subtitle="Environmental monitoring locations across India"
  markers={mapMarkers}
  height={500}
  center={[20.5937, 78.9629]}
  zoom={5}
/>
    </ResponsiveLayout>
  );
};

export default AdminDashboard;