import { Login } from '@frontend/pages/Auth/Login';
import { Register } from '@frontend/pages/Auth/Register';
import { Menu } from '@frontend/pages/Common/Menu';
import { DriverCarPage } from '@frontend/pages/Driver/DriverCar';
import { DriverConfirmPage } from '@frontend/pages/Driver/DriverConfirmPage';
import { DriverRequestsPage } from '@frontend/pages/Driver/DriverRequests';
import { DriverTripsPage } from '@frontend/pages/Driver/DriverTrips';
import { GPSTest } from '@frontend/pages/GPSTest';
import { NotificationTest } from '@frontend/pages/NotificationTest';
import { Addresses } from '@frontend/pages/Parent/Addresses';
import { Children } from '@frontend/pages/Parent/Children';
import { ConfirmTrip } from '@frontend/pages/Parent/ConfirmTrip';
import ParentDriverpage from '@frontend/pages/Parent/ParentDriver';
import { QRcodeTest } from '@frontend/pages/QRcodeTest';
import { useUserStore } from '@frontend/stores/user/user.store';
import { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { RouteError } from './route-error';

export const AppRoutes = () => {
  const userData = useUserStore((state) => state.userData);
  const updateUserData = useUserStore((state) => state.updateUserData);
  useEffect(() => {
    updateUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Route path='/driver/confirm' element={<DriverConfirmPage />} />
          </>
        )}
        {userData && userData.type === 'parent' && (
          <>
            <Route path='/parent' element={<></>} />
            <Route path='/parent/children' element={<Children />} />
            <Route path='/parent/addresses' element={<Addresses />} />
            <Route path='/parent/confirm' element={<ConfirmTrip />} />
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
