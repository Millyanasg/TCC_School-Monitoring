import {
  DeleteOutlined,
  EditOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, Flex } from 'antd';
import { Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { QrCodeModal } from './QrCodeModal';

export function ChildCard({ child }: { child: ChildViewDto }) {
  const [deleteSelectedChild, setSelectedChild, setOpenModal] =
    useChildrenStore(
      useShallow((state) => [
        state.removeChild,
        state.setSelectedChild,
        state.setIsEditing,
      ]),
    );

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);

  const removeChild = () => {
    setSelectedChild(child);
    deleteSelectedChild(child);
  };
  const editChild = () => {
    setOpenModal(true);
    setSelectedChild(child);
  };

  const genQRCode = () => {
    setIsQrCodeModalOpen(true);
  };

  return (
    <Card
      style={{ marginBottom: '16px' }}
      title={`${child.name} ${child.lastName}`}
      extra={null}
    >
      <QrCodeModal
        isOpen={isQrCodeModalOpen}
        setIsOpen={setIsQrCodeModalOpen}
        child={child}
      />
      <Flex gap='1rem'>
        <p>Data de nascimento: {dayjs(child.birthDate).format('DD/MM/YYYY')}</p>
        <p>Ano escolar: {child.grade}</p>
      </Flex>
      <Flex gap='1rem'>
        <Button
          onClick={removeChild}
          color='danger'
          variant='solid'
          size='small'
          icon={<DeleteOutlined />}
        >
          Excluir
        </Button>
        <Button
          onClick={editChild}
          color='primary'
          variant='solid'
          size='small'
          icon={<EditOutlined />}
        >
          Editar
        </Button>
        <Button
          onClick={genQRCode}
          color='primary'
          variant='solid'
          size='small'
          icon={<QrcodeOutlined />}
        >
          Ver QRCode
        </Button>
      </Flex>
    </Card>
  );
}
