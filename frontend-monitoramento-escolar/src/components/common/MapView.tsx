import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
type MapSelectorProps = {
  initialLocation: GeolocationPosition;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

function MapView({ initialLocation, isOpen, setOpen }: MapSelectorProps) {
  function onClose() {
    setOpen(false);
  }

  return (
    <Modal
      title='Selecione a localização'
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
    >
      <MapContainer
        center={[
          initialLocation.coords.latitude,
          initialLocation.coords.longitude,
        ]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[
            initialLocation.coords.latitude,
            initialLocation.coords.longitude,
          ]}
        />
      </MapContainer>
    </Modal>
  );
}

export default MapView;
