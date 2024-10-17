import { useRef, useState, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export const QRcodeTest = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setError('enumerateDevices() not supported.');
      return;
    }

    const startScanner = async () => {
      try {
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

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <Layout>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <h1>QR Code Scanner</h1>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200px',
              height: '200px',
              marginTop: '-100px',
              marginLeft: '-100px',
              border: '8px solid black',
              boxSizing: 'border-box',
            }}
          ></div>
        </div>
        {result && <p>Result: {result}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </Layout>
  );
};
