import { Form, Input } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { DriverDto } from '@backend/driver/dto/DriverDto';
import { useNotification } from '@frontend/stores/common/useNotification';
import { Button } from 'antd';

export function VehicleDetailsForm({
  form,
}: {
  form: ReturnType<typeof Form.useForm<DriverDto>>[0];
}) {
  const { triggerNotification } = useNotification();
  const [setType, nextStep, prevStep] = useRegisterStep(
    useShallow((state) => [state.setType, state.nextStep, state.prevStep]),
  );
  return (
    <Form
      form={form}
      footer={
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setType('unset');
                prevStep();
              }}
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
              onClick={async () => {
                // verify if the form is valid
                const isValid = await form.validateFields();
                if (!isValid) {
                  triggerNotification({
                    content: 'Por favor, preencha todos os campos',
                  });
                  return;
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
        <Input placeholder='Ex: Volkswagen, Fiat, Chevrolet, etc' type='text' />
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
    </Form>
  );
}
