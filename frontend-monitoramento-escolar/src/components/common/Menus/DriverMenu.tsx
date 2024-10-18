import {
  CarOutlined,
  MailOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const DriverMenu = () => {
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
          navigate('/diver/my-car');
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
          navigate('/diver/trips');
        }}
        icon={<NodeIndexOutlined />}
      >
        Minhas corridas
      </Button>
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/diver/requests');
        }}
        icon={<MailOutlined />}
      >
        Solicitações
      </Button>
    </Flex>
  );
};
