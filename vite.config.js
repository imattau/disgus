import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'Disgus',
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
      }
    },
    cssCodeSplit: false,
    modulePreload: false,
    target: 'es2015'
  },
  path: './',
  plugins: [
    react(),
    {
      name: 'no-module-html',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          return html.replace(/\btype="module"\s*/g, '').replace(/\bcrossorigin\s*/g, '');
        }
      }
    }
  ],
});
