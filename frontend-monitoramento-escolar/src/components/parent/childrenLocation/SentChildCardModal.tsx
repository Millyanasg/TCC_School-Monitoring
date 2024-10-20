import { CloseCircleOutlined } from '@ant-design/icons';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenLocation } from '@frontend/stores/parent/childrenLocation.store';
import { Button, Flex, Modal, Typography } from 'antd';
import { UpOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';

export const SentChildCardModal = ({
  isOpen,
  onClose,
  child,
}: {
  isOpen: boolean;
  onClose: () => void;
  child: ChildViewWithLocationDto;
}) => {
  const sendChildLocation = useChildrenLocation(
    useShallow((state) => state.sendChildLocation),
  );
  const TNotification = useNotification((state) => state.triggerNotification);
  const confirmSend = async () => {
    try {
      TNotification({
        content: `${child.name} ${child.lastName} marcada como enviada`,
      });
      await sendChildLocation(child.id);
    } catch {
      TNotification({
        content: 'Erro ao marcar a criança como enviada',
      });
    }
  };
  return (
    <Modal open={isOpen} footer={null} onClose={onClose}>
      <Typography.Title level={4}>
        Para enviar {child.name} {child.lastName} aperte o botão abaixo
      </Typography.Title>
      <Typography.Text>
        Apos a confirmação a criança será enviada para a escola e voce podera
        acompanhar a localização dela em tempo real
      </Typography.Text>
      <Flex
        gap={'1rem'}
        style={{
          marginTop: '1rem',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={confirmSend}
          color='primary'
          variant='solid'
          size='middle'
          icon={<UpOutline />}
        >
          Liberar Criança
        </Button>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onClose}
          variant='solid'
          color='danger'
          size='middle'
        >
          Fechar
        </Button>
      </Flex>
    </Modal>
  );
};
