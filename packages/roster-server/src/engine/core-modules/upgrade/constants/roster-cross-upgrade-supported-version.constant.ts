import { roster_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/roster-current-version.constant';
import { roster_PREVIOUS_VERSIONS } from 'src/engine/core-modules/upgrade/constants/roster-previous-versions.constant';

export const roster_CROSS_UPGRADE_SUPPORTED_VERSIONS = [
  ...roster_PREVIOUS_VERSIONS,
  roster_CURRENT_VERSION,
] as const;

export type rosterCrossUpgradeSupportedVersion =
  (typeof roster_CROSS_UPGRADE_SUPPORTED_VERSIONS)[number];
