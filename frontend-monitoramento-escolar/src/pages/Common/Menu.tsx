import { useUserStore } from '@frontend/stores/user/user.store';
import 'leaflet/dist/leaflet.css';

import { Layout } from '@frontend/components/Layout/Layout';
import { AdminMenu } from '@frontend/components/common/AdminMenu';
import { DriverMenu } from '@frontend/components/common/DriverMenu';
import { ParentMenu } from '@frontend/components/common/ParentMenu';
import { SessionMenu } from '@frontend/components/common/SessionMenu';
import { UserSetUpFrom } from '@frontend/components/common/UserSetUpFrom';
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
