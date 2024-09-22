import { Toast, Button, Input, Form } from 'antd-mobile';
import { Layout } from '../components/Layout/Layout';

export function Login() {
  const onFinish = (values: any) => {
    // Handle login logic here
    console.log('Success:', values);
    Toast.show({
      icon: 'success',
      content: 'Login successful',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
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
            <Button block type='submit' color='primary' size='large'>
              Login
            </Button>
          }
        >
          <Form.Item
            name='username'
            label='Username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input type='password' placeholder='Password' />
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
