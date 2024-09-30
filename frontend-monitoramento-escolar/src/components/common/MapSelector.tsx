import { Modal } from 'antd';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
type MapSelectorProps = {
  onSelectLocation: (lat: number, lon: number) => void;
  isOpen: boolean;
  onClose: () => void;
  initialLocation: GeolocationPosition | null;
};

function MapSelector({
  onSelectLocation,
  isOpen,
  onClose,
  initialLocation,
}: MapSelectorProps) {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lon: lng });
      },
    });

    return position === null ? null : (
      <Marker position={[position.lat, position.lon]} />
    );
  };

  useEffect(() => {
    if (position) {
      onSelectLocation(position.lat, position.lon);
    }
  }, [position, onSelectLocation]);

  return (
    <Modal
      title='Selecione a localização'
      open={isOpen}
      onCancel={onClose}
      onOk={onClose}
    >
      <MapContainer
        center={[
          initialLocation?.coords.latitude || -15.7801,
          initialLocation?.coords.longitude || -47.9292,
        ]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
      </MapContainer>
      <p>Clique no mapa para selecionar a localização</p>
      {position && (
        <p>
          Latitude: {position.lat.toFixed(6)} Longitude:{' '}
          {position.lon.toFixed(6)}
        </p>
      )}
    </Modal>
  );
}

export default MapSelector;
