import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/mdv/mdv2/' : '/',
  build: {
    chunkSizeWarningLimit: 650,
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
  },
});
