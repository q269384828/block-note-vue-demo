import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';
import path from 'path';
export default defineConfig(config => {
  return {
    base: config.command === 'serve' ? undefined : '/' + pkg.name,
    plugins: [vue()],
    resolve: {
      alias:
        config.command === "build"
          ? ({} as Record<string, string>)
          // 开发中 使用相对路径, 避免打包
          : ({
            "rich-text-editor": path.resolve(__dirname, "packages/rich-text-editor/src/"),
          } as Record<string, string>),
    },
  };
});
