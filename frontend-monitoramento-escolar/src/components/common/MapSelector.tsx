import { Modal } from 'antd';
import { useState, useCallback } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

type MapSelectorProps = {
  onSelectLocation: (lat: number, lon: number) => void;
  isOpen: boolean;
  onClose: () => void;
  initialLocation: GeolocationPosition | null;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapSelector = ({
  onSelectLocation,
  isOpen,
  onClose,
  initialLocation,
}: MapSelectorProps) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setPosition({ lat, lng });
        onSelectLocation(lat, lng);
      }
    },
    [onSelectLocation],
  );

  const mapCenter = {
    lat: initialLocation?.coords.latitude || -15.7801,
    lng: initialLocation?.coords.longitude || -47.9292,
  };

  return (
    <Modal
      title='Selecione a localização'
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
    >
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS}`}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={13}
          onClick={onMapClick}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
      <p>Clique no mapa para selecionar a localização</p>
      {position && (
        <p>
          Latitude: {position.lat.toFixed(6)}, Longitude:{' '}
          {position.lng.toFixed(6)}
        </p>
      )}
    </Modal>
  );
};

export default MapSelector;
