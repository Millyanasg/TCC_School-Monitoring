import { GPSTest } from '@frontend/pages/GPSTest';
import { Login } from '@frontend/pages/Auth/Login';
import { NotificationTest } from '@frontend/pages/NotificationTest';
import { QRcodeTest } from '@frontend/pages/QRcodeTest';
import { Register } from '@frontend/pages/Auth/Register';
import { useUserStore } from '@frontend/stores/user/user.store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RouteError } from './route-error';
import { Menu } from '@frontend/pages/Common/Menu';
import { Children } from '@frontend/pages/Parent/Children';
import { Addresses } from '@frontend/pages/Parent/Addresses';
import { DriverCarPage } from '@frontend/pages/Driver/DriverCar';
import { DriverTripsPage } from '@frontend/pages/Driver/DriverTrips';
import { DriverRequestsPage } from '@frontend/pages/Driver/DriverRequests';
import { ParentDriverpage } from '@frontend/pages/Parent/ParentDriver';

export const AppRoutes = () => {
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
            <Route path='/diver/my-car' element={<DriverCarPage />} />
            <Route path='/diver/trips' element={<DriverTripsPage />} />
            <Route path='/diver/requests' element={<DriverRequestsPage />} />
          </>
        )}
        {userData && userData.type === 'parent' && (
          <>
            <Route path='/parent' element={<></>} />
            <Route path='/parent/children' element={<Children />} />
            <Route path='/parent/addresses' element={<Addresses />} />
            <Route
              path='/parent/driver-request'
              element={<ParentDriverpage />}
            />
          </>
        )}
        <Route path='*' element={<RouteError />} />
      </Routes>
    </HashRouter>
  );
};
