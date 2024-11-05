import { QRcodeReader } from '@frontend/components/common/QRcode/QRcodeReader';
import { Drawer, Typography } from 'antd';

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

export const DriverConfirmQRCode = ({
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
