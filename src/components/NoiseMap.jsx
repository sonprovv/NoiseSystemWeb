import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Tạo 2 biểu tượng màu khác nhau
const greenIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
});

const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
});

const NoiseMap = ({ locations, selectedLocation, onLocationSelect, threshold }) => {
  return (
    <MapContainer center={[21.0285, 105.8542]} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.position}
          icon={loc.currentNoise > threshold ? redIcon : greenIcon}
          eventHandlers={{
            click: () => onLocationSelect(loc.id),
          }}
        >
          <Popup>
            <strong>{loc.name}</strong><br />
            Mức ồn: {loc.currentNoise.toFixed(2)} dB
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NoiseMap;
