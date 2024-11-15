import { GlobalOutlined } from '@ant-design/icons';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import MapSelector from '@frontend/components/common/Map/MapSelector';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useShallow } from 'zustand/shallow';

export function EditAddressModal() {
  const [
    selectedHomeAddress,
    isEditing,
    setIsEditing,
    setSelectedHomeAddress,
    updateHomeAddress,
  ] = useHomeAddressStore(
    useShallow((state) => [
      state.selectedHomeAddress,
      state.isEditing,
      state.setIsEditing,
      state.setSelectedHomeAddress,
      state.updateHomeAddress,
    ]),
  );

  const [form] = Form.useForm<AllStrings<HomeAddressViewDto>>();
  const { triggerNotification } = useNotification();
  const [isMapOpen, setMapOpen] = useState(false);
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  function onSelectLocation(lat: number, lon: number) {
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
    form.validateFields(['latitude', 'longitude']);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setSelectedHomeAddress(null);
  }

  useEffect(() => {
    if (selectedHomeAddress) {
      form.setFieldsValue({
        id: selectedHomeAddress.id.toString(),
        street: selectedHomeAddress.street || '',
        number: selectedHomeAddress.number.toString() || '',
        city: selectedHomeAddress.city || '',
        state: selectedHomeAddress.state || '',
        zipCode: selectedHomeAddress.zipCode || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHomeAddress]);

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
  async function submitChildUpdate(values: AllStrings<HomeAddressViewDto>) {
    try {
      const latitude = parseFloat(form.getFieldValue('latitude'));
      const longitude = parseFloat(form.getFieldValue('longitude'));
      await updateHomeAddress({
        id: Number(values.id),
        zipCode: values.zipCode.replace(/\D/g, ''),
        number: Number(values.number),
        street: values.street,
        city: values.city,
        state: values.state,
        latitude: isNaN(latitude) ? 0 : latitude,
        longitude: isNaN(longitude) ? 0 : longitude,
      });
      triggerNotification({
        content: 'Criança atualizada com sucesso',
      });
      setIsEditing(false);
      setSelectedHomeAddress(null);
    } catch {
      triggerNotification({
        content: 'Erro ao atualizar a criança',
      });
    }
  }
  return (
    <Modal
      onCancel={handleCancelEdit}
      title='Editar endereço'
      open={isEditing}
      footer={null}
    >
      <Form
        onFinish={submitChildUpdate}
        key={selectedHomeAddress?.id || 'new'}
        form={form}
      >
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
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
          <Input />
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
          <InputMask
            mask='99999-999'
            value={form.getFieldValue('zipCode') || ''}
            onChange={(e) => form.setFieldValue('zipCode', e.target.value)}
          >
            <Input type='text' placeholder='00000-000' />
          </InputMask>
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
        <Form.Item name='latitude' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='longitude' hidden>
          <Input />
        </Form.Item>
        <MapSelector
          onClose={() => setMapOpen(false)}
          onSelectLocation={onSelectLocation}
          isOpen={isMapOpen}
          initialLocation={initialLocation}
        />
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
