import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

type MapSelectorProps = {
  onSelectLocation: (lat: number, lng: number) => void;
  isOpen: boolean;
  onClose: () => void;
  initialLocation?: { lat: number; lng: number };
};

const MapSelector: React.FC<MapSelectorProps> = ({
  onSelectLocation,
  isOpen,
  onClose,
  initialLocation = defaultCenter,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    initialLocation,
  );
  const [mapCenter, setMapCenter] = useState(initialLocation);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });
      setMapCenter({ lat, lng });
      onSelectLocation(lat, lng);
    }
  };

  useEffect(() => {
    if (initialLocation) {
      setPosition(initialLocation);
      setMapCenter(initialLocation);
    }
  }, [initialLocation]);

  return (
    <Modal
      title='Selecione a localização'
      width={800}
      height={600}
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      style={{ top: 20 }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          cameraControl: true,
          center: mapCenter || defaultCenter,
          tiltInteractionEnabled: false,
          // disable satellite view
          mapTypeControl: false,
        }}
        zoom={20}
        onClick={onMapClick}
      >
        {position && <Marker position={position} />}
      </GoogleMap>

      <div style={{ padding: '10px' }}>
        <p>Clique no mapa para selecionar a localização</p>
        {position &&
          position.lat !== undefined &&
          position.lng !== undefined && (
            <p>
              Latitude: {position.lat.toFixed(2)}, Longitude:{' '}
              {position.lng.toFixed(2)}
            </p>
          )}
      </div>
    </Modal>
  );
};

export default MapSelector;
