// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('/Users/abellae/lvh.key'),
      cert: fs.readFileSync('/Users/abellae/lvh.crt'),
    },
    host: 'lvh.me',
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});