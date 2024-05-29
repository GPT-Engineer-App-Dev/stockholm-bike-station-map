import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

// Custom icon for bike pump stations
const bikePumpIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded bike pump stations data
    const hardcodedStations = [
      { id: 1, name: 'Central Station', address: 'Centralplan 15', latitude: 59.3293, longitude: 18.0686 },
      { id: 2, name: 'Kungsträdgården', address: 'Jussi Björlings allé', latitude: 59.3303, longitude: 18.0716 },
      { id: 3, name: 'Stureplan', address: 'Stureplan', latitude: 59.3367, longitude: 18.0737 }
    ];

    setStations(hardcodedStations);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map(station => (
        <Marker key={station.id} position={[station.latitude, station.longitude]} icon={bikePumpIcon}>
          <Popup>
            <strong>{station.name}</strong><br />
            {station.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;