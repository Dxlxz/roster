import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const roster_API_URL = process.env.roster_API_URL ?? 'http://localhost:2020';
const roster_API_KEY =
  process.env.roster_API_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDIwMjAyMC0xYzI1LTRkMDItYmYyNS02YWVjY2Y3ZWE0MTkiLCJ0eXBlIjoiQVBJX0tFWSIsIndvcmtzcGFjZUlkIjoiMjAyMDIwMjAtMWMyNS00ZDAyLWJmMjUtNmFlY2NmN2VhNDE5IiwiaWF0IjoxNzM1Njg5NjAwLCJleHAiOjQ4OTE0NDk2MDAsImp0aSI6IjIwMjAyMDIwLWY0MDEtNGQ4YS1hNzMxLTY0ZDAwN2MyN2JhZCJ9.bfQjfyN0NEtTCLE_xPyNcwonDzlSXFoP8kdCQTdnuDc';

// Make env vars available to globalSetup (test.env only applies to workers)
process.env.roster_API_URL = roster_API_URL;
process.env.roster_API_KEY = roster_API_KEY;

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    // tsconfig.json excludes the tests, and since vite 8.1 its paths no longer apply to them
    alias: { src: fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    testTimeout: 120_000,
    hookTimeout: 120_000,
    fileParallelism: false,
    include: ['src/**/*.integration-test.ts'],
    globalSetup: ['src/__tests__/global-setup.ts'],
    env: {
      roster_API_URL,
      roster_API_KEY,
    },
  },
});
