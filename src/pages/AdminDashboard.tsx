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
  const [pendingSubmissions, setPendingSubmissions] = useState<LocationData[]>([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState<LocationData[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissionsChartData, setSubmissionsChartData] = useState<ChartData[]>([]);
  const [dateChartData, setDateChartData] = useState<ChartData[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pendingData, approvedData, statsData, chartData, dateData, markersData] = await Promise.all([
        mockApi.getLocationDataByStatus('pending'),
        mockApi.getLocationDataByStatus('approved'),
        mockApi.getDashboardStats(),
        mockApi.getSubmissionsChartData(),
        mockApi.getSubmissionsByDateChartData(),
        mockApi.getMapMarkers()
      ]);

      setPendingSubmissions(pendingData);
      setApprovedSubmissions(approvedData);
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

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setProcessing(id);
    try {
      await mockApi.updateLocationStatus(id, status);
      await loadData(); // Refresh all data
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout title="System Administration">
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="dashboard-card">
                  <div className="icon primary">🌡️</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Data Points</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon warning">⏳</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Awaiting Review</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon success">✅</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Quality Verified</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.approvedSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon danger">⚠️</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Quality Issues</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.rejectedSubmissions}</p>
                </div>
              </div>
            )}

            {/* Pending Requests Table */}
            <Card title="Data Quality Review Queue" subtitle="Environmental data submissions requiring quality verification" className="mb-8">
              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">✅</span>
                  <p>No pending submissions. All caught up!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.date} at {submission.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {submission.location.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(submission.id, 'approved')}
                              disabled={processing === submission.id}
                              className="btn-success text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processing === submission.id ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                              disabled={processing === submission.id}
                              className="btn-danger text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processing === submission.id ? 'Processing...' : 'Reject'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Approved Data Table */}
            <Card title="Approved Data" subtitle="Recently approved submissions" className="mb-8">
              {approvedSubmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">📋</span>
                  <p>No approved submissions yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {approvedSubmissions.slice(0, 10).map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.date} at {submission.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {submission.location.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={submission.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard
                title="Submissions by Status"
                subtitle="Distribution of all submissions"
                data={submissionsChartData}
                type="pie"
                height={300}
              />
              
              <ChartCard
                title="Submissions by Date"
                subtitle="Daily submission trends"
                data={dateChartData}
                type="bar"
                height={300}
              />
            </div>

            {/* Map Overview */}
            <MapCard
              title="Map Overview"
              subtitle="Geographic distribution of all submissions"
              markers={mapMarkers}
              height={500}
            />
    </ResponsiveLayout>
  );
};

export default AdminDashboard;
