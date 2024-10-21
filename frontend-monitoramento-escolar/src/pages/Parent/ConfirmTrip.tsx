import { Layout } from '@frontend/components/Layout/Layout';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenLocation } from '@frontend/stores/parent/childrenLocation.store';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import LocateChildInfoCard from '../../components/parent/childrenLocation/LocateChildInfoCard';
import { usePositionStore } from '@frontend/stores/common/position.store';

export const ConfirmTrip = () => {
  const { initializePosition } = usePositionStore();
  const children = useChildrenLocation(useShallow((state) => state.children));
  const loadChildren = useChildrenLocation(
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

  useEffect(() => {
    initializePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {children.map((child, index) => (
        <LocateChildInfoCard key={index} child={child} />
      ))}
    </Layout>
  );
};
