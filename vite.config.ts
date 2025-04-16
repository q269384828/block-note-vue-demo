import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
export default defineConfig({
  base: pkg.name,
  plugins: [react(), vue()],
});
