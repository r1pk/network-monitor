import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { NextUIProvider } from '@nextui-org/react';

import { Dashboard } from './pages/dashboard';
import './main.css';

const node = document.querySelector('#root');
const root = createRoot(node);

root.render(
  <StrictMode>
    <NextUIProvider>
      <Dashboard />
    </NextUIProvider>
  </StrictMode>,
);
