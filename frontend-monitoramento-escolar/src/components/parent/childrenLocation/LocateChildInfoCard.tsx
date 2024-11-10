import { HeatMapOutlined } from '@ant-design/icons';
import { ChildViewWithLocationDto } from '@backend/parent/dto/ChildViewWithLocationDto';
import { Button, Flex } from 'antd';
import { Card } from 'antd-mobile';
import { UpOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LocateChildCardModal } from './LocateChildCardModal';
import { SentChildCardModal } from './SentChildCardModal';

export default function LocateChildInfoCard({
  child,
}: {
  child: ChildViewWithLocationDto;
}) {
  const [isModalLocateOpen, setIsModalLocateOpen] = useState(false);
  const [isModalSendOpen, setIsModalSendOpen] = useState(false);
  const handleLocateClick = () => {
    setIsModalLocateOpen(true);
  };

  const handleSendClick = () => {
    setIsModalSendOpen(true);
  };
  const renderLocateButton = () => (
    <Button
      onClick={handleLocateClick}
      color='danger'
      variant='solid'
      size='middle'
      icon={<HeatMapOutlined />}
    >
      Localisar Motorista com Criança
    </Button>
  );

  const renderSendButton = () => (
    <Button
      onClick={handleSendClick}
      color='danger'
      variant='solid'
      size='middle'
      icon={<UpOutline />}
    >
      Enviar Criança
    </Button>
  );
  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={null}
    >
      <LocateChildCardModal
        isOpen={isModalLocateOpen}
        child={child}
        onClose={() => setIsModalLocateOpen(false)}
      />
      <SentChildCardModal
        isOpen={isModalSendOpen}
        child={child}
        onClose={() => setIsModalSendOpen(false)}
      />
      <Flex gap='1rem'>
        <p>Data de nascimento: {dayjs(child.birthDate).format('DD/MM/YYYY')}</p>
        <p>Ano escolar: {child.grade}</p>
      </Flex>
      <Flex gap='1rem'>
        {child.location &&
          child.location.type === 'dropoff' &&
          renderLocateButton()}
        {child.location &&
          child.location.type !== 'dropoff' &&
          renderSendButton()}
        {!child.location && renderSendButton()}
      </Flex>
    </Card>
  );
}
