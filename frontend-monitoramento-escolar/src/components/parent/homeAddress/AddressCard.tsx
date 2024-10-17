import {
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import MapView from '@frontend/components/common/MapView';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button, Flex } from 'antd';
import { Card } from 'antd-mobile';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const AddressCard = ({ address }: { address: HomeAddressViewDto }) => {
  const { triggerNotification } = useNotification();
  const [setIsEditing, setSelectedHomeAddress, removeHomeAddress] =
    useHomeAddressStore(
      useShallow((state) => [
        state.setIsEditing,
        state.setSelectedHomeAddress,
        state.removeHomeAddress,
      ]),
    );
  const [isMapOpen, setMapOpen] = useState(false);
  const { street, number, city, state, zipCode, latitude, longitude } = address;

  const location: GeolocationPosition = {
    coords: {
      latitude: latitude,
      longitude: longitude,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  };

  const handleRemove = async () => {
    try {
      await removeHomeAddress(address);
      triggerNotification({
        content: 'Endereço removido com sucesso',
      });
    } catch {
      triggerNotification({
        content: 'Erro ao remover endereço',
      });
    }
  };

  const handleEdit = () => {
    setSelectedHomeAddress(address);
    setIsEditing(true);
  };

  return (
    <Card style={{ marginBottom: '16px' }} title={`${street} ${number}`}>
      <MapView
        initialLocation={location}
        isOpen={isMapOpen}
        setOpen={setMapOpen}
      />
      <Flex
        vertical
        style={{
          marginTop: '16px',
          marginBottom: '16px',
        }}
        align='start'
        gap={8}
      >
        <p>Cidade: {city}</p>
        <p>Estado: {state}</p>
        <p>CEP: {zipCode}</p>
        <Flex
          gap={8}
          align='center'
          style={{
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <Button
            onClick={handleRemove}
            color='danger'
            variant='solid'
            size='small'
            icon={<DeleteOutlined />}
          >
            Excluir
          </Button>
          <Button
            onClick={handleEdit}
            color='primary'
            variant='solid'
            size='small'
            icon={<EditOutlined />}
          >
            Editar
          </Button>
          <Button
            icon={<PushpinOutlined />}
            onClick={() => setMapOpen(true)}
            color='primary'
            variant='solid'
            size='small'
          >
            Ver no Mapa
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
