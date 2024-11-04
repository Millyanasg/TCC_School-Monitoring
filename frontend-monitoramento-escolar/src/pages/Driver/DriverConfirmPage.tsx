import { Layout } from '@frontend/components/Layout/Layout';
import { QRcodeReader } from '@frontend/components/common/QRcode/QRcodeReader';
import { Button, Drawer, Typography } from 'antd';
import { ScanCodeOutline } from 'antd-mobile-icons';
import { useState } from 'react';

const DriverConfirmQRCode = ({
  isDrawerVisible,
  setResult,
  setIsDrawerVisible,
}: {
  isDrawerVisible: boolean;
  setIsDrawerVisible: (isVisible: boolean) => void;
  setResult: (result: string) => void;
}) => {
  return (
    <Drawer
      onClose={() => {
        setIsDrawerVisible(false);
      }}
      width={'100%'}
      open={isDrawerVisible}
    >
      <Typography.Title level={2}>
        Leia o QR Code para começar a viagem
      </Typography.Title>
      <QRcodeReader
        style={{
          width: '600px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
        setResult={setResult}
        isOn={isDrawerVisible}
      />
    </Drawer>
  );
};

export const DriverConfirmPage = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const setResult = (result: string) => {
    console.log(result);
    setIsDrawerVisible(false);
  };
  return (
    <Layout>
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          margin: 'auto',
        }}
      >
        <DriverConfirmQRCode
          setIsDrawerVisible={setIsDrawerVisible}
          isDrawerVisible={isDrawerVisible}
          setResult={setResult}
        />
        <Typography.Title level={2}>Confirme suas viagens</Typography.Title>
        <Typography.Paragraph>
          Leia o QR Code para começar a viagem
        </Typography.Paragraph>
        <Button
          onClick={() => {
            setIsDrawerVisible(true);
          }}
          type='primary'
          aria-label='Ler Qr code'
          size='large'
          icon={<ScanCodeOutline />}
          style={{ marginTop: '20px' }}
        >
          Ler Qr code
        </Button>
      </div>
    </Layout>
  );
};
