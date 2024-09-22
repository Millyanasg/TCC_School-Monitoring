import { useState, useEffect } from 'react';
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
      </div>
    </Layout>
  );
}
