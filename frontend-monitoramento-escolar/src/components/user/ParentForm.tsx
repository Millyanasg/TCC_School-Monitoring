import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '../../stores/user/useRegisterStep';
import {
  Child,
  useParentForm,
  HomeAddress,
} from '../../stores/user/useParentForm';
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
function ChildrenForm() {
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

function AddedHomeAddressCard({
  homeAddress,
  index,
}: {
  homeAddress: HomeAddress;
  index: number;
}) {
  const { street, number, city, state, zipCode } = homeAddress;
  const [removeHomeAddress] = useParentForm(
    useShallow((state) => [state.removeHomeAddress]),
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${street} ${number}`}
      extra={
        <Button
          color='danger'
          size='small'
          onClick={() => removeHomeAddress(index)}
        >
          <DeleteOutlined /> Remover
        </Button>
      }
    >
      <div>
        <p>Cidade: {city}</p>
        <p>Estado: {state}</p>
        <p>CEP: {zipCode}</p>
      </div>
    </Card>
  );
}

function HomeAddressForm() {
  const [homeAddressList, addHomeAddress] = useParentForm(
    useShallow((state) => [state.homeAddress, state.addHomeAddress]),
  );
  const [form] = Form.useForm<HomeAddress>();
  return (
    <>
      <div>
        {homeAddressList.map((homeAddress, index) => (
          <AddedHomeAddressCard
            key={index}
            homeAddress={homeAddress}
            index={index}
          />
        ))}
      </div>
      <Form
        form={form}
        footer={
          <>
            <Button
              block
              onClick={() => {
                const values = form.getFieldsValue();
                addHomeAddress(values);
                form.resetFields();
              }}
              color='success'
              size='middle'
            >
              Adicionar
            </Button>
            <Button
              block
              color='primary'
              style={{ marginTop: '2rem' }}
              size='middle'
            >
              Próximo
            </Button>
          </>
        }
      >
        <Form.Item
          name='street'
          label='Rua'
          rules={[
            { required: true, message: 'Por favor, insira o nome da rua' },
          ]}
        >
          <Input placeholder='Nome da Rua' />
        </Form.Item>
        <Form.Item
          name='number'
          label='Número'
          rules={[{ required: true, message: 'Por favor, insira o número' }]}
        >
          <Input placeholder='Número' />
        </Form.Item>
        <Form.Item
          name='city'
          label='Cidade'
          rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
        >
          <Input placeholder='Cidade' />
        </Form.Item>
        <Form.Item
          name='state'
          label='Estado'
          rules={[{ required: true, message: 'Por favor, insira o estado' }]}
        >
          <Input placeholder='Estado' />
        </Form.Item>
        <Form.Item
          name='zipCode'
          label='CEP'
          rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
        >
          <Input placeholder='CEP' />
        </Form.Item>
      </Form>
    </>
  );
}
export function ParentForm() {
  const step = useRegisterStep(useShallow((state) => state.step));
  return (
    <>
      {step === 1 && <ChildrenForm />}
      {step === 2 && <HomeAddressForm />}
    </>
  );
}
