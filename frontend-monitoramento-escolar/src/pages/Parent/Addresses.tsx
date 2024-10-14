import { Layout } from '@frontend/components/Layout/Layout';
import { useHomeAddressStore } from '@frontend/stores/parent/homeAddresses.store';
import { Button } from 'antd';
import { useShallow } from 'zustand/shallow';
import { AddressCard } from '../../components/parent/homeAddress/AddressCard';
import { AddAddressModal } from '../../components/parent/homeAddress/AddAddressModal';
import { EditAddressModal } from '../../components/parent/homeAddress/EditAddressModal';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useEffect } from 'react';

export function Addresses() {
  const [addresses, setIsAdding] = useHomeAddressStore(
    useShallow((state) => [state.homeAddresses, state.setIsAdding]),
  );
  const tNotification = useNotification((state) => state.triggerNotification);

  const loadChildren = useHomeAddressStore(
    useShallow((state) => state.loadChildren),
  );

  useEffect(() => {
    loadChildren()
      .then(() => {
        tNotification({
          content: 'Endereços carregados com sucesso',
        });
      })
      .catch(() => {
        tNotification({
          content: 'Erro ao carregar os endereços',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
