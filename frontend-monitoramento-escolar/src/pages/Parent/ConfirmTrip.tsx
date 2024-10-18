import { CloseCircleOutlined, HeatMapOutlined } from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { Layout } from '@frontend/components/Layout/Layout';
import { useNotification } from '@frontend/stores/common/useNotification';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, Drawer, Flex, Typography } from 'antd';
import { Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const LocateChildCardModal = ({
  isOpen,
  onClose,
  child,
}: {
  isOpen: boolean;
  onClose: () => void;
  child: ChildViewDto;
}) => {
  return (
    <Drawer
      open={isOpen}
      footer={
        <Button
          icon={<CloseCircleOutlined />}
          onClick={onClose}
          type='primary'
          color='danger'
        >
          Fechar
        </Button>
      }
      onClose={onClose}
      width={'100vw'}
    >
      <Typography.Title level={2}>
        Localização para {child.name} {child.lastName}
      </Typography.Title>
    </Drawer>
  );
};

export default function LocateChildCard({ child }: { child: ChildViewDto }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={null}
    >
      <LocateChildCardModal
        isOpen={isModalOpen}
        child={child}
        onClose={() => setIsModalOpen(false)}
      />
      <Flex gap='1rem'>
        <p>Data de nascimento: {dayjs(child.birthDate).format('DD/MM/YYYY')}</p>
        <p>Ano escolar: {child.grade}</p>
      </Flex>
      <Flex gap='1rem'>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          color='danger'
          variant='solid'
          size='middle'
          icon={<HeatMapOutlined />}
        >
          Localisar Motorista e Criança
        </Button>
      </Flex>
    </Card>
  );
}

export const ConfirmTrip = () => {
  const children = useChildrenStore(useShallow((state) => state.children));
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
        <LocateChildCard key={index} child={child} />
      ))}
    </Layout>
  );
};
