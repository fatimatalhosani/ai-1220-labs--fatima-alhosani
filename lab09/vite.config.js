import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The dev server turns the .jsx files into browser JavaScript.
// npm test reuses this configuration and runs the checks in a simulated browser (jsdom).
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
