import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);
