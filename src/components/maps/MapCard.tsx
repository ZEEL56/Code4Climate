import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Card from '../ui/Card';
import type { MapMarker } from '../../types';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom colored markers based on status
const getMarkerIcon = (status: 'approved' | 'pending' | 'rejected') => {
  const colors = {
    approved: '#10b981',
    pending: '#f59e0b',
    rejected: '#ef4444'
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${colors[status]}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
};

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
  center = [20.5937, 78.9629], // Center of India
  zoom = 5
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
      <div style={{ height }} className="rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker 
              key={marker.id} 
              position={marker.position}
              icon={getMarkerIcon(marker.status)}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-semibold mb-1">{marker.popup}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    marker.status === 'approved' ? 'bg-green-100 text-green-800' :
                    marker.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {marker.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Map Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Approved ({markers.filter(m => m.status === 'approved').length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600">Pending ({markers.filter(m => m.status === 'pending').length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">Rejected ({markers.filter(m => m.status === 'rejected').length})</span>
        </div>
      </div>
    </Card>
  );
};

export default MapCard;