import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`);
  console.log("Loaded environment variables:", env); // For debugging

  return {
    plugins: [react()],
    server: {
      https: false,
      host: '0.0.0.0', // Listen on all network interfaces
      port: env.VITE_PORT || 3000,
      open: false,      // Disable auto-open in a VM
      cors: true,
      hmr: {
        protocol: 'wss', // Use wss since SSL is handled externally
        host: 'cleaker.me',
        port: env.VITE_PORT || 3000,
      },
      proxy: {
        '/ws': {
          target: `wss://cleaker.me:${env.VITE_PORT || 3000}`,
          ws: true,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist/',
      sourcemap: true,
    },
  };
});