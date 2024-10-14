import { EditOutlined } from '@ant-design/icons';
import { Layout } from '@frontend/components/Layout/Layout';
import { useDriverCar } from '@frontend/stores/driver/driverCar.store';
import { useUserStore } from '@frontend/stores/user/user.store';
import { Button } from 'antd';
import { useShallow } from 'zustand/shallow';
import { EditDriverCarModal } from '@frontend/components/driver/EditDriverCarModal';
import { DriverCarInfo } from '@frontend/components/driver/DriverCarInfo';
import { useEffect } from 'react';
import { useNotification } from '@frontend/stores/common/useNotification';

export function DriverCarPage() {
  const setIsEditing = useDriverCar(useShallow((state) => state.setIsEditing));
  const tNotification = useNotification((state) => state.triggerNotification);
  const loadDriver = useDriverCar(useShallow((state) => state.loadDriver));
  const user = useUserStore(useShallow((state) => state.userData));
  const driver = useDriverCar(useShallow((state) => state.driver));
  useEffect(() => {
    loadDriver()
      .then(() => {
        tNotification({
          content: 'Carro carregado com sucesso',
        });
      })
      .catch(() => {
        tNotification({
          content: 'Erro ao carregar o carro',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {driver && user ? (
        <DriverCarInfo driver={driver} user={user} />
      ) : (
        <>Loading...</>
      )}
      <EditDriverCarModal />
      <Button
        onClick={() => setIsEditing(true)}
        color='primary'
        variant='solid'
        size='middle'
        block
        icon={<EditOutlined />}
      >
        Editar
      </Button>
    </Layout>
  );
}
