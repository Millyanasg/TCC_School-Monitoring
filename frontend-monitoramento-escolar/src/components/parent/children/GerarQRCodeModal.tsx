import {
  CloseCircleFilled,
  PrinterOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { ChildViewDto } from '@backend/parent/dto/ChildViewDto';
import { QRCodeDrawer } from '@frontend/components/common/QRcode/QRCodeDrawer';
import { Button, Drawer, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

export const GerarQRCodeModal = ({
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
    <Drawer open={isOpen} onClose={onClose} width={'100vw'}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '1rem',
          width: '100%',
        }}
      >
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
              width: '750px',
              height: '750px',
            }}
            qrCodePayload={String(child.id)}
          />
        </Flex>
      </div>
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
    </Drawer>
  );
};
