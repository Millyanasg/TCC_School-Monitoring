import { ChildDto } from '@backend/parent/dto/ChildDto';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button, DatePicker, Typography } from 'antd';
import { Form, Input } from 'antd-mobile';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/shallow';
import { ChildFormControls } from './ChildFormControls';
import { usePositionStore } from '@frontend/stores/common/position.store';
import { GlobalOutlined } from '@ant-design/icons';
import { useState } from 'react';
import MapSelector from '@frontend/components/common/MapSelector';
import { useNotification } from '@frontend/stores/common/useNotification';

export const AddChildForm = () => {
  const { triggerNotification } = useNotification();
  const [isMapOpen, setMapOpen] = useState(false);
  const addChildren = useParentForm(useShallow((state) => state.addChildren));
  const [form] = Form.useForm<AllStrings<ChildDto>>();
  const { location } = usePositionStore();
  function onSelectLocation(lat: number, lon: number) {
    console.log(lat, lon);
    form.setFieldsValue({
      latitude: lat.toString(),
      longitude: lon.toString(),
    });
  }
  return (
    <>
      <MapSelector
        onClose={() => setMapOpen(false)}
        onSelectLocation={onSelectLocation}
        isOpen={isMapOpen}
        initialLocation={location}
      />
      <Form
        form={form}
        onFinish={(values: AllStrings<ChildDto>) => {
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
          addChildren({
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
          form.resetFields();
          form.setFieldsValue({
            birthDate: '',
            latitude: '',
            longitude: '',
          });
        }}
        footer={<ChildFormControls />}
      >
        <Form.Item
          name='name'
          label='Nome'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o primeiro nome',
            },
          ]}
        >
          <Input placeholder='Primeiro Nome' />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Sobrenome'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o sobrenome',
            },
          ]}
        >
          <Input placeholder='Sobrenome' />
        </Form.Item>
        <Form.Item required label='Data de Nascimento'>
          <DatePicker
            maxDate={dayjs()}
            onChange={(date) => {
              console.log(date);
              const parsedBirthDate = dayjs(date).toDate();
              form.setFieldsValue({
                birthDate: parsedBirthDate.toString(),
              });
            }}
            format={'DD/MM/YYYY'}
          />
        </Form.Item>
        <Form.Item
          name='grade'
          label='Série'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a série',
            },
          ]}
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
      </Form>
    </>
  );
};
