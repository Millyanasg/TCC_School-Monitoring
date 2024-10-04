import { HomeAddressViewDto } from '@backend/parent/dto/HomeAddressViewDto';
import { Layout } from '@frontend/components/Layout/Layout';
import { Button } from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Card } from 'antd-mobile';
import { useShallow } from 'zustand/shallow';

function AddressCard({ address }: { address: HomeAddressViewDto }) {
  const {
    street,
    number,
    city,
    state,
    zipCode,
    //latitude,
    //longitude
  } = address;

  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${street} ${number}`}
      extra={
        <>
          <Button
            onClick={() => undefined}
            color='danger'
            variant='solid'
            size='small'
            icon={<DeleteOutlined />}
          >
            Excluir
          </Button>
          <Button
            onClick={() => undefined}
            color='primary'
            variant='solid'
            size='small'
            icon={<EditOutlined />}
          >
            Editar
          </Button>
        </>
      }
    >
      <div>
        <p>Cidade: {city}</p>
        <p>Estado: {state}</p>
        <p>CEP: {zipCode}</p>
        <Button
          onClick={() => undefined}
          color='primary'
          variant='solid'
          size='small'
        >
          Ver no Mapa
        </Button>
      </div>
    </Card>
  );
}
function AddAddressModal() {}
function EditAddressModal() {}

export function Addresses() {
  const [addresses, setIsAdding] = useHomeAddressStore(
    useShallow((state) => [state.homeAddresses, state.setIsAdding]),
  );

  return (
    <Layout>
      {addresses.map((addressItem, index) => (
        <AddressCard key={index} address={addressItem} />
      ))}
      <AddAddressModal />
      <EditAddressModal />
      <Button
        onClick={() => setIsAdding(true)}
        color='primary'
        variant='solid'
        size='large'
        block
      >
        Adicionar Endereço
      </Button>
    </Layout>
  );
}
