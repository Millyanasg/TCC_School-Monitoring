import { PlusOutlined } from '@ant-design/icons';
import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { Button } from 'antd';
import { Form, Input } from 'antd-mobile';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useShallow } from 'zustand/shallow';
import { AddedChildAddressCard } from './AddedChildAddressCard';
export function ChildrenForm() {
  const { triggerNotification } = useNotification();
  const [childrenList, addChildren] = useParentForm(
    useShallow((state) => [state.children, state.addChildren]),
  );
  const [setType, nextStep, prevStep] = useRegisterStep(
    useShallow((state) => [state.setType, state.nextStep, state.prevStep]),
  );
  const [form] = Form.useForm<ChildDto>();

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
            <Button
              block
              icon={<PlusOutlined />}
              color='primary'
              variant='solid'
              htmlType='submit'
              size='large'
            >
              Adicionar
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={() => {
                  setType('unset');
                  prevStep();
                }}
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                icon={<LeftOutline />}
                iconPosition='start'
                variant='filled'
              >
                Anterior
              </Button>
              <Button
                onClick={() => {
                  if (childrenList.length === 0) {
                    triggerNotification({
                      content: 'Adicione pelo menos uma criança',
                    });
                  } else {
                    nextStep();
                  }
                }}
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                icon={<RightOutline />}
                iconPosition='end'
                variant='filled'
              >
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
