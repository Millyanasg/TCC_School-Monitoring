import { EditOutlined } from '@ant-design/icons';
import { Layout } from '@frontend/components/Layout/Layout';
import { useDriverCar } from '@frontend/stores/driver/driverCar.store';
import { useUserStore } from '@frontend/stores/user/user.store';
import { Button } from 'antd';
import { useShallow } from 'zustand/shallow';
import { EditDriverCarModal } from '@frontend/components/driver/EditDriverCarModal';
import { DriverCarInfo } from '@frontend/components/driver/DriverCarInfo';

export function DriverCarPage() {
  const setIsEditing = useDriverCar(useShallow((state) => state.setIsEditing));
  const user = useUserStore(useShallow((state) => state.userData));
  const driver = useDriverCar(useShallow((state) => state.driver));
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
