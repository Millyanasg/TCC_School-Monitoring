import { Result, Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';

export function RouteError() {
  const navigate = useNavigate();

  return (
    <Layout>
      {' '}
      <div style={{ padding: '16px' }}>
        <Result status='error' title='404' description='Page not found' />
        <Button
          block
          color='primary'
          size='large'
          onClick={() => navigate('/')}
        >
          Voltar para a página inicial
        </Button>
      </div>
    </Layout>
  );
}
