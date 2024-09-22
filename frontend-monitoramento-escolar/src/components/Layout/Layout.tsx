import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          padding: '16px',
          backgroundColor: '#f0f0f0',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
