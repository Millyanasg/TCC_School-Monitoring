import { Layout } from '@frontend/components/Layout/Layout';
import { DriverInviteCard } from '@frontend/components/driver/DriverInviteCard';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverRequests } from '@frontend/stores/driver/driverRequests.store';
import { Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

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
      <Typography.Title level={2}>
        Suas solicitações de Motorista
      </Typography.Title>
      <Flex gap='large' vertical>
        {requests.map((request) => (
          <DriverInviteCard key={request.id} invite={request} />
        ))}
      </Flex>
    </Layout>
  );
}
