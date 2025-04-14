import { defineConfig } from '@playwright/test';
 
export default defineConfig({
  webServer: {
    timeout: 60000,
    command: 'npm run dev',
    port: 5173,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
});
 