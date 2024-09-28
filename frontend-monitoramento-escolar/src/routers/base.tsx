import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GPSTest } from '../pages/GPSTest';
import { Login } from '../pages/Login';
import { QRcodeTest } from '../pages/QRcodeTest';
import { RouteError } from './route-error';
import { NotificationTest } from '../pages/NotificationTest';
import { Register } from '../pages/Register';
export function AppRoutes() {
  return (
    <MemoryRouter basename='/'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/gps' element={<GPSTest />} />
        <Route path='/qr-code' element={<QRcodeTest />} />
        <Route path='/notification-test' element={<NotificationTest />} />
        <Route path='*' element={<RouteError />} />
      </Routes>
    </MemoryRouter>
  );
}
