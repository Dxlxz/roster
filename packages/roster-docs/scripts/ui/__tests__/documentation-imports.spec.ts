import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { getDocumentationImportDiagnostics } from '../../../../roster-ui/docs/getDocumentationImportDiagnostics';

const allowedModules = new Set([
  'roster-ui',
  'roster-ui/primitives/input',
  'roster-ui/style.css',
  'react',
]);

const checkImports = (content: string) =>
  getDocumentationImportDiagnostics({
    source: ts.createSourceFile(
      'example.tsx',
      content,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    ),
    allowedModules,
  });

describe('documentation imports', () => {
  it('allows public entry points, exported CSS, and peer dependencies', () => {
    expect(
      checkImports(`
      import { Input } from 'roster-ui/primitives/input';
      import 'roster-ui/style.css';
      export { Text } from 'roster-ui';
      import { useState } from 'react';
    `),
    ).toEqual([]);
  });

  it.each([
    "import { Internal } from 'roster-ui/internal';",
    "import 'roster-ui/private.css';",
    "export { Internal } from 'roster-ui/internal';",
    "const component = import('roster-ui/internal');",
    "type Internal = import('roster-ui/internal').Internal;",
    "const component = require('roster-ui/internal');",
  ])('rejects an unpublished subpath in %s', (content) => {
    const diagnostics = checkImports(content);

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].category).toBe(ts.DiagnosticCategory.Error);
    expect(diagnostics[0].messageText).toContain(
      'is not exported by roster-ui/package.json',
    );
  });

  it.each([
    "import { Checkbox } from '@ui/primitives/input/Checkbox/Checkbox';",
    "import { Input } from '../../roster-ui/src/input';",
    "import { vi } from 'vitest';",
  ])('rejects a module outside the public surface in %s', (content) => {
    const diagnostics = checkImports(content);

    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].messageText).toContain(
      'is not a roster-ui entry point or peer dependency',
    );
  });
});
