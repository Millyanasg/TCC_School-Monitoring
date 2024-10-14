import {
  CarOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export function AdminMenu() {
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
