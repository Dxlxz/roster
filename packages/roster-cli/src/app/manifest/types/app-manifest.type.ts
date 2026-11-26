import { type Manifest } from 'roster-shared/application';

import { type EntityFilePaths } from '@/app/manifest/types/entity-file-paths.type';

export type AppManifest = {
  manifest: Manifest;
  filePaths: EntityFilePaths;
};
