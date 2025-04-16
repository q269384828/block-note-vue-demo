import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
export default defineConfig(config => {

  return {
    base: config.command === 'serve' ? undefined : '/' + pkg.name,
    plugins: [react(), vue()],
  }
});
