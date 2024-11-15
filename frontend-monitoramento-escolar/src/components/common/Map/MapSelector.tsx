import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
const containerStyle = {
  width: '100%',
  height: '400px',
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
  initialLocation,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mapCenter, setMapCenter] = useState<
    { lat: number; lng: number } | undefined
  >(initialLocation);

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
  console.log(initialLocation);
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
          center: mapCenter,
          mapTypeControl: false,
        }}
        zoom={20}
        onClick={onMapClick}
      >
        {position && <Marker position={position} />}
      </GoogleMap>

      <div style={{ padding: '10px' }}>
        <p>Clique no mapa para selecionar a localização</p>
        {position && (
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
