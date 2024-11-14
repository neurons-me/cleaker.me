import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  // Load environment variables from the `env` directory
  const env = loadEnv(mode, `${process.cwd()}/env`);

  return {
    plugins: [react()],
    server: {
      https: {
        key: fs.readFileSync('/Users/abellae/lvh.key'),
        cert: fs.readFileSync('/Users/abellae/lvh.crt'),
      },
      host: env.VITE_BASE_DOMAIN || 'lvh.me', // Use env variable if available
      port: env.VITE_PORT || 3000,  // Fall back to 3000 if VITE_PORT is not defined
      open: true,
      cors: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
    define: {
      'process.env': env, // Make env variables accessible in the app
    },
  };
});