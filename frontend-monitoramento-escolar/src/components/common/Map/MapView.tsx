import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
type MapSelectorProps = {
  initialLocation: { lat: number; lng: number };
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapView = ({ initialLocation, isOpen, setOpen }: MapSelectorProps) => {
  const onClose = () => {
    setOpen(false);
  };
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: initialLocation.lat,
    lng: initialLocation.lng,
  });
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: initialLocation.lat,
    lng: initialLocation.lng,
  });
  useEffect(() => {
    if (initialLocation) {
      setPosition(initialLocation);
      setMapCenter(initialLocation);
    }
  }, [initialLocation]);

  return (
    <Modal
      title='Seu Endereço'
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      style={{ top: 20 }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: initialLocation.lat,
          lng: initialLocation.lng,
        }}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          center: mapCenter,
          mapTypeControl: false,
        }}
        zoom={20}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </Modal>
  );
};

export default MapView;
