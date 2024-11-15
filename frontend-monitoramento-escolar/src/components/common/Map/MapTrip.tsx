import { GeoPosition } from '@frontend/stores/driver/driverTrip.store';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

type MapTripProps = {
  startLocation: GeoPosition;
  endLocation: GeoPosition;
  currentLocation: GeoPosition;
  isRendering: boolean;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

export const MapTrip = ({
  startLocation,
  endLocation,
  currentLocation,
  isRendering,
}: MapTripProps) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isRendering) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: {
            lat: startLocation.coords.latitude,
            lng: startLocation.coords.longitude,
          },
          destination: {
            lat: endLocation.coords.latitude,
            lng: endLocation.coords.longitude,
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }, [isRendering, startLocation, endLocation]);

  if (!isRendering) {
    return null;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        }}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          cameraControl: true,
          tiltInteractionEnabled: false,
          // disable satellite view
          mapTypeControl: false,
        }}
        zoom={13}
      >
        <Marker
          position={{
            lat: startLocation.coords.latitude,
            lng: startLocation.coords.longitude,
          }}
          shape={{ coords: [0, 0, 0, 0], type: 'circle' }}
          label='Start'
        />
        <Marker
          position={{
            lat: endLocation.coords.latitude,
            lng: endLocation.coords.longitude,
          }}
          shape={{ coords: [0, 0, 0, 0], type: 'circle' }}
          label='End'
        />
        <Marker
          position={{
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
          }}
          shape={{ coords: [0, 0, 0, 0], type: 'circle' }}
          label='Current'
        />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};
