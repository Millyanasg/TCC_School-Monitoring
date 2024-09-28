import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import { useUserStore } from '@frontend/stores/user/user.store';
import { Button, Form, Input, Steps } from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import 'leaflet/dist/leaflet.css';
import { create } from 'zustand';
import { Layout } from '../components/Layout/Layout';

function UserRegistrySteps() {
  const { type, step } = useRegisterForm((state) => ({
    type: state.type,
    step: state.step,
  }));
  return (
    <Steps current={step}>
      <Step title='Seleção de perfil' description='Escolha seu perfil' />
      {type === 'parent' && (
        <>
          <Step title='Crianças' description='Cadastre seus filhos' />
          <Step title='Endereços' description='Cadastre seus endereços' />
        </>
      )}
      {type === 'driver' && (
        <>
          <Step title='Veículo' description='Informe o veículo' />
        </>
      )}
      {type === 'unset' && <Step title='...' description='...' />}
      <Step title='Finalização' description='...' />
    </Steps>
  );
}

const useRegisterForm = create<{
  type: 'parent' | 'driver' | 'unset';
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setType: (type: 'parent' | 'driver') => void;
}>((set) => {
  function nextStep() {
    set((state) => {
      return {
        ...state,
        step: state.step + 1,
      };
    });
  }
  function prevStep() {
    set((state) => {
      return {
        ...state,
        step: state.step - 1,
      };
    });
  }

  function setType(type: 'parent' | 'driver') {
    set((state) => {
      return {
        ...state,
        type: type,
      };
    });
  }

  return {
    step: 0,
    nextStep: nextStep,
    prevStep: prevStep,
    type: 'unset',
    setType: setType,
  };
});

function UserTypeSelector() {
  const { setType, nextStep } = useRegisterForm((state) => ({
    setType: state.setType,
    nextStep: state.nextStep,
  }));

  const handleSetType = (type: 'parent' | 'driver') => {
    setType(type);
    nextStep();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={() => handleSetType('parent')}
      >
        <HomeOutlined
          style={{
            fontSize: '16rem',
            color: 'blue',
          }}
        />
        Responsável
      </button>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={() => handleSetType('driver')}
      >
        <CarOutlined
          style={{
            fontSize: '16rem',
            color: 'green',
          }}
        />
        Motorista
      </button>
    </div>
  );
}

function DriverForm() {
  const [form] = Form.useForm();
  return <Form form={form}></Form>;
}

type Child = {
  name: string;
  lastName: string;
  age: number;
  grade: string;
};

type HomeAddress = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
  latitute: string;
  longitude: string;
};

const useParentForm = create<{
  children: Child[];
  homeAddress: HomeAddress[];
  addChildren: (children: Child) => void;
  removeChild: (index: number) => void;
  addHomeAddress: (homeAddress: HomeAddress) => void;
  removeHomeAddress: (index: number) => void;
}>((set) => {
  function addChildren(children: Child) {
    set((state) => {
      return {
        ...state,
        children: [...state.children, children],
      };
    });
  }
  function removeChild(index: number) {
    set((state) => {
      return {
        ...state,
        children: state.children.filter((_, i) => i !== index),
      };
    });
  }
  function addHomeAddress(homeAddress: HomeAddress) {
    set((state) => {
      return {
        ...state,
        homeAddress: [...state.homeAddress, homeAddress],
      };
    });
  }
  function removeHomeAddress(index: number) {
    set((state) => {
      return {
        ...state,
        homeAddress: state.homeAddress.filter((_, i) => i !== index),
      };
    });
  }
  return {
    children: [],
    homeAddress: [],
    addChildren: addChildren,
    removeChild: removeChild,
    addHomeAddress: addHomeAddress,
    removeHomeAddress: removeHomeAddress,
  };
});

function ChildrenForm() {
  const { childrenList, addChildren, removeChild } = useParentForm((state) => ({
    childrenList: state.children,
    addChildren: state.addChildren,
    removeChild: state.removeChild,
  }));
  const [form] = Form.useForm<Child>();

  return (
    <>
      <div>
        {childrenList.map((child, index) => (
          <div key={index}>
            <p>{child.name}</p>
            <p>{child.lastName}</p>
            <p>{child.age}</p>
            <p>{child.grade}</p>
            <button onClick={() => removeChild(index)}>Remover</button>
          </div>
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
                addChildren(values);
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
              onClick={() => nextStep()}
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

function HomeAddressForm() {
  const { homeAddressList, addHomeAddress, removeHomeAddress } = useParentForm(
    (state) => ({
      homeAddressList: state.homeAddress,
      addHomeAddress: state.addHomeAddress,
      removeHomeAddress: state.removeHomeAddress,
    }),
  );
  const [form] = Form.useForm<HomeAddress>();
  return (
    <>
      <div>
        {homeAddressList.map((homeAddress, index) => (
          <div key={index}>
            <p>{homeAddress.street}</p>
            <p>{homeAddress.number}</p>
            <p>{homeAddress.city}</p>
            <p>{homeAddress.state}</p>
            <p>{homeAddress.zipCode}</p>
            <button onClick={() => removeHomeAddress(index)}>Remover</button>
          </div>
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

function ParentForm() {
  const { step } = useRegisterForm((state) => state);
  return (
    <>
      {step === 1 && <ChildrenForm />}
      {step === 2 && <HomeAddressForm />}
    </>
  );
}

function UserSetUpFrom() {
  const { type, step } = useRegisterForm((state) => ({
    type: state.type,
    step: state.step,
  }));
  return (
    <div>
      <UserRegistrySteps />
      {step === 0 && <UserTypeSelector />}
      {type === 'parent' && <ParentForm />}
      {type === 'driver' && <DriverForm />}
    </div>
  );
}

export function Menu() {
  const userData = useUserStore((state) => state.userData);
  return (
    <Layout>
      {userData && userData.type === 'unset' && <UserSetUpFrom />}
    </Layout>
  );
}
