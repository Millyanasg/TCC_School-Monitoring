import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Drawer } from 'antd';
import { useNotification } from '@frontend/stores/common/useNotification';
type QRCodeDrawerProps = {
  open: boolean;
  onClose: () => void;
  qrCodePayload: string;
};

/**
 * QRCodeDrawer component renders a drawer containing a QR code generated from the provided payload.
 *
 * @param {boolean} open - Determines whether the drawer is open or closed.
 * @param {() => void} onClose - Callback function to handle the closing of the drawer.
 * @param {string} qrCodePayload - The payload to be encoded into the QR code.
 *
 * @returns {JSX.Element} The rendered QR code drawer component.
 */
export const QRCodeDrawer = ({
  open,
  onClose,
  qrCodePayload,
}: QRCodeDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tNotification = useNotification((state) => state.triggerNotification);
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrCodePayload, (error) => {
        if (error) {
          tNotification({
            content: 'Erro ao gerar QRCode',
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodePayload]);

  return (
    <Drawer open={open} onClose={onClose}>
      <canvas ref={canvasRef} />
    </Drawer>
  );
};
