import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Dashboard } from '@/pages/dashboard';
import '@/main.css';

const node = document.querySelector('#root');
const root = createRoot(node);

root.render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);
