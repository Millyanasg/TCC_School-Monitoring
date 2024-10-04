import { useUserStore } from '@frontend/stores/user/user.store';
import { TabBar } from 'antd-mobile';
import {
  CheckShieldOutline,
  EnvironmentOutline,
  SetOutline,
} from 'antd-mobile-icons';
import { useLocation, useNavigate } from 'react-router-dom';

export function Footer() {
  const userData = useUserStore((state) => state.userData);
  const navigate = useNavigate();
  const location = useLocation();
  // const isUsetUser = useMemo(() => userData?.type === 'unset', [userData]);
  const setRouteActive = (value: string) => {
    navigate(`/${value}`);
  };
  const tabs = [
    {
      key: 'menu',
      icon: <CheckShieldOutline fontSize={38} />,
    },
    {
      key: 'confirm',
      icon: <EnvironmentOutline fontSize={38} />,
    },
    {
      key: 'settings',
      icon: <SetOutline fontSize={38} />,
    },
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
}
