import { useNotification } from '@frontend/stores/common/useNotification';
import QRCode from 'qrcode'; // Maybe replace this with https://github.com/akamfoad/qrcode
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
      canvas.width = style.width ? parseInt(style.width.toString()) : 750;
      canvas.height = style.height ? parseInt(style.height.toString()) : 750;
      const context = canvas.getContext('2d');

      if (context) {
        context.imageSmoothingEnabled = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
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

  return (
    <canvas
      width={style.width ? parseInt(style.width.toString()) : 750}
      height={style.height ? parseInt(style.height.toString()) : 750}
      style={style}
      ref={canvasRef}
    />
  );
};
