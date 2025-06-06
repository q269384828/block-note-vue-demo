import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig(() => {
  return {
    plugins: [react(), vue()],
    build: {
      sourcemap: true,
      lib: {
        entry: {
          'rich-text-editor': path.resolve(__dirname, 'src/index.ts'),
        },
        name: 'rich-text-editor',
        formats: ['es'],
        fileName: (format, entryName) =>
          `${entryName}.js`,
      },
      rollupOptions: {
        external: [
          ...Object.keys({
            ...pkg.dependencies,
            ...pkg.peerDependencies,
            ...pkg.devDependencies,
          }),
          '@vue/*',
        ],
      },
    },
  };
});
