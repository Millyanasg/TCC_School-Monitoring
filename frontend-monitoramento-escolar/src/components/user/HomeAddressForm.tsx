import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { Button, Card, Form, Input } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { HomeAddress, useParentForm } from '../../stores/user/useParentForm';

export function AddedHomeAddressCard({
  homeAddress,
  index,
  allowRemove = true,
}: {
  homeAddress: HomeAddress;
  index: number;
  allowRemove?: boolean;
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
        <>
          {allowRemove && (
            <Button
              color='danger'
              size='small'
              onClick={() => removeHomeAddress(index)}
            >
              <DeleteOutlined /> Remover
            </Button>
          )}
        </>
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
export function HomeAddressForm() {
  const { triggerNotification } = useNotification();
  const [homeAddressList, addHomeAddress] = useParentForm(
    useShallow((state) => [state.homeAddress, state.addHomeAddress]),
  );
  const [nextStep, prevStep] = useRegisterStep(
    useShallow((state) => [state.nextStep, state.prevStep]),
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
        onFinish={(values) => {
          addHomeAddress(values);
          form.resetFields();
        }}
        footer={
          <>
            <Button block type='submit' color='success' size='middle'>
              <PlusOutlined />
              Adicionar
            </Button>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                onClick={prevStep}
              >
                <LeftOutline />
                Anterior
              </Button>
              <Button
                color='primary'
                style={{ marginTop: '2rem' }}
                size='middle'
                onClick={() => {
                  if (homeAddressList.length === 0) {
                    triggerNotification({
                      content: 'Por favor, adicione um endereço',
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
