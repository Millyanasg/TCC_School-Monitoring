import { AppRoutes } from './routers/base';

export function App() {
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
      <AppRoutes />
    </main>
  );
}
