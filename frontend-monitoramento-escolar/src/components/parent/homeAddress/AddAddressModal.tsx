import { GlobalOutlined } from '@ant-design/icons';
import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import MapSelector from '@frontend/components/common/Map/MapSelector';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import axios from 'axios';
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
  const [isMapOpen, setMapOpen] = useState(false);
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const onSelectLocation = (lat: number, lon: number) => {
    console.debug(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
    form.validateFields(['latitude', 'longitude']);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };
  const geocodeAddress = async () => {
    const street = form.getFieldValue('street');
    const number = form.getFieldValue('number');
    const city = form.getFieldValue('city');
    const state = form.getFieldValue('state');

    if (!street || !number || !city || !state) {
      triggerNotification({
        content: 'Por favor, preencha todos os campos do endereço.',
      });
      return;
    }
    const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const address = `${number} ${street}, ${city}, ${state}`;
    const apiKey = VITE_GOOGLE_MAPS_API_KEY; // Substitua pela sua chave da API do Google Maps
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setInitialLocation({ lat, lng });
        setMapOpen(true);
      } else {
        triggerNotification({ content: 'Endereço não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar a localização:', error);
      triggerNotification({ content: 'Erro ao buscar a localização.' });
    }
  };

  const submitChild = async (values: AllStrings<HomeAddressDto>) => {
    try {
      const latitude = parseFloat(form.getFieldValue('latitude'));
      const longitude = parseFloat(form.getFieldValue('longitude'));
      await addHomeAddress({
        number: Number(values.number),
        zipCode: values.zipCode.replace(/\D/g, ''),
        street: values.street,
        city: values.city,
        state: values.state,
        latitude: isNaN(latitude) ? 0 : latitude,
        longitude: isNaN(longitude) ? 0 : longitude,
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
          onClick={geocodeAddress}
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
          initialLocation={initialLocation}
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
