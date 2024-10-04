import { DeleteOutlined } from '@ant-design/icons';
import { HomeAddressDto } from '@backend/parent/dto/HomeAddressDto';
import { useParentForm } from '@frontend/stores/user/useParentForm';
import { Button } from 'antd';
import { Card } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

export function AddedHomeAddressCard({
  homeAddress,
  index,
  allowRemove = true,
}: {
  homeAddress: HomeAddressDto;
  index: number;
  allowRemove?: boolean;
}) {
  const { street, number, city, state, zipCode } = homeAddress;
  const [removeHomeAddress] = useParentForm(
    useShallow((state) => [state.removeHomeAddress]),
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${street} ${number}`}
      extra={
        <>
          {allowRemove && (
            <Button
              onClick={() => removeHomeAddress(index)}
              color='danger'
              variant='solid'
              size='small'
              icon={<DeleteOutlined />}
            >
              Excluir
            </Button>
          )}
        </>
      }
    >
      <div>
        <p>Cidade: {city}</p>
        <p>Estado: {state}</p>
        <p>CEP: {zipCode}</p>
        <p>Latitude: {homeAddress.latitude}</p>
        <p>Longitude: {homeAddress.longitude}</p>
      </div>
    </Card>
  );
}
