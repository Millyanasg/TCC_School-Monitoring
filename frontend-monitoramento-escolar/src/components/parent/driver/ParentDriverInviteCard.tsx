import { DeleteOutlined } from '@ant-design/icons';
import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverInviteStore } from '@frontend/stores/parent/driverInvite.store';
import { Button, Tag } from 'antd';
import { Card } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

export function ParentDriverInviteCard({
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
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${driver.name} ${driver.lastName}`}
      extra={
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
      }
    >
      <div>
        <p>
          Motorista: {driver.name} {driver.lastName}
        </p>
        <p>
          Status:{' '}
          <Tag
            color={
              status === 'allowed'
                ? 'green'
                : status === 'pending'
                ? 'blue'
                : 'red'
            }
          >
            {status}
          </Tag>
        </p>
        <p>
          Criança: {child.name} {child.lastName}
        </p>
      </div>
    </Card>
  );
}
