import path from 'path';
import { type PackageJson } from 'type-fest';
import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig(() => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/roster-sdk-email',
    resolve: {
      tsconfigPaths: true,
      alias: {
        '@/': path.resolve(__dirname, 'src') + '/',
      },
    },
    build: {
      emptyOutDir: false,
      outDir: 'dist/email',
      sourcemap: true,
      lib: {
        entry: 'src/sdk/email/index.ts',
        name: 'roster-sdk-email',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: (id: string) => {
          if (/^node:/.test(id)) {
            return true;
          }

          const builtins = [
            'child_process',
            'crypto',
            'fs',
            'fs/promises',
            'module',
            'os',
            'path',
            'stream',
            'url',
            'util',
          ];

          if (builtins.includes(id)) {
            return true;
          }

          const dependencies = Object.keys(
            (packageJson as PackageJson).dependencies || {},
          );

          return dependencies.some(
            (dependency) =>
              id === dependency || id.startsWith(dependency + '/'),
          );
        },
      },
    },
    logLevel: 'warn' as const,
  };
});
