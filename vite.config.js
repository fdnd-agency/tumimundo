import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, './src/lib'), 
    },
  },
  test: {
    globals: true,       // Maakt globale functies zoals 'vi', 'test', en 'expect' beschikbaar
	  environment: 'jsdom',
    include: [
      'tests/unit/**/*.{test,spec}.{js,ts}',
      'tests/integration/**/*.{test,spec}.{js,ts}',
    ],
  },
});
