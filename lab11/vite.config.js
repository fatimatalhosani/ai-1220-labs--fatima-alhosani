import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server and the tests both run on this computer only.
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5511, strictPort: true },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
  },
});
