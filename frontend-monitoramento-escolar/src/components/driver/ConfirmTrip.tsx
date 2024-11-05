import { Button, Typography } from 'antd';
import { ScanCodeOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { DriverConfirmQRCode } from './DriverConfirmQRCode';

/**
 * ConfirmTrip component renders a UI for drivers to start a trip by scanning a QR code.
 * It includes a button to open a QR code scanner and displays instructions for the driver.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Usage example:
 * <ConfirmTrip />
 *
 * @remarks
 * This component uses Ant Design components such as Typography and Button.
 * It also uses a custom component DriverConfirmQRCode to handle the QR code scanning.
 *
 * @function
 * @name ConfirmTrip
 */
export const ConfirmTrip = () => {
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
