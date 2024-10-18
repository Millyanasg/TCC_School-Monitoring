import { CarOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const ParentMenu = () => {
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
      <Button
        block
        size={'large'}
        type='primary'
        variant='solid'
        onClick={() => {
          navigate('/parent/driver-request');
        }}
        icon={<CarOutlined />}
      >
        Meus Motoristas
      </Button>
    </Flex>
  );
};
