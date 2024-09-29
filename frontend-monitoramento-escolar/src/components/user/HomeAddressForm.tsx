import {
  DeleteOutlined,
  GlobalOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { Button } from 'antd';
import { Card, Form, Input } from 'antd-mobile';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { HomeAddress, useParentForm } from '../../stores/user/useParentForm';
import MapSelector from '../common/MapSelector';

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
              onClick={() => removeHomeAddress(index)}
              color='danger'
              variant='solid'
              size='small'
              icon={<DeleteOutlined />}
            >
              Excluir
            </Button>
          )}
        </>
      }
    >
      <div>
        <p>Cidade: {city}</p>
        <p>Estado: {state}</p>
        <p>CEP: {zipCode}</p>
        <p>Latitude: {homeAddress.latitute}</p>
        <p>Longitude: {homeAddress.longitude}</p>
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
  const [isMapOpen, setMapOpen] = useState(false);
  function onSelectLocation(lat: number, lon: number) {
    form.setFieldsValue({
      latitute: String(lat.toFixed(6)),
      longitude: String(lon.toFixed(6)),
    });
  }

  return (
    <>
      <MapSelector
        onClose={() => setMapOpen(false)}
        onSelectLocation={onSelectLocation}
        isOpen={isMapOpen}
      />
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
          if (!values.latitute || !values.longitude) {
            triggerNotification({
              content: 'Por favor, selecione a localização',
            });
            return;
          }
          addHomeAddress(values);
          form.resetFields();
          form.setFieldsValue({ latitute: '', longitude: '' });
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
                onClick={prevStep}
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
                  if (homeAddressList.length === 0) {
                    triggerNotification({
                      content: 'Por favor, adicione um endereço',
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
        <Form.Item name='latitute' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='longitude' hidden>
          <Input />
        </Form.Item>
        <Button
          onClick={() => setMapOpen(true)}
          block
          color='primary'
          size='middle'
          iconPosition='start'
          variant='filled'
          icon={<GlobalOutlined />}
        >
          Selecione a localização
        </Button>
      </Form>
    </>
  );
}
