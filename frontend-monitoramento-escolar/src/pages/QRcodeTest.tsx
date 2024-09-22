import { useRef, useState, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
export function QRcodeTest() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length > 0) {
          const firstDeviceId = videoInputDevices[0].deviceId;
          codeReader.decodeFromVideoDevice(
            firstDeviceId,
            videoRef.current!,
            (result, err) => {
              if (result) {
                setResult(result.getText());
                codeReader.reset();
              }
              if (err && !(err instanceof NotFoundException)) {
                console.error(err);
              }
            },
          );
        }
      })
      .catch((err) => console.error(err));

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <Layout>
      <div>
        <h1>QR Code Scanner</h1>
        <video ref={videoRef} style={{ width: '100%' }} />
        {result && <p>Result: {result}</p>}
      </div>
    </Layout>
  );
}
