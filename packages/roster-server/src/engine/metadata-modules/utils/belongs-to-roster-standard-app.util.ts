import { roster_STANDARD_APPLICATION } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-applications';
import { type UniversalSyncableFlatEntity } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-entity-from.type';

export const belongsTorosterStandardApp = <
  T extends UniversalSyncableFlatEntity,
>({
  applicationUniversalIdentifier,
}: T) =>
  applicationUniversalIdentifier ===
  roster_STANDARD_APPLICATION.universalIdentifier;
