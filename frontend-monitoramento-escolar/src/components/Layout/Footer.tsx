import { useUserStore } from '@frontend/stores/user/user.store';
import { TabBar } from 'antd-mobile';
import { CheckShieldOutline, EnvironmentOutline } from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Footer component that displays a fixed navigation bar at the bottom of the screen.
 * The navigation bar contains tabs that allow the user to navigate to different routes.
 * The tabs displayed are based on the user's type (driver or parent).
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 *
 * @example
 * // Usage example
 * <Footer />
 *
 * @remarks
 * This component uses the `useUserStore` hook to access user data and the `useNavigate` and `useLocation` hooks from `react-router-dom` for navigation.
 *
 * @function
 * @name Footer
 */
export const Footer = () => {
  const userData = useUserStore((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const tabs = [
    {
      key: '/menu',
      icon: <CheckShieldOutline fontSize={38} />,
    },
    {
      key: userData?.type === 'driver' ? '/driver/confirm' : '/parent/confirm',
      icon: <EnvironmentOutline fontSize={38} />,
    },
    // {
    //   key: '/settings',
    //   icon: <SetOutline fontSize={38} />,
    // },
  ];
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: 'black',
        color: 'white',
        padding: '0.5rem 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {userData && (
        <TabBar
          activeKey={location.pathname}
          onChange={(value) => setRouteActive(value)}
          style={{ width: '100%' }}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} />
          ))}
        </TabBar>
      )}
    </div>
  );
};
