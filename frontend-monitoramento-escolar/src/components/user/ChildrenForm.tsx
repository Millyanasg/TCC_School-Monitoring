import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';
import { Child, useParentForm } from '../../stores/user/useParentForm';
import { useNotification } from '@frontend/stores/common/useNotification';

function AddedChildAddressCard({
  child,
  index,
}: {
  child: Child;
  index: number;
}) {
  const [removeChild] = useParentForm(
    useShallow((state) => [state.removeChild]),
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={
        <Button color='danger' size='small' onClick={() => removeChild(index)}>
          <DeleteOutlined /> Remover
        </Button>
      }
    >
      <div>
        <p>Idade: {child.age}</p>
        <p>Ano escolar: {child.grade}</p>
      </div>
    </Card>
  );
}
export function ChildrenForm() {
  const { triggerNotification } = useNotification();
  const [childrenList, addChildren] = useParentForm(
    useShallow((state) => [state.children, state.addChildren]),
  );
  const nextStep = useRegisterStep(useShallow((state) => state.nextStep));
  const [form] = Form.useForm<Child>();

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {childrenList.map((child, index) => (
          <AddedChildAddressCard key={index} child={child} index={index} />
        ))}
      </div>
      <Form
        form={form}
        onFinish={(values) => {
          addChildren(values);
          form.resetFields();
        }}
        footer={
          <>
            <Button block type='submit' color='success' size='middle'>
              Adicionar
            </Button>
            <Button
              block
              color='primary'
              style={{ marginTop: '2rem' }}
              size='middle'
              onClick={() => {
                if (childrenList.length === 0) {
                  triggerNotification({
                    content: 'Adicione pelo menos uma criança',
                  });
                } else {
                  nextStep();
                }
              }}
            >
              Próximo
            </Button>
          </>
        }
      >
        <Form.Item
          name='name'
          label='Nome'
          rules={[
            { required: true, message: 'Por favor, insira o primeiro nome' },
          ]}
        >
          <Input placeholder='Primeiro Nome' />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Sobrenome'
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input placeholder='Sobrenome' />
        </Form.Item>
        <Form.Item
          name='age'
          label='Idade'
          rules={[{ required: true, message: 'Por favor, insira a idade' }]}
        >
          <Input placeholder='Idade' />
        </Form.Item>
        <Form.Item
          name='grade'
          label='Série'
          rules={[{ required: true, message: 'Por favor, insira a série' }]}
        >
          <Input placeholder='Série' />
        </Form.Item>
      </Form>
    </>
  );
}
