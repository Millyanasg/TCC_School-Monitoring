import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { QRCodeDrawer } from '@frontend/components/common/QRcode/QRCodeDrawer';
import { useChildrenStore } from '@frontend/stores/parent/children.store';
import { Button, Flex, Modal, Typography } from 'antd';
import { Card } from 'antd-mobile';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useShallow } from 'zustand/shallow';

const QrCodeModal = ({
  isOpen,
  setIsOpen,
  child,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  child: ChildViewDto;
}) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const onPrint = () => {
    window.print();
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      footer={null}
      height={'80vh'}
      width={'80vw'}
    >
      <div>
        <Typography.Title level={4}>
          QRCode de {child.name} {child.lastName} <QrcodeOutlined />
        </Typography.Title>
        <Flex gap='2px' vertical align='start'>
          <Typography.Text>
            Data de nascimento: {dayjs(child.birthDate).format('DD/MM/YYYY')}
          </Typography.Text>
          <Typography.Text>Ano escolar: {child.grade}</Typography.Text>
        </Flex>
        <Flex vertical align='center'>
          <Typography.Text strong>
            Escaneie o QRCode abaixo para liberar ou receber {child.name}{' '}
            {child.lastName}
          </Typography.Text>
          <QRCodeDrawer
            style={{
              width: '400px',
              height: '400px',
            }}
            qrCodePayload={String(child.id)}
          />
        </Flex>
        <Flex gap='1rem'>
          <Button
            type='primary'
            color='primary'
            icon={<PrinterOutlined />}
            onClick={onPrint}
          >
            Impimir ou compartilhar código
          </Button>
          <Button
            type='primary'
            color='danger'
            icon={<CloseCircleFilled />}
            onClick={onClose}
          >
            Fechar
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

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
