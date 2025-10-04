import React, { useState, useEffect } from 'react';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';
import Card from '../components/ui/Card';
import ChartCard from '../components/charts/ChartCard';
import MapCard from '../components/maps/MapCard';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingScreen from '../components/ui/LoadingScreen';
import { mockApi } from '../services/mockApi';
import type { ChartData, MapMarker, LocationData } from '../types';

interface FormData {
  date: string;
  time: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const UserDashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    time: '',
    location: { lat: 0, lng: 0, address: '' }
  });
  const [userSubmissions, setUserSubmissions] = useState<LocationData[]>([]);
  const [submissionsChartData, setSubmissionsChartData] = useState<ChartData[]>([]);
  const [dateChartData, setDateChartData] = useState<ChartData[]>([]);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [submissionsData, chartData, dateData, markersData] = await Promise.all([
          mockApi.getLocationData(),
          mockApi.getSubmissionsChartData(),
          mockApi.getSubmissionsByDateChartData(),
          mockApi.getMapMarkers()
        ]);

        // Filter user's own submissions (in real app, this would be filtered by actual user ID)
        setUserSubmissions(submissionsData.filter(sub => sub.userId === 'user1'));
        setSubmissionsChartData(chartData);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value) || 0
        }
      }));
    } else if (name === 'address') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          address: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        lat,
        lng,
        address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      }
    }));
    setShowMap(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const newSubmission = await mockApi.submitLocationData({
        ...formData,
        userId: 'user1' // In real app, this would come from auth context
      });

      setUserSubmissions(prev => [newSubmission, ...prev]);
      setFormData({
        date: '',
        time: '',
        location: { lat: 0, lng: 0, address: '' }
      });

      // Refresh data
      const [chartData, dateData, markersData] = await Promise.all([
        mockApi.getSubmissionsChartData(),
        mockApi.getSubmissionsByDateChartData(),
        mockApi.getMapMarkers()
      ]);
      setSubmissionsChartData(chartData);
      setDateChartData(dateData);
      setMapMarkers(markersData);
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ResponsiveLayout title="Data Contributor Portal">
            {/* Input Form */}
            <Card title="Submit Environmental Data" subtitle="Report environmental observations from your location for scientific analysis" className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Observation Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Observation Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monitoring Location
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="address"
                      value={formData.location.address}
                      onChange={handleInputChange}
                      placeholder="Enter monitoring station name or location description"
                      required
                      className="input-field"
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        name="lat"
                        value={formData.location.lat || ''}
                        onChange={handleInputChange}
                        placeholder="Latitude"
                        step="any"
                        className="input-field"
                      />
                      <input
                        type="number"
                        name="lng"
                        value={formData.location.lng || ''}
                        onChange={handleInputChange}
                        placeholder="Longitude"
                        step="any"
                        className="input-field"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowMap(!showMap)}
                      className="btn-secondary text-sm"
                    >
                      {showMap ? 'Hide Map' : 'Select from Map'}
                    </button>

                    {showMap && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <MapCard
                          title=""
                          markers={[]}
                          height={300}
                          center={[formData.location.lat || 39.8283, formData.location.lng || -98.5795]}
                          zoom={6}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Data for Admin Approval'}
                  </button>
                </div>
              </form>
            </Card>

            {/* User Submissions Table */}
            <Card title="My Submissions" subtitle="Your submitted location data" className="mb-8">
              {userSubmissions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">📋</span>
                  <p>No submissions yet. Submit your first location data above!</p>
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
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.date} at {submission.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {submission.location.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={submission.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
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
                title="All Submissions by Status"
                subtitle="Overall distribution across all users"
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

            {/* Map */}
            <MapCard
              title="All Location Data"
              subtitle="Geographic distribution of all submissions"
              markers={mapMarkers}
              height={500}
            />
    </ResponsiveLayout>
  );
};

export default UserDashboard;
