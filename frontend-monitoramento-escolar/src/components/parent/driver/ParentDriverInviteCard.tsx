import { DeleteOutlined } from '@ant-design/icons';
import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverInviteStore } from '@frontend/stores/parent/driverInvite.store';
import { Button, Tag } from 'antd';
import { Card } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

export default function ParentDriverInviteCard({
  driver: driverInvite,
}: {
  driver: InviteDriverDto;
}) {
  const { child, driver, status } = driverInvite;
  const deleteDriverInvite = useDriverInviteStore(
    useShallow((state) => state.deleteDriverInvite),
  );
  const tNotification = useNotification((state) => state.triggerNotification);
  async function removeDriverInvite() {
    try {
      await deleteDriverInvite(Number(driverInvite.id));
      tNotification({
        content: 'Motorista removido com sucesso',
      });
    } catch {
      tNotification({
        content: 'Erro ao remover o motorista',
      });
    }
  }
  const getTagColor = (): string => {
    switch (status) {
      case 'allowed':
        return 'green';
      case 'declined':
        return 'red';
      case 'disallowed':
        return 'red';
      case 'pending':
        return 'blue';
      default:
        return 'black';
    }
  };

  const getTagtext = (): string => {
    switch (status) {
      case 'allowed':
        return 'Permitido';
      case 'declined':
        return 'Recusado';
      case 'disallowed':
        return 'Não permitido';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${driver.name} ${driver.lastName}`}
      extra={
        <>
          {status !== 'declined' && (
            <Button
              color='danger'
              variant='solid'
              size='small'
              icon={<DeleteOutlined />}
              onClick={removeDriverInvite}
            >
              {status === 'allowed' && 'Remover'}
              {status === 'pending' && 'Cancelar'}
              {status === 'disallowed' && 'Remover'}
            </Button>
          )}
        </>
      }
    >
      <div>
        <p>
          Motorista: {driver.name} {driver.lastName}
        </p>
        <p>
          Status: <Tag color={getTagColor()}>{getTagtext()}</Tag>
        </p>
        <p>
          Criança: {child.name} {child.lastName}
        </p>
      </div>
    </Card>
  );
}
