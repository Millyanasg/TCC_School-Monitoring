import { useUserStore } from '@frontend/stores/user/user.store';
import 'leaflet/dist/leaflet.css';
import { useShallow } from 'zustand/shallow';

import {
  CarOutlined,
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  NodeIndexOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout } from '@frontend/components/Layout/Layout';
import { UserRegistrySteps } from '@frontend/components/user/UserRegistrySteps';
import { UserTypeSelector } from '@frontend/components/user/UserTypeSelector';
import { DriverForm } from '@frontend/components/user/driverFrom/DriverForm';
import { ParentForm } from '@frontend/components/parent/parentFrom/ParentForm';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout } from '@frontend/services/common/auth.service';
function UserSetUpFrom() {
  const [step, type] = useRegisterStep(
    useShallow((state) => [state.step, state.type]),
  );
  return (
    <div>
      <UserRegistrySteps />
      {step === 0 && <UserTypeSelector />}
      {type === 'parent' && <ParentForm />}
      {type === 'driver' && <DriverForm />}
    </div>
  );
}

function AdminMenu() {
  const navigate = useNavigate();
  return (
    <Flex
      align='center'
      justify='center'
      gap={'1rem'}
      flex={1}
      vertical
      style={{
        marginTop: '1rem',
      }}
    >
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/admin/usuarios');
        }}
        icon={<UserOutlined />}
      >
        Usuários
      </Button>
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/admin/motoristas');
        }}
        icon={<CarOutlined />}
      >
        Motoristas
      </Button>
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/admin/responsaveis');
        }}
        icon={<UsergroupAddOutlined />}
      >
        Responsáveis
      </Button>
    </Flex>
  );
}
function ParentMenu() {
  const navigate = useNavigate();
  return (
    <Flex
      align='center'
      justify='center'
      gap={'1rem'}
      flex={1}
      vertical
      style={{
        marginTop: '1rem',
      }}
    >
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/parent/children');
        }}
        icon={<HeartOutlined />}
      >
        Meus filhos
      </Button>
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/parent/addresses');
        }}
        icon={<HomeOutlined />}
      >
        Meus endereços
      </Button>
    </Flex>
  );
}
function DriverMenu() {
  const navigate = useNavigate();
  return (
    <Flex
      align='center'
      justify='center'
      gap={'1rem'}
      flex={1}
      vertical
      style={{
        marginTop: '1rem',
      }}
    >
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/veiculo');
        }}
        icon={<CarOutlined />}
      >
        Meu Veiculo
      </Button>
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/corridas');
        }}
        icon={<NodeIndexOutlined />}
      >
        Minhas corridas
      </Button>
    </Flex>
  );
}
function SessionMenu() {
  const userData = useUserStore((state) => state.userData);
  return (
    <Flex
      align='center'
      justify='center'
      gap={'1rem'}
      flex={1}
      vertical
      style={{
        marginTop: '1rem',
      }}
    >
      <Typography.Title level={3}>Olá, {userData?.name}</Typography.Title>

      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        color='danger'
        onClick={async () => {
          await logout();
          await useUserStore.setState({ userData: null });
        }}
        icon={<LogoutOutlined />}
      >
        Sair
      </Button>
    </Flex>
  );
}
export function Menu() {
  const userData = useUserStore((state) => state.userData);
  return (
    <Layout>
      <SessionMenu />
      {userData && userData.type === 'unset' && <UserSetUpFrom />}
      {userData && userData.type === 'admin' && <AdminMenu />}
      {userData && userData.type === 'parent' && <ParentMenu />}
      {userData && userData.type === 'driver' && <DriverMenu />}
    </Layout>
  );
}
