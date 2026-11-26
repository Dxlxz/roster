import { roster_STANDARD_APPLICATION } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-applications';
import { type WorkspaceMigrationBuilderOptions } from 'src/engine/workspace-manager/workspace-migration/workspace-migration-builder/types/workspace-migration-builder-options.type';

export const isCallerrosterStandardApp = (
  buildOptions: WorkspaceMigrationBuilderOptions,
) =>
  buildOptions.applicationUniversalIdentifier ===
  roster_STANDARD_APPLICATION.universalIdentifier;
