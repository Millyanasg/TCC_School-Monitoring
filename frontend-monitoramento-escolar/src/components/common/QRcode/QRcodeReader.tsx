import { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

/**
 * Props for the QRcodeReader component.
 *
 * @typedef {Object} QRcodeReaderProps
 * @property {(results: string) => void} setResult - A function to handle the result of the QR code scan.
 */
type QRcodeReaderProps = {
  setResult: (results: string) => void;
  isOn: boolean;
};

export const QRcodeReader: React.FC<QRcodeReaderProps> = ({
  setResult,
  isOn,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setError] = useState<string | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setError('enumerateDevices() not supported.');
      return;
    }

    const startScanner = async () => {
      try {
        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;
        const videoInputDevices = await codeReader.listVideoInputDevices();
        if (videoInputDevices.length > 0) {
          const deviceId =
            videoInputDevices.length > 1
              ? videoInputDevices[1].deviceId
              : videoInputDevices[0].deviceId;
          await codeReader.decodeFromVideoDevice(
            deviceId,
            videoRef.current!,
            (result, err) => {
              if (result) {
                setResult(result.getText());
                codeReader.reset();
              }
              if (err && !(err instanceof NotFoundException)) {
                console.error(err);
                setError('Error scanning QR code.');
              }
            },
          );
        } else {
          setError('No video input devices found.');
        }
      } catch (err) {
        console.error(err);
        setError(`Error accessing video input devices. ${err}`);
      }
    };

    if (isOn) {
      startScanner();
    } else {
      codeReaderRef.current?.reset();
    }

    return () => {
      codeReaderRef.current?.reset();
    };
  }, [isOn, setResult]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: '100%',
          }}
        />
        <div
          id='qr-code-overlay'
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '8px solid black',
            boxSizing: 'border-box',
            pointerEvents: 'none', // Ensure the overlay does not interfere with video clicks
          }}
        />
      </div>
    </div>
  );
};
