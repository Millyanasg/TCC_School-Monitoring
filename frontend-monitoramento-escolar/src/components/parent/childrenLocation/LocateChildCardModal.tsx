import { CloseCircleOutlined } from '@ant-design/icons';
import { Location } from '@backend/location/dto/Location';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenLocation } from '@frontend/stores/parent/childrenLocation.store';
import { Button, Drawer, Typography } from 'antd';
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
      {location?.latitude && location?.longitude ? (
        <iframe
          width='100%'
          height='100%'
          frameBorder='0'
          scrolling='no'
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
        ></iframe>
      ) : (
        <Typography.Text>Localização não encontrada</Typography.Text>
      )}
    </Drawer>
  );
};
