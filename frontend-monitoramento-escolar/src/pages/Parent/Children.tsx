import { Layout } from '@frontend/components/Layout/Layout';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button } from 'antd';

import { useShallow } from 'zustand/shallow';
import { ChildCard } from '../../components/parent/children/ChildCard';
import { EditChildModal } from '../../components/parent/children/EditChildModal';
import { AddChildModal } from '../../components/parent/children/AddChildModal';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useEffect } from 'react';

export function Children() {
  const [children, setIsAdding] = useChildrenStore(
    useShallow((state) => [state.children, state.setIsAdding]),
  );
  const loadChildren = useChildrenStore(
    useShallow((state) => state.loadChildren),
  );
  const tNotification = useNotification((state) => state.triggerNotification);
  useEffect(() => {
    loadChildren()
      .then(() => {
        tNotification({
          content: 'Crianças carregadas com sucesso',
        });
      })
      .catch(() => {
        tNotification({
          content: 'Erro ao carregar as crianças',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {children.map((child, index) => (
        <ChildCard key={index} child={child} />
      ))}
      <AddChildModal />
      <EditChildModal />
      <Button
        onClick={() => setIsAdding(true)}
        color='primary'
        variant='solid'
        size='large'
        block
      >
        Adicionar Criança
      </Button>
    </Layout>
  );
}
