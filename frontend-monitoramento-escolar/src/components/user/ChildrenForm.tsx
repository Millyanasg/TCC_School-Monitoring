import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@frontend/stores/common/useNotification';
import { Button, Card, Form, Input } from 'antd-mobile';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';
import { Child, useParentForm } from '../../stores/user/useParentForm';
import { useRegisterStep } from '../../stores/user/useRegisterStep';

export function AddedChildAddressCard({
  child,
  index,
  allowRemove = true,
}: {
  child: Child;
  index: number;
  allowRemove?: boolean;
}) {
  const [removeChild] = useParentForm(
    useShallow((state) => [state.removeChild]),
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={
        <>
          {allowRemove && (
            <Button
              color='danger'
              size='small'
              onClick={() => removeChild(index)}
            >
              <DeleteOutlined /> Remover
            </Button>
          )}
        </>
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
  const [nextStep, prevStep] = useRegisterStep(
    useShallow((state) => [state.nextStep, state.prevStep]),
  );
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
              <PlusOutlined /> Adicionar
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                onClick={() => {
                  prevStep();
                }}
              >
                <LeftOutline />
                Anterior
              </Button>
              <Button
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
                <RightOutline />
                Próximo
              </Button>
            </div>
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
