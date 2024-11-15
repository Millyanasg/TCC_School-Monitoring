import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import MapSelector from '@frontend/components/common/Map/MapSelector';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, DatePicker, Flex, Modal, Typography } from 'antd';
import { Form, Input } from 'antd-mobile';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export function EditChildModal() {
  const [
    selectedChild,
    isEditing,
    setIsEditing,
    setSelectedChild,
    updateChild,
  ] = useChildrenStore(
    useShallow((state) => [
      state.selectedChild,
      state.isEditing,
      state.setIsEditing,
      state.setSelectedChild,
      state.updateChild,
    ]),
  );
  const [isMapOpen, setMapOpen] = useState(false);
  const [form] = Form.useForm<AllStrings<ChildViewDto>>();
  const { triggerNotification } = useNotification();
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lng: number } | undefined
  >();

  function handleCancelEdit() {
    setIsEditing(false);
    setSelectedChild(null);
  }

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
    const apiKey = VITE_GOOGLE_MAPS_API_KEY;
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
  const onSelectLocation = (lat: number, lon: number) => {
    console.debug(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
    form.validateFields(['latitude', 'longitude']);
  };

  async function submitChildUpdate(values: AllStrings<ChildViewDto>) {
    try {
      if (
        !values.latitude ||
        !values.longitude ||
        !values.latitude.trim() ||
        !values.longitude.trim()
      ) {
        triggerNotification({
          content: 'Por favor, selecione a localização',
        });
        return;
      }
      const latitude = parseFloat(form.getFieldValue('latitude'));
      const longitude = parseFloat(form.getFieldValue('longitude'));
      const birthDate = values.birthDate
        ? dayjs(values.birthDate).toDate()
        : null;
      await updateChild({
        id: Number(values.id),
        name: values.name.trim(),
        lastName: values.lastName.trim(),
        birthDate: birthDate || new Date(),
        grade: values.grade,
        street: values.street,
        number: Number(values.number),
        city: values.city,
        state: values.state,
        latitude: isNaN(latitude) ? 0 : latitude,
        longitude: isNaN(longitude) ? 0 : longitude,
      });
      triggerNotification({
        content: 'Criança atualizada com sucesso',
      });
      setIsEditing(false);
      setSelectedChild(null);
    } catch {
      triggerNotification({
        content: 'Erro ao atualizar a criança',
      });
    }
  }

  return (
    <Modal
      onCancel={handleCancelEdit}
      title='Editar criança'
      open={isEditing}
      footer={null}
    >
      <MapSelector
        onClose={() => setMapOpen(false)}
        onSelectLocation={onSelectLocation}
        isOpen={isMapOpen}
        initialLocation={initialLocation}
      />
      <Form
        onFinish={submitChildUpdate}
        key={selectedChild?.id || 'new'}
        form={form}
        initialValues={{
          id: selectedChild?.id || '',
          name: selectedChild?.name || '',
          lastName: selectedChild?.lastName || '',
          birthDate: selectedChild?.birthDate
            ? dayjs(selectedChild?.birthDate)
            : undefined,
          grade: selectedChild?.grade || '',
          street: selectedChild?.street || '',
          number: selectedChild?.number || '',
          city: selectedChild?.city || '',
          state: selectedChild?.state || '',
          latitude: selectedChild?.latitude || '',
          longitude: selectedChild?.longitude || '',
        }}
      >
        <Form.Item label='Id' hidden></Form.Item>
        <Form.Item
          label='Nome'
          name='name'
          rules={[
            { required: true, message: 'Por favor, insira o primeiro nome' },
          ]}
        >
          <Input placeholder='Primeiro Nome' />
        </Form.Item>
        <Form.Item
          label='Sobrenome'
          name='lastName'
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input placeholder='Sobrenome' value='Sobrenome' />
        </Form.Item>
        <Form.Item
          label='Data de nascimento'
          name='birthDate'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a data de nascimento',
            },
            { type: 'date', message: 'Insira uma data válida' },
          ]}
        >
          <DatePicker
            onChange={(date) => {
              form.setFieldsValue({
                birthDate: date ? dayjs(date).format('YYYY-MM-DD') : undefined,
              });
            }}
            format={'DD/MM/YYYY'}
          />
        </Form.Item>
        <Form.Item
          label='Ano escolar'
          name='grade'
          rules={[{ required: true, message: 'Por favor, insira a série' }]}
        >
          <Input placeholder='Série' />
        </Form.Item>
        <Typography.Title level={5}>Endereço Escola</Typography.Title>
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
        <Form.Item name='latitude' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='longitude' hidden>
          <Input />
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
        <Flex justify='end' style={{ marginTop: '16px', marginBottom: '16px' }}>
          <Button
            icon={<DeleteOutlined />}
            onClick={handleCancelEdit}
            color='danger'
            variant='solid'
          >
            Cancelar
          </Button>
          <Button
            icon={<EditOutlined />}
            color='primary'
            variant='solid'
            htmlType='submit'
          >
            Salvar
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}
