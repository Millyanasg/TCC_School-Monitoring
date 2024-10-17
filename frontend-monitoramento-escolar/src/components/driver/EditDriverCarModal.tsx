import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DriverDto } from '@backend/driver/dto/DriverDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useDriverCar } from '@frontend/stores/driver/driverCar.store';
import { Button, Flex, Modal } from 'antd';
import { Form, Input } from 'antd-mobile';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const EditDriverCarModal = () => {
  const [isEditing, setIsEditing, updateDriver, driver] = useDriverCar(
    useShallow((state) => [
      state.isEditing,
      state.setIsEditing,
      state.updateDriver,
      state.driver,
    ]),
  );
  const { triggerNotification } = useNotification();
  const [form] = Form.useForm<AllStrings<DriverDto>>();
  const onFinish = async (data: AllStrings<DriverDto>) => {
    try {
      await updateDriver({
        ...data,
        year: Number(data.year),
        seats: Number(data.seats),
      });
      setIsEditing(false);
      triggerNotification({
        content: 'Carro editado com sucesso',
      });
    } catch {
      triggerNotification({
        content: 'Erro ao editar o carro',
      });
    }
  };

  useEffect(() => {
    if (driver) {
      form.setFieldsValue({
        plate: driver.plate,
        car: driver.car,
        model: driver.model,
        year: driver.year.toString(),
        color: driver.color,
        seats: driver.seats.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <Modal
      title='Editar dados do carro'
      open={isEditing}
      onClose={() => setIsEditing(false)}
      footer={null}
    >
      <Form form={form} footer={null} onFinish={onFinish}>
        <Form.Item
          name='plate'
          label='Placa'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a placa do veículo',
            },
            {
              // Brazilian plate pattern (AAA0000) or (AAA0A00)
              pattern: /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/,
              message: 'Placa inválida',
            },
          ]}
        >
          <Input placeholder='MMM1234' type='text' />
        </Form.Item>
        <Form.Item
          name='car'
          label='Carro'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o modelo do veículo',
            },
          ]}
        >
          <Input
            placeholder='Ex: Volkswagen, Fiat, Chevrolet, etc'
            type='text'
          />
        </Form.Item>
        <Form.Item
          name='model'
          label='Modelo'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o modelo do veículo',
            },
          ]}
        >
          <Input placeholder='Ex: Gol, Uno, Palio, etc' type='text' />
        </Form.Item>
        <Form.Item
          name='year'
          label='Ano'
          rules={[
            {
              required: true,
              message: 'Por favor, insira o ano do veículo',
            },
          ]}
        >
          <Input
            type='number'
            placeholder={`Ex: 1990 - ${new Date().getFullYear()}`}
            min={1990}
            max={new Date().getFullYear()}
          />
        </Form.Item>
        <Form.Item
          name='color'
          label='Cor'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a cor do veículo',
            },
          ]}
        >
          <Input placeholder='Ex: Branco, Preto, Prata, etc' type='text' />
        </Form.Item>
        <Form.Item
          name='seats'
          label='Assentos'
          rules={[
            {
              required: true,
              message: 'Por favor, insira a quantidade de assentos',
            },
            {
              min: 1,
              message: 'A quantidade mínima de assentos é 1',
            },
            {
              max: 9,
              message: 'A quantidade máxima de assentos é 9',
            },
          ]}
        >
          <Input type='number' placeholder='Ex: 5' min={1} max={9} />
        </Form.Item>
        <Form.Item>
          <Flex
            justify='end'
            style={{
              marginTop: '16px',
              marginBottom: '16px',
              marginRight: '16px',
            }}
            slot='footer'
          >
            <Button
              color='danger'
              variant='solid'
              icon={<DeleteOutlined />}
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
            <Button
              htmlType='submit'
              icon={<EditOutlined />}
              color='primary'
              variant='solid'
            >
              Salvar
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};
