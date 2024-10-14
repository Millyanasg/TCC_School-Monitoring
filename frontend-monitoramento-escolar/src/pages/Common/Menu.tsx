import { useUserStore } from '@frontend/stores/user/user.store';
import 'leaflet/dist/leaflet.css';

import { Layout } from '@frontend/components/Layout/Layout';
import { AdminMenu } from './AdminMenu';
import { DriverMenu } from './DriverMenu';
import { ParentMenu } from './ParentMenu';
import { SessionMenu } from './SessionMenu';
import { UserSetUpFrom } from './UserSetUpFrom';
export function Menu() {
  const userData = useUserStore((state) => state.userData);
  return (
    <Layout>
      <SessionMenu />
      {userData && userData.type === 'unset' && <UserSetUpFrom />}
      {userData && userData.type === 'admin' && <AdminMenu />}
      {userData && userData.type === 'parent' && <ParentMenu />}
      {userData && userData.type === 'driver' && <DriverMenu />}
    </Layout>
  );
}
