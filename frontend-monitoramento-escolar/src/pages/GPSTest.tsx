import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Layout } from '../components/Layout/Layout';

export function GPSTest() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position);
    });
  }, []);

  return (
    <Layout>
      <div>
        <h1>GPSTest</h1>
        <p>Latitude: {location?.coords.latitude}</p>
        <p>Longitude: {location?.coords.longitude}</p>
        {location && (
          <MapContainer
            bounds={[
              [location.coords.latitude, location.coords.longitude],
              [location.coords.latitude, location.coords.longitude],
            ]}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker
              position={[location.coords.latitude, location.coords.longitude]}
            >
              <Popup>
                You are here: {location.coords.latitude},{' '}
                {location.coords.longitude}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </Layout>
  );
}
