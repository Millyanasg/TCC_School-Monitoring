import { GoogleMap, Marker } from '@react-google-maps/api';
import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
type MapSelectorProps = {
  initialLocation: GeolocationPosition;
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

  return (
    <Modal
      title='Selecione a localização'
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
      style={{ top: 20 }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: initialLocation.coords.latitude,
          lng: initialLocation.coords.longitude,
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
            lat: initialLocation.coords.latitude,
            lng: initialLocation.coords.longitude,
          }}
        />
      </GoogleMap>
    </Modal>
  );
};

export default MapView;