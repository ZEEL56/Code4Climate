import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import type { MapMarker } from '../../types';

interface MapCardProps {
  title: string;
  subtitle?: string;
  markers: MapMarker[];
  height?: number;
  center?: [number, number];
  zoom?: number;
}

const MapCard: React.FC<MapCardProps> = ({ 
  title, 
  subtitle, 
  markers, 
  height = 400,
  center = [39.8283, -98.5795], // Center of USA
  zoom = 4
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card title={title} subtitle={subtitle}>
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="text-gray-500">Loading map...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card title={title} subtitle={subtitle}>
      <div style={{ height }} className="rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4">
              {markers.length} location{markers.length !== 1 ? 's' : ''} plotted
            </p>
            <div className="space-y-2">
              {markers.slice(0, 5).map((marker) => (
                <div key={marker.id} className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-sm text-gray-700">{marker.popup}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    marker.status === 'approved' ? 'bg-green-100 text-green-800' :
                    marker.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {marker.status}
                  </span>
                </div>
              ))}
              {markers.length > 5 && (
                <p className="text-sm text-gray-500">... and {markers.length - 5} more</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MapCard;