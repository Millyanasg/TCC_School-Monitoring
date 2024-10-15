import { PlusOutlined } from '@ant-design/icons';
import { Layout } from '@frontend/components/Layout/Layout';
import { InviteDriverModal } from '@frontend/components/parent/driver/InviteDriverModal';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverInviteStore } from '@frontend/stores/parent/driverInvite.store';
import { Button, Typography } from 'antd';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { ParentDriverInviteCard } from '@frontend/components/parent/driver/ParentDriverInviteCard';

export function ParentDriverpage() {
  const refreshInviteState = useDriverInviteStore(
    useShallow((state) => state.updateState),
  );
  const invitedDrivers = useDriverInviteStore(
    useShallow((state) => state.invitedDrivers),
  );

  const setModalOpen = useDriverInviteStore(
    useShallow((state) => state.setModalOpen),
  );

  const tNotification = useNotification((state) => state.triggerNotification);

  useEffect(() => {
    refreshInviteState()
      .then(() => {
        tNotification({
          content: 'Motoristas carregados com sucesso',
        });
      })
      .catch(() => {
        tNotification({
          content: 'Erro ao carregar os motoristas',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <InviteDriverModal />
      <Button
        color='primary'
        variant='solid'
        icon={<PlusOutlined />}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Adicionar Motorista
      </Button>
      <Typography.Title level={2}>Motoristas Conviados</Typography.Title>
      {invitedDrivers.length <= 0 && (
        <>
          <Typography.Text type='warning'>
            Nenhum motorista convidado
          </Typography.Text>
        </>
      )}
      {invitedDrivers.map((driver, index) => (
        <ParentDriverInviteCard key={index} driver={driver} />
      ))}
    </Layout>
  );
}
