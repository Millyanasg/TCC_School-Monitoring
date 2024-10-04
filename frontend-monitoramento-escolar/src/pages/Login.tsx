import { Button, Form, Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { useNotification } from '../stores/common/useNotification';
import { loginUser } from '../services/common/auth.service';
import { useUserStore } from '@frontend/stores/user/user.store';

export function Login() {
  const { triggerNotification } = useNotification();
  const updateUserData = useUserStore((state) => state.updateUserData);
  const navigate = useNavigate();
  const onFinish = (values: { email: string; password: string }) => {
    const { email, password } = values;
    loginUser({ email, password })
      .then(async () => {
        triggerNotification({
          content: 'Logado com sucesso',
        });
        await updateUserData();
        navigate('/menu');
      })
      .catch(() => {
        triggerNotification({
          content: 'Erro ao logar',
        });
      });
  };

  return (
    <Layout>
      <div style={{ padding: '16px' }}>
        <Form
          layout='horizontal'
          onFinish={onFinish}
          footer={
            <>
              <Button block type='submit' color='success' size='middle'>
                Entrar
              </Button>
              <Button
                block
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                onClick={() => navigate('/register')}
              >
                Criar conta
              </Button>
            </>
          }
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Por favor, insira seu email' }]}
          >
            <Input placeholder='seu@email.com' autoComplete='email' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Senha'
            rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
          >
            <Input
              type='password'
              placeholder='********'
              autoComplete='current-password'
            />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
