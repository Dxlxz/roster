import { type Manifest } from 'roster-shared/application';
import { type ExportedManifest } from '@/app/types/exported-manifest.type';

export const toPullManifest = (manifest: ExportedManifest): Manifest =>
  manifest as Manifest;
