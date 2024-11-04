import { GlobalOutlined } from '@ant-design/icons';
import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import MapSelector from '@frontend/components/common/Map/MapSelector';
import { usePositionStore } from '@frontend/stores/common/position.store';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
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
  const { location } = usePositionStore();
  const [isMapOpen, setMapOpen] = useState(false);
  function onSelectLocation(lat: number, lon: number) {
    console.log(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setSelectedHomeAddress(null);
  }

  useEffect(() => {
    if (selectedHomeAddress) {
      form.setFieldsValue({
        id: selectedHomeAddress.id.toString(),
        street: selectedHomeAddress.street,
        number: selectedHomeAddress.number.toString(),
        city: selectedHomeAddress.city,
        state: selectedHomeAddress.state,
        zipCode: selectedHomeAddress.zipCode,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHomeAddress]);

  async function submitChildUpdate(values: AllStrings<HomeAddressViewDto>) {
    try {
      await updateHomeAddress({
        id: Number(values.id),
        // remove all non-numeric characters from zipCode
        zipCode: values.zipCode.replace(/\D/g, ''),
        number: Number(values.number),
        street: values.street,
        city: values.city,
        state: values.state,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
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
          <InputMask mask='99999-999'>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {() => <Input type='text' placeholder='00000-000' />}
          </InputMask>
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
          initialLocation={location}
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
