import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  const features = [
    {
      icon: '🌍',
      title: 'Climate Predictions',
      description: 'AI-powered climate forecasts for India with travel recommendations',
      action: 'Explore Climate Data'
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Real-time environmental data visualization and insights',
      action: 'View Analytics'
    },
    {
      icon: '🗺️',
      title: 'Interactive Maps',
      description: 'Geographic distribution of monitoring stations and climate zones',
      action: 'Explore Maps'
    },
    {
      icon: '🛰️',
      title: 'NASA Data',
      description: 'Access satellite data and official climate measurements',
      action: 'Browse Data'
    }
  ];

  const quickStats = [
    { label: 'Countries Covered', value: '195+', icon: '🌐' },
    { label: 'Data Points', value: '10M+', icon: '📈' },
    { label: 'Active Users', value: '50K+', icon: '👥' },
    { label: 'Cities Tracked', value: '1000+', icon: '🏙️' }
  ];

  return (
    <ResponsiveLayout title="ClimateTrack - Public Portal">
      {/* Hero Section */}
      <div className="visitor-hero-section">
        <div className="visitor-hero-content">
          <h1 className="visitor-hero-title">🌍 Welcome to ClimateTrack</h1>
          <p className="visitor-hero-subtitle">
            Your gateway to real-time climate data, AI-powered predictions, and environmental insights powered by NASA
          </p>
          <div className="visitor-hero-buttons">
            <button onClick={() => navigate('/login')} className="hero-btn-primary">
              Sign In to Access Full Features
            </button>
            <button className="hero-btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="quick-stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Platform Features */}
      <Card title="Platform Features" subtitle="Explore what ClimateTrack offers">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <button className="feature-action-btn">{feature.action} →</button>
            </div>
          ))}
        </div>
      </Card>

      

           
      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Data Quality Distribution"
          subtitle="Environmental data verification status"
          data={submissionsChartData}
          type="pie"
          height={300}
        />
        
        <ChartCard
          title="Collection Activity Trends"
          subtitle="Daily data collection patterns"
          data={dateChartData}
          type="bar"
          height={300}
        />
      </div>

      <MapCard
  title="India Environmental Monitoring Network"
  subtitle="Real-time sensor locations and climate data collection points across India"
  markers={mapMarkers}
  height={500}
  center={[20.5937, 78.9629]}
  zoom={5}
/>
    

      {/* Climate Insights Preview */}
      <Card title="Climate Insights for India" subtitle="Preview of travel climate predictions">
        <div className="climate-preview-grid">
          <div className="climate-preview-card">
            <div className="preview-icon">🌤️</div>
            <h4 className="preview-title">Delhi</h4>
            <div className="preview-temp">28°C</div>
            <p className="preview-condition">Clear Sky</p>
          </div>
          <div className="climate-preview-card">
            <div className="preview-icon">⛅</div>
            <h4 className="preview-title">Mumbai</h4>
            <div className="preview-temp">32°C</div>
            <p className="preview-condition">Partly Cloudy</p>
          </div>
          <div className="climate-preview-card">
            <div className="preview-icon">🌤️</div>
            <h4 className="preview-title">Bangalore</h4>
            <div className="preview-temp">25°C</div>
            <p className="preview-condition">Pleasant</p>
          </div>
          <div className="climate-preview-card">
            <div className="preview-icon">🌡️</div>
            <h4 className="preview-title">Chennai</h4>
            <div className="preview-temp">34°C</div>
            <p className="preview-condition">Hot & Humid</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <button onClick={() => navigate('/login')} className="upgrade-btn">
            Sign In for Detailed Climate Predictions →
          </button>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="visitor-cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Access Full Features?</h2>
          <p className="cta-description">
            Create an account to unlock climate predictions, data submission, and advanced analytics
          </p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/login')} className="cta-btn-primary">
              Create Free Account
            </button>
            <button onClick={() => navigate('/login')} className="cta-btn-secondary">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default VisitorDashboard;