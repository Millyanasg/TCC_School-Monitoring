import { GPSTest } from '@frontend/pages/GPSTest';
import { Login } from '@frontend/pages/Login';
import { NotificationTest } from '@frontend/pages/NotificationTest';
import { QRcodeTest } from '@frontend/pages/QRcodeTest';
import { Register } from '@frontend/pages/Register';
import { useUserStore } from '@frontend/stores/user/user.store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RouteError } from './route-error';
import { Menu } from '@frontend/pages/Menu';
export function AppRoutes() {
  const userData = useUserStore((state) => state.userData);
  return (
    <HashRouter basename='/' future={{ v7_startTransition: true }}>
      <Routes>
        {!userData && (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        )}
        {userData && (
          <>
            <Route path='/menu' element={<Menu />} />
            <Route path='/gps' element={<GPSTest />} />
            <Route path='/qr-code' element={<QRcodeTest />} />
            <Route path='/notification-test' element={<NotificationTest />} />
          </>
        )}
        {userData && userData.type === 'admin' && (
          <>
            <Route path='/admin' element={<></>} />
            <Route path='/admin/users' element={<></>} />
          </>
        )}
        {userData && userData.type === 'driver' && (
          <>
            <Route path='/diver' element={<></>} />
            <Route path='/diver/notifications' element={<></>} />
          </>
        )}
        {userData && userData.type === 'parent' && (
          <>
            <Route path='/parent' element={<></>} />
            <Route path='/parent/notifications' element={<></>} />
          </>
        )}
        <Route path='*' element={<RouteError />} />
      </Routes>
    </HashRouter>
  );
}
