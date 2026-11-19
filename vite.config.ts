// Adds Vitest's types so the `test` block below type-checks (TypeScript only, no runtime effect).
/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/pay-my-lawyer/',
  plugins: [react()],
  resolve: {
    alias: {
      // `@/…` imports from src/, so files don't climb ../../ folders. Matches `paths` in tsconfig.app.json.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    // MUI must go through Vite so the styled-engine alias above applies in tests.
    server: { deps: { inline: [/@mui\//] } },
    setupFiles: ['./src/test/setup.ts'],
  },
});
