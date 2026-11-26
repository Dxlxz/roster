import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

const SDK_DIRECTORY = resolve(__dirname, '..');

export const buildAiFrontComponentSdk = async () => {
  const entry = resolve(SDK_DIRECTORY, 'src/sdk/front-component/index.ts');
  const runtime = await build({
    entryPoints: [entry],
    bundle: true,
    platform: 'browser',
    format: 'esm',
    external: [
      'react',
      'react/jsx-runtime',
      'roster-client-sdk/metadata',
      'roster-client-sdk/rest',
    ],
    minify: true,
    write: false,
    alias: Object.fromEntries(
      ['utils', 'types', 'translations', 'ai', 'application'].map(
        (entryPoint) => [
          `roster-shared/${entryPoint}`,
          resolve(SDK_DIRECTORY, `../roster-shared/src/${entryPoint}/index.ts`),
        ],
      ),
    ),
  });
  const declarations = await rollup({
    input: entry,
    external: (specifier) =>
      specifier === 'react' || specifier.startsWith('roster-shared/'),
    plugins: [
      dts({
        respectExternal: true,
        tsconfig: resolve(SDK_DIRECTORY, 'tsconfig.lib.json'),
      }),
    ],
  });

  try {
    const { output } = await declarations.generate({ format: 'es' });

    return { source: runtime.outputFiles[0].text, types: output[0].code };
  } finally {
    await declarations.close();
  }
};

if (require.main === module) {
  void buildAiFrontComponentSdk().then((sdkModule) =>
    writeFile(
      resolve(
        SDK_DIRECTORY,
        '../roster-server/src/engine/metadata-modules/ai/ai-front-component/constants/generated/front-component-sdk-module.json',
      ),
      `${JSON.stringify(sdkModule, null, 2)}\n`,
    ),
  );
}
