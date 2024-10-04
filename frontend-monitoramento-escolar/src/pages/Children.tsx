import { Layout } from '@frontend/components/Layout/Layout';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button } from 'antd';

import { useShallow } from 'zustand/shallow';
import { ChildCard } from '../components/parent/children/ChildCard';
import { EditChildModal } from '../components/parent/children/EditChildModal';
import { AddChildModal } from '../components/parent/children/AddChildModal';

export function Children() {
  const [children, setIsAdding] = useChildrenStore(
    useShallow((state) => [state.children, state.setIsAdding]),
  );

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
        Adicionar
      </Button>
    </Layout>
  );
}
