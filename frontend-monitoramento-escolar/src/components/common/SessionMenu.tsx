import { useUserStore } from '@frontend/stores/user/user.store';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout } from '@frontend/services/common/auth.service';

export const SessionMenu = () => {
  const navigate = useNavigate();
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
          navigate('/');
        }}
        icon={<LogoutOutlined />}
      >
        Sair
      </Button>
    </Flex>
  );
};
