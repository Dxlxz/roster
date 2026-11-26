import { z } from 'zod';

import { runroster } from './run-roster';

const buildResultSchema = z.object({
  manifest: z.object({
    logicFunctions: z.array(z.object({ name: z.string() })),
  }),
});

export const readManifestLogicFunctionNamesOrThrow = async (): Promise<
  string[]
> => {
  const result = await runroster(['app', 'build']);

  if (!result.ok) {
    throw new Error(`App build failed: ${result.error.message}`);
  }

  const { manifest } = buildResultSchema.parse(result.data);

  return manifest.logicFunctions.map((logicFunction) => logicFunction.name);
};
