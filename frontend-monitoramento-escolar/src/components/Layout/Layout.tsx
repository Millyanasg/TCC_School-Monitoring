import { useUserStore } from '@frontend/stores/user/user.store';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { usePositionStore } from '@frontend/stores/common/position.store';

/**
 * A custom hook that protects routes based on user data and initializes position tracking.
 *
 * This hook performs the following actions:
 * 1. Redirects the user to the '/menu' route if user data is present and the current path is '/'.
 * 2. Initializes position tracking when the component mounts.
 *
 * Dependencies:
 * - `useUserStore`: A custom hook to access user data from the store.
 * - `useLocation`: A hook from `react-router-dom` to get the current location object.
 * - `useNavigate`: A hook from `react-router-dom` to programmatically navigate.
 * - `usePositionStore`: A custom hook to access position-related actions from the store.
 *
 * @returns {void}
 */
const UseRouteProtector = () => {
  const userData = useUserStore((state) => state.userData);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && location.pathname === '/') {
      navigate('/menu');
    }
  }, [userData, location.pathname, navigate]);

  const { initializePosition } = usePositionStore();

  useEffect(() => {
    //const clearWatch =
    //initializePosition();
    //return () => {
    //  clearWatch();
    //};
  }, [initializePosition]);
};

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
