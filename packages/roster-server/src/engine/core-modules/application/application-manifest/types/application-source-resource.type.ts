import { type SourceFileManifest } from 'roster-shared/application';

export type ApplicationSourceResource = {
  kind: 'frontComponent' | 'logicFunction';
  universalIdentifier: string;
  sourcePath: string;
  inventoryPath: string;
  sourceFiles?: SourceFileManifest[];
  metadata: Record<string, unknown>;
};
