import { DriverViewDto } from '@backend/driver/dto/DriverViewDto';
import { UserDto } from '@backend/user/dto/userDTO';
import { Descriptions } from 'antd';

export const DriverCarInfo = ({
  driver,
  user,
}: {
  driver: DriverViewDto;
  user: UserDto;
}) => {
  const { name, lastName } = user;
  const { plate, car, model, year, color, seats } = driver;
  return (
    <Descriptions title='Informações do Motorista' column={1}>
      <Descriptions.Item label='Nome'>
        {name} {lastName}
      </Descriptions.Item>
      <Descriptions.Item label='Placa'>{plate}</Descriptions.Item>
      <Descriptions.Item label='Carro'>{car}</Descriptions.Item>
      <Descriptions.Item label='Modelo'>{model}</Descriptions.Item>
      <Descriptions.Item label='Ano'>{year}</Descriptions.Item>
      <Descriptions.Item label='Cor'>{color}</Descriptions.Item>
      <Descriptions.Item label='Assentos'>{seats}</Descriptions.Item>
    </Descriptions>
  );
};
