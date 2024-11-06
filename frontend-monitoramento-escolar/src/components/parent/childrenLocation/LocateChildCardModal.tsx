import { CloseCircleOutlined } from '@ant-design/icons';
import { Location } from '@backend/location/dto/Location';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenLocation } from '@frontend/stores/parent/childrenLocation.store';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Drawer, Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
export const LocateChildCardModal = ({
  isOpen,
  onClose,
  child,
}: {
  isOpen: boolean;
  onClose: () => void;
  child: ChildViewWithLocationDto;
}) => {
  const getChildrenLocation = useChildrenLocation(
    useShallow((state) => state.getChildrenLocation),
  );
  const TNotification = useNotification((state) => state.triggerNotification);

  const [location, setLocation] = useState<Location | null>();

  useEffect(() => {
    if (isOpen) {
      getChildrenLocation(child.id)
        .then((location) => {
          setLocation(location);
          TNotification({
            content: 'Localização carregada com sucesso',
          });
        })
        .catch(() => {
          TNotification({
            content: 'Erro ao carregar a localização',
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      footer={
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onClose}
          type='primary'
          color='danger'
        >
          Fechar
        </Button>
      }
      onClose={onClose}
      width={'100vw'}
    >
      <Typography.Title level={2}>
        Localização para {child.name} {child.lastName}
      </Typography.Title>
      {child.driver && (
        <Typography.Title level={3}>
          Motorista: {child.driver.name}
        </Typography.Title>
      )}
      <Typography.Text>
        {child.name} {child.lastName} está localizado em:
      </Typography.Text>
      {location != null ? (
        <Flex vertical align='center'>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '600px' }}
            options={{
              streetViewControl: false,
              fullscreenControl: false,
              cameraControl: true,
              tiltInteractionEnabled: false,
              // disable satellite view
              mapTypeControl: false,
              center: {
                lat: location.location.latitude,
                lng: location.location.longitude,
              },
            }}
            zoom={13}
          >
            {location.location && (
              <Marker
                position={{
                  lat: location.location.latitude,
                  lng: location.location.longitude,
                }}
              />
            )}
          </GoogleMap>
          <Button
            style={{ marginTop: '1rem' }}
            size='large'
            block
            color='danger'
            variant='solid'
            onClick={() =>
              getChildrenLocation(child.id).then((location) => {
                setLocation(location);
                TNotification({
                  content: 'Localização atualizada com sucesso',
                });
              })
            }
          >
            Cancelar rota
          </Button>
        </Flex>
      ) : (
        <Typography.Text>Localização não encontrada</Typography.Text>
      )}
    </Drawer>
  );
};
