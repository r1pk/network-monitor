import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/main.css';

const node = document.querySelector('#root');
const root = createRoot(node);

root.render(
  <StrictMode>
    <span>WIP</span>
  </StrictMode>,
);
