import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { ChildDto } from '@backend/parent/dto/ChildDto';
import MapSelector from '@frontend/components/common/MapSelector';
import { usePositionStore } from '@frontend/stores/common/position.store';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, DatePicker, Flex, Modal, Typography } from 'antd';
import { Form, Input } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

export function AddChildModal() {
  const [isAdding, setIsAdding, addChild] = useChildrenStore(
    useShallow((state) => [state.isAdding, state.setIsAdding, state.addChild]),
  );
  const { location } = usePositionStore();
  const [isMapOpen, setMapOpen] = useState(false);
  const [form] = Form.useForm<AllStrings<ChildDto>>();
  const { triggerNotification } = useNotification();

  function handleCancelAdd() {
    setIsAdding(false);
  }
  async function submitChild(values: AllStrings<ChildDto>) {
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
      await addChild({
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
        content: 'Criança adicionada com sucesso',
      });
      setIsAdding(false);
    } catch {
      triggerNotification({
        content: 'Erro ao adicionar a criança',
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
      onCancel={handleCancelAdd}
      title='Adicionar criança'
      open={isAdding}
      footer={null}
    >
      <MapSelector
        onClose={() => setMapOpen(false)}
        onSelectLocation={onSelectLocation}
        isOpen={isMapOpen}
        initialLocation={
          location
            ? { lat: location.coords.latitude, lng: location.coords.longitude }
            : undefined
        }
      />
      <Form onFinish={submitChild} form={form}>
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
          <Input placeholder='Sobrenome' />
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
          <DatePicker format={'DD/MM/YYYY'} />
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
            onClick={handleCancelAdd}
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
