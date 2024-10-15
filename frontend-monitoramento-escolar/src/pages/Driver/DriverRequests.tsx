import { DeleteOutlined } from '@ant-design/icons';
import { InviteDriverDto } from '@backend/driver-invite/dto/InviteDriverDto';
import { Layout } from '@frontend/components/Layout/Layout';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverRequests } from '@frontend/stores/driver/driverRequests.store';
import { Button, Flex, Tag } from 'antd';
import { Card } from 'antd-mobile';
import { AddOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export function DriverInviteCard({ invite }: { invite: InviteDriverDto }) {
  const { child, driver, status } = invite;
  const decline = useDriverRequests(
    useShallow((state) => state.declineDriverRequest),
  );
  const accept = useDriverRequests(
    useShallow((state) => state.acceptDriverRequest),
  );
  const tNotification = useNotification((state) => state.triggerNotification);
  async function declineRequest() {
    try {
      await decline(Number(invite.id));
      tNotification({
        content: 'Motorista removido com sucesso',
      });
    } catch {
      tNotification({
        content: 'Erro ao remover o motorista',
      });
    }
  }

  async function acceptRequest() {
    try {
      await accept(Number(invite.id));
      tNotification({
        content: 'Motorista aceito com sucesso',
      });
    } catch {
      tNotification({
        content: 'Erro ao aceitar o motorista',
      });
    }
  }
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${driver.name} ${driver.lastName}`}
      extra={
        <Flex gap='8px'>
          <Button
            color='danger'
            variant='solid'
            size='small'
            onClick={declineRequest}
            icon={<DeleteOutlined />}
          >
            Declinar
          </Button>
          {status === 'pending' && (
            <Button
              color='primary'
              variant='solid'
              size='small'
              onClick={acceptRequest}
              icon={<AddOutline />}
            >
              Aceitar
            </Button>
          )}
        </Flex>
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
export function DriverRequestsPage() {
  const tNotification = useNotification((state) => state.triggerNotification);
  const requests = useDriverRequests(useShallow((state) => state.requests));
  const loadDriverRequests = useDriverRequests(
    useShallow((state) => state.loadDriverRequests),
  );
  useEffect(() => {
    loadDriverRequests()
      .then(() => {
        tNotification({
          content: 'Solicitações de motorista carregadas com sucesso',
        });
      })
      .catch(() => {
        tNotification({
          content: 'Erro ao carregar as solicitações de motorista',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {requests.map((request) => (
        <DriverInviteCard key={request.id} invite={request} />
      ))}
    </Layout>
  );
}
