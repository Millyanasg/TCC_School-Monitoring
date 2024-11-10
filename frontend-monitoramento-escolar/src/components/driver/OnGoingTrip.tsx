import { MapTrip } from '@frontend/components/common/Map/MapTrip';
import { GeoPosition } from '@frontend/stores/driver/driverTrip.store';

import { Typography } from 'antd';
import { useEffect, useState } from 'react';

/**
 * OnGoingTrip component represents a page that displays the ongoing trip information.
 * It fetches the current geolocation and sets the start, end, and current locations with slight random variations.
 * The component renders a map with the trip details if all locations are available.
 *
 * @component
 * @example
 * return (
 *   <OnGoingTrip />
 * )
 *
 * @returns {JSX.Element} A React component that displays the ongoing trip information.
 */
export const OnGoingTrip = () => {
  const [startLocation, setStartLocation] = useState<GeoPosition | null>(null);
  const [endLocation, setEndLocation] = useState<GeoPosition | null>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoPosition | null>(
    null,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setStartLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
      setEndLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
      setCurrentLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
    });
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Typography.Title level={2}>Viagem em andamento</Typography.Title>
      <Typography.Paragraph>
        Você está em uma viagem. Aguarde o término para iniciar outra.
      </Typography.Paragraph>
      {startLocation && endLocation && currentLocation && (
        <MapTrip
          startLocation={startLocation}
          endLocation={endLocation}
          currentLocation={currentLocation}
          isRendering={true}
        />
      )}
    </div>
  );
};
