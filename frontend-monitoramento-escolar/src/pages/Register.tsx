import { Button, Form, FormProps, Input, Toast } from 'antd-mobile';
import { Layout } from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const onFinish = (values: { username: string; password: string }) => {
    // Handle login logic here
    console.log('Success:', values);
    Toast.show({
      icon: 'success',
      content: 'Login successful',
    });
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    Toast.show({
      icon: 'fail',
      content: 'Login failed',
    });
  };

  return (
    <Layout>
      <div style={{ padding: '16px' }}>
        <Form
          layout='horizontal'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          footer={
            <>
              <Button block type='submit' color='success' size='middle'>
                Criar conta
              </Button>
              <Button
                block
                color='primary'
                size='middle'
                onClick={() => navigate('/')}
                style={{ marginTop: '2rem' }}
              >
                Caso você já tenha uma conta, clique aqui para fazer login
              </Button>
            </>
          }
        >
          <Form.Item
            name='name'
            label='Primeiro nome'
            rules={[{ required: true, message: 'Por favor, digite seu nome!' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='lastName'
            label='Sobrenome'
            rules={[
              { required: true, message: 'Por favor, digite seu sobrenome!' },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email de usuário'
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Senha'
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
            ]}
          >
            <Input type='password' placeholder='********' />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
