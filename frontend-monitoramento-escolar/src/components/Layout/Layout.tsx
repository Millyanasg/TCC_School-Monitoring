import { useUserStore } from '@frontend/stores/user/user.store';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

function UseRouteProtector() {
  const userData = useUserStore((state) => state.userData);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && location.pathname === '/') {
      navigate('/menu');
    }
  }, [userData, location.pathname, navigate]);
}

export function Layout({ children }: { children: React.ReactNode }) {
  UseRouteProtector();
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
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
