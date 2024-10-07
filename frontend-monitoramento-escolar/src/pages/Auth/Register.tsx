import { Layout } from '@frontend/components/Layout/Layout';
import { registerUser } from '@frontend/services/common/auth.service';
import { useNotification } from '@frontend/stores/common/useNotification';
import { Button, Form, Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { RegisterDto } from '@backend/auth/dto/RegisterDto';

export function Register() {
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterDto>();

  const onSubmit = () => {
    const { name, lastName, email, password } = form.getFieldsValue();
    // Handle login logic here
    registerUser({ name, lastName, email, password })
      .then(() => {
        triggerNotification({
          content: 'Conta criada com sucesso',
        });
        navigate('/menu');
      })
      .catch((erro) => {
        if (erro.isAxiosError) {
          if (erro.response?.status === 409) {
            triggerNotification({
              content: 'Usuário já existe',
            });
            // set erro the the email field
            form.setFields([
              {
                name: 'email',
                errors: ['Usuário já existe com este email'],
              },
            ]);
          } else {
            triggerNotification({
              content: 'Erro ao criar conta',
            });
          }
        } else {
          triggerNotification({
            content: 'Erro ao criar conta',
          });
        }
      });
  };

  return (
    <Layout>
      <div style={{ padding: '16px' }}>
        <Form
          form={form}
          layout='vertical'
          footer={
            <>
              <Button block onClick={onSubmit} color='success' size='middle'>
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
            rules={[{ required: true, message: 'Por favor, digite seu nome' }]}
          >
            <Input placeholder='Username' autoComplete='given-name' />
          </Form.Item>
          <Form.Item
            name='lastName'
            label='Sobrenome'
            rules={[
              { required: true, message: 'Por favor, digite seu sobrenome' },
            ]}
          >
            <Input placeholder='Username' autoComplete='family-name' />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email de usuário'
            rules={[{ required: true, message: 'Por favor, insira seu email' }]}
          >
            <Input placeholder='Username' autoComplete='email' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Senha'
            rules={[
              { required: true, message: 'Por favor, insira sua senha' },
              {
                pattern: /[a-z]/,
                message: 'A senha deve conter pelo menos uma letra minúscula',
              },
              {
                pattern: /[A-Z]/,
                message: 'A senha deve conter pelo menos uma letra maiúscula',
              },
              {
                pattern: /\d/,
                message: 'A senha deve conter pelo menos um número',
              },
              {
                min: 8,
                message: 'A senha deve ter pelo menos 8 caracteres',
              },
            ]}
          >
            <Input
              type='password'
              placeholder='********'
              autoComplete='new-password'
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='Confirme sua senha'
            rules={[
              { required: true, message: 'Por favor, confirme sua senha' },
              {
                validator(_, value) {
                  if (value !== undefined) {
                    const password = form.getFieldValue('password') as string;
                    if (value !== password) {
                      return Promise.reject(
                        new Error('As senhas não são iguais'),
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type='password'
              placeholder='********'
              autoComplete='new-password'
            />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
