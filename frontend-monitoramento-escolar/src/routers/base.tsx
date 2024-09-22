import { HashRouter, Route, Routes } from 'react-router-dom';
import { GPSTest } from '../pages/GPSTest';
import { Login } from '../pages/Login';
import { QRcodeTest } from '../pages/QRcodeTest';
import { RouteError } from './route-error';
export function AppRoutes() {
  return (
    <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/gps' element={<GPSTest />} />
        <Route path='/qr-code' element={<QRcodeTest />} />
        <Route path='*' element={<RouteError />} />
      </Routes>
    </HashRouter>
  );
}
