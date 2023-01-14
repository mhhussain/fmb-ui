import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dependencies } from './package.json';

const vendor = ['react', 'react-router-dom', 'react-dom'];

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (vendor.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  base: '/',
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: vendor,
          ...renderChunks(dependencies),
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@/components', replacement: '/src/components' },
      { find: '@/atoms', replacement: '/src/components/atoms' },
      { find: '@/molecules', replacement: '/src/components/molecules' },
      { find: '@/organisms', replacement: '/src/components/organisms' },
      { find: '@/templates', replacement: '/src/components/templates' },
      { find: '@/screens', replacement: '/src/components/screens' },
      { find: '@/api', replacement: '/src/api' },
      { find: '@/models', replacement: '/src/api/models' },
      { find: '@/assets', replacement: '/src/assets' },
      { find: '@/redux', replacement: '/src/redux' },
      { find: '@/styles', replacement: '/src/styles' },
      { find: '@/utils', replacement: '/src/utils' },
      { find: '@/store', replacement: '/src/store'},
    ],
  },
})
