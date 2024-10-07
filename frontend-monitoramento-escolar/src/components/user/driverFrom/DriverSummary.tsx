import { Card, Form } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';
import { useRegisterStep } from '@frontend/stores/user/useRegisterStep';
import { DriverDto } from '@backend/driver/dto/DriverDto';
import { Button } from 'antd';
import { useUserStore } from '@frontend/stores/user/user.store';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import { useNotification } from '@frontend/stores/common/useNotification';
import { RegisterDiver } from '@frontend/services/driver/driver.service';

export function DriverSummary({
  form,
}: {
  form: ReturnType<typeof Form.useForm<DriverDto>>[0];
}) {
  const navigate = useNavigate();
  const { triggerNotification } = useNotification();
  const updateUserData = useUserStore(
    useShallow((state) => state.updateUserData),
  );
  const values = form.getFieldsValue();
  const { plate, car, model, year, color, seats } = values;
  const [prevStep] = useRegisterStep(useShallow((state) => [state.prevStep]));
  async function onSubmit() {
    try {
      await RegisterDiver({
        ...values,
        seats: Number(values.seats),
        year: Number(values.year),
      });
      await updateUserData();
      navigate('/');
      triggerNotification({
        content: 'Motorista cadastrado com sucesso',
      });
    } catch (e) {
      const error = e as AxiosError;
      if (error.isAxiosError) {
        switch (error.response?.status) {
          case 400:
            triggerNotification({
              content: 'Erro de validação',
            });
            break;
          case 409:
            triggerNotification({
              content: 'Usuário já cadastrado como motorista',
            });
            break;
          default:
            triggerNotification({
              content: 'Erro ao cadastrar motorista',
            });
            break;
        }
      }
    }
  }

  const spanStyle: React.CSSProperties = {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  };
  return (
    <>
      <Card title={`Resumo do motorista`}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontSize: '1.2rem',
          }}
        >
          <p>
            Placa: <span style={spanStyle}>{plate}</span>
          </p>
          <p>
            Carro: <span style={spanStyle}>{car}</span>
          </p>
          <p>
            Modelo: <span style={spanStyle}>{model}</span>
          </p>
          <p>
            Ano: <span style={spanStyle}>{year}</span>
          </p>
          <p>
            Cor: <span style={spanStyle}>{color}</span>
          </p>
          <p>
            Assentos: <span style={spanStyle}>{seats}</span>
          </p>
        </div>
      </Card>
      <Button
        onClick={onSubmit}
        color='primary'
        style={{ marginTop: '2rem' }}
        size='middle'
        variant='filled'
        block
      >
        Finalizar cadastro
      </Button>
      <Button
        onClick={() => {
          prevStep();
        }}
        color='danger'
        style={{ marginTop: '1rem' }}
        size='middle'
        variant='filled'
        block
      >
        Voltar
      </Button>
    </>
  );
}
