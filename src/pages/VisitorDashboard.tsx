import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import Card from '../components/ui/Card';
import ChartCard from '../components/charts/ChartCard';
import MapCard from '../components/maps/MapCard';
import LoadingScreen from '../components/ui/LoadingScreen';
import { mockApi } from '../services/mockApi';
import { ChartData, MapMarker, DashboardStats } from '../types';

const VisitorDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissionsChartData, setSubmissionsChartData] = useState<ChartData[]>([]);
  const [dateChartData, setDateChartData] = useState<ChartData[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, submissionsData, dateData, markersData] = await Promise.all([
          mockApi.getDashboardStats(),
          mockApi.getSubmissionsChartData(),
          mockApi.getSubmissionsByDateChartData(),
          mockApi.getMapMarkers()
        ]);

        setStats(statsData);
        setSubmissionsChartData(submissionsData);
        setDateChartData(dateData);
        setMapMarkers(markersData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout title="Public Environmental Data">
            {/* Welcome Message */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-blue-800">
                      Welcome to ClimateTrack Public Portal
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Access real-time environmental data, air quality measurements, and climate monitoring information from our network of sensors across the United States.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="dashboard-card">
                  <div className="icon primary">🌡️</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Active Monitoring Stations</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon success">✅</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Verified Data Points</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.approvedSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon warning">⏳</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Under Review</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingSubmissions}</p>
                </div>

                <div className="dashboard-card">
                  <div className="icon danger">⚠️</div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Data Quality Issues</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.rejectedSubmissions}</p>
                </div>
              </div>
            )}

            {/* Charts and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard
                title="Data Quality Overview"
                subtitle="Distribution of environmental data by verification status"
                data={submissionsChartData}
                type="pie"
                height={300}
              />
              
              <ChartCard
                title="Data Collection Trends"
                subtitle="Daily environmental data collection activity"
                data={dateChartData}
                type="bar"
                height={300}
              />
            </div>

            {/* Map */}
            <div className="mb-8">
              <MapCard
                title="Environmental Monitoring Network"
                subtitle="Real-time sensor locations and data collection points across the United States"
                markers={mapMarkers}
                height={500}
              />
            </div>

            {/* Restricted Actions Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                  <span className="text-gray-600 text-xl">🔒</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Want to submit data?
                </h3>
                <p className="text-gray-600 mb-4">
                  Log in with a registered user account to submit location data, or use an admin account to approve submissions.
                </p>
                <button className="btn-primary">
                  Switch Account
                </button>
              </div>
            </div>
    </ResponsiveLayout>
  );
};

export default VisitorDashboard;
