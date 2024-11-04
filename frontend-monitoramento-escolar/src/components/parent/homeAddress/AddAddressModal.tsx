import { GlobalOutlined } from '@ant-design/icons';
import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import MapSelector from '@frontend/components/common/Map/MapSelector';
import { usePositionStore } from '@frontend/stores/common/position.store';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const AddAddressModal = () => {
  const [isAdding, setIsAdding, addHomeAddress] = useHomeAddressStore(
    useShallow((state) => [
      state.isAdding,
      state.setIsAdding,
      state.addHomeAddress,
    ]),
  );
  const [form] = Form.useForm<AllStrings<HomeAddressDto>>();
  const { triggerNotification } = useNotification();
  const { location } = usePositionStore();
  const [isMapOpen, setMapOpen] = useState(false);
  const onSelectLocation = (lat: number, lon: number) => {
    console.log(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const submitChild = async (values: AllStrings<HomeAddressDto>) => {
    try {
      await addHomeAddress({
        number: Number(values.number),
        // remove all non-numeric characters from zipCode
        zipCode: values.zipCode.replace(/\D/g, ''),
        street: values.street,
        city: values.city,
        state: values.state,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
      });
      triggerNotification({
        content: 'Endereço adicionado com sucesso',
      });
      setIsAdding(false);
      form.resetFields();
    } catch {
      triggerNotification({
        content: 'Erro ao adicionar endereço',
      });
    }
  };

  return (
    <Modal
      onCancel={handleCancelAdd}
      title='Adicionar endereço'
      open={isAdding}
      footer={null}
    >
      <Form onFinish={submitChild} form={form}>
        <Form.Item
          label='Rua'
          name='street'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Número'
          name='number'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Cidade'
          name='city'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Estado'
          name='state'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='CEP'
          name='zipCode'
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input maxLength={8} />
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
          {(function () {
            if (
              form.getFieldValue('latitude') &&
              form.getFieldValue('longitude')
            ) {
              return 'Localização selecionada';
            }
            return 'Selecione a localização';
          })()}
        </Button>
        <MapSelector
          onClose={() => setMapOpen(false)}
          onSelectLocation={onSelectLocation}
          isOpen={isMapOpen}
          initialLocation={location}
        />
        <Form.Item name='latitude' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='longitude' hidden>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
