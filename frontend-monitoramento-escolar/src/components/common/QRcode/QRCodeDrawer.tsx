import { useNotification } from '@frontend/stores/common/useNotification';
import QRCode from 'qrcode';
import React, { useEffect, useRef } from 'react';
type QRCodeDrawerProps = {
  style: React.CSSProperties;
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
export const QRCodeDrawer = ({ qrCodePayload, style }: QRCodeDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tNotification = useNotification((state) => state.triggerNotification);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        context.imageSmoothingEnabled = false;
        QRCode.toCanvas(canvasRef.current, qrCodePayload, (error) => {
          if (error) {
            tNotification({
              content: 'Erro ao gerar QRCode',
            });
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodePayload]);

  return <canvas style={style} ref={canvasRef} />;
};
