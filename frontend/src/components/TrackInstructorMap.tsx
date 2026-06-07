import { MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconSize: [25, 41],
});

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

interface TrackInstructorMapProps {
  center: [number, number];
  markers: MarkerData[];
  route?: [number, number][];
}

export default function TrackInstructorMap({ center, markers, route }: TrackInstructorMapProps) {
  return (
    <div style={{ height: '360px', width: '100%', borderRadius: '18px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route && route.length >= 2 && (
          <Polyline pathOptions={{ color: '#2563eb', weight: 4, opacity: 0.8 }} positions={route} />
        )}
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} icon={markerIcon}>
            <Popup>
              <strong>{marker.title}</strong>
              <div>{marker.description}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
