import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Dashboard } from '@/pages/dashboard';

import '@/main.css';

const node = document.querySelector('#root');

if (node === null) {
  throw new Error('Root node not found');
}

createRoot(node).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);
