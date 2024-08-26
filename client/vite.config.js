/* eslint-disable no-undef */

import { defineConfig } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
});
