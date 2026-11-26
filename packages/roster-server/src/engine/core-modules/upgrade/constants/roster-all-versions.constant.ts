import { roster_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/roster-current-version.constant';
import { roster_NEXT_VERSIONS } from 'src/engine/core-modules/upgrade/constants/roster-next-versions.constant';
import { roster_PREVIOUS_VERSIONS } from 'src/engine/core-modules/upgrade/constants/roster-previous-versions.constant';

export const roster_ALL_VERSIONS = [
  ...roster_PREVIOUS_VERSIONS,
  roster_CURRENT_VERSION,
  ...roster_NEXT_VERSIONS,
] as const;

export type rosterAllVersion = (typeof roster_ALL_VERSIONS)[number];
