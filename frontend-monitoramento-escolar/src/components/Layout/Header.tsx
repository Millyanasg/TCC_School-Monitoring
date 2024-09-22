import { Tabs } from 'antd-mobile';
import { useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string) => {
    navigate(`/${key}`);
  };

  // Determine the active tab based on the current path
  const activeKey = location.pathname.split('/')[1] || 'login';

  return (
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      <Tabs.Tab title='GPS test' key='gps'>
        GPS test
      </Tabs.Tab>
      <Tabs.Tab title='QR code test' key='qr-code'>
        QR code test
      </Tabs.Tab>
      <Tabs.Tab title='Login' key='login'>
        Login
      </Tabs.Tab>
    </Tabs>
  );
}
