import { Layout } from '@frontend/components/Layout/Layout';
import { MapTrip } from '@frontend/components/common/Map/MapTrip';
import { QRcodeReader } from '@frontend/components/common/QRcode/QRcodeReader';
import { Button, Drawer, Typography } from 'antd';
import { ScanCodeOutline } from 'antd-mobile-icons';
import { useEffect, useState } from 'react';

/**
 * Component for displaying a QR code reader inside a drawer.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isDrawerVisible - Determines if the drawer is visible.
 * @param {Function} props.setIsDrawerVisible - Function to set the visibility of the drawer.
 * @param {Function} props.setResult - Function to set the result of the QR code scan.
 *
 * @returns {JSX.Element} The rendered component.
 */
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

const OnGoingTrip = () => {
  const [startLocation, setStartLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [endLocation, setEndLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setStartLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
      setEndLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
      setCurrentLocation({
        coords: {
          latitude: position.coords.latitude + Math.random() / 100,
          longitude: position.coords.longitude + Math.random() / 100,
        },
      });
    });
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Typography.Title level={2}>Viagem em andamento</Typography.Title>
      <Typography.Paragraph>
        Você está em uma viagem. Aguarde o término para iniciar outra.
      </Typography.Paragraph>
      {startLocation && endLocation && currentLocation && (
        <MapTrip
          startLocation={startLocation}
          endLocation={endLocation}
          currentLocation={currentLocation}
          isRendering={true}
        />
      )}
    </div>
  );
};
const ConfirmTrip = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const setResult = (result: string) => {
    console.log(result);
    setIsDrawerVisible(false);
  };
  return (
    <>
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
        <Typography.Title level={2}>Começar viagem</Typography.Title>
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
    </>
  );
};

export const DriverConfirmPage = () => {
  const isOnGoingTrip = true;
  return <Layout>{isOnGoingTrip ? <OnGoingTrip /> : <ConfirmTrip />}</Layout>;
};
