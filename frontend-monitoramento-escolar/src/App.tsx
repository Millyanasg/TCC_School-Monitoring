import { LoadScript } from '@react-google-maps/api';
import { AppRoutes } from './routers/base.routes';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

const App = () => {
  return (
    <main
      style={{
        maxWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        onLoad={() => console.debug('Google Maps API loaded')}
        onError={() => console.error('Failed to load Google Maps API')}
      >
        <AppRoutes />
      </LoadScript>
    </main>
  );
};

export default App;
