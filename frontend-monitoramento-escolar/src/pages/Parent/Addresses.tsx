import { Layout } from '@frontend/components/Layout/Layout';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button } from 'antd';
import { useShallow } from 'zustand/shallow';
import { AddressCard } from '../../components/parent/homeAddress/AddressCard';
import { AddAddressModal } from '../../components/parent/homeAddress/AddAddressModal';
import { EditAddressModal } from '../../components/parent/homeAddress/EditAddressModal';

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
