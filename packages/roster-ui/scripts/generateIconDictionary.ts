import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { generaterosterIconDictionaryMarkdown } from '../src/icon/internal/generaterosterIconDictionaryMarkdown';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, '../src/icon/icon-dictionary.md');
const generatedMarkdown = generaterosterIconDictionaryMarkdown();
const isCheckOnly = process.argv.includes('--check');

if (isCheckOnly) {
  const currentMarkdown = existsSync(outputPath)
    ? readFileSync(outputPath, 'utf8')
    : undefined;

  if (currentMarkdown !== generatedMarkdown) {
    throw new Error(
      'The icon dictionary Markdown is stale. Run `npx nx generateIconDictionary roster-ui`.',
    );
  }
} else {
  writeFileSync(outputPath, generatedMarkdown, 'utf8');
}
