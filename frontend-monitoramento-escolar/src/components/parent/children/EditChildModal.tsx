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

  function handleCancelEdit() {
    setIsEditing(false);
    setSelectedChild(null);
  }
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
      await updateChild({
        id: Number(values.id),
        name: values.name.trim(),
        lastName: values.lastName.trim(),
        birthDate: dayjs(values.birthDate).toDate(),
        grade: values.grade,
        street: values.street,
        number: Number(values.number),
        city: values.city,
        state: values.state,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
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
  const onSelectLocation = (lat: number, lon: number) => {
    console.log(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
  };

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
        initialLocation={
          selectedChild
            ? {
                lat: selectedChild.latitude,
                lng: selectedChild.longitude,
              }
            : undefined
        }
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
        <Form.Item
          initialValue={selectedChild?.id || ''}
          label='Id'
          hidden
          name='id'
        ></Form.Item>
        <Form.Item
          label='Nome'
          name='name'
          rules={[
            { required: true, message: 'Por favor, insira o primeiro nome' },
          ]}
        >
          <Input
            defaultValue={selectedChild?.name || ''}
            placeholder='Primeiro Nome'
          />
        </Form.Item>
        <Form.Item
          label='Sobrenome'
          name='lastName'
          rules={[{ required: true, message: 'Por favor, insira o sobrenome' }]}
        >
          <Input
            defaultValue={selectedChild?.lastName || ''}
            placeholder='Sobrenome'
            value='Sobrenome'
          />
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
              console.log(date);
              form.setFieldsValue({
                birthDate: date.toString(),
              });
            }}
            format={'DD/MM/YYYY'}
            key={selectedChild?.id || 'new'}
            defaultValue={
              selectedChild?.birthDate
                ? dayjs(selectedChild?.birthDate)
                : dayjs(new Date())
            }
          />
        </Form.Item>
        <Form.Item
          label='Ano escolar'
          name='grade'
          rules={[{ required: true, message: 'Por favor, insira a série' }]}
        >
          <Input
            defaultValue={selectedChild?.grade || ''}
            placeholder='Série'
          />
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
