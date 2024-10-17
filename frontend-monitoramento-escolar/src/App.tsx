import { AppRoutes } from './routers/base.routes';

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
      <AppRoutes />
    </main>
  );
};

export default App;
