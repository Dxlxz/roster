import { remapRecordPageUniversalIdentifiersToPre231 } from 'src/database/commands/upgrade-version-command/2-10/utils/remap-record-page-universal-identifiers-to-pre-2-31.util';
import { type rosterStandardAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/types/roster-standard-all-flat-entity-maps.type';
import {
  type ComputerosterStandardApplicationAllFlatEntityMapsArgs,
  computerosterStandardApplicationAllFlatEntityMaps,
} from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';

// Standard definitions for upgrade commands that predate the 2-31 record-page
// reconcile: they run on workspaces whose rows still hold the pre-derivation
// universal identifiers, so the derived identifiers the shared constants now
// resolve to are remapped back to the pre-2.31 literals.
export const computerosterStandardApplicationAllFlatEntityMapsPre231 = (
  args: ComputerosterStandardApplicationAllFlatEntityMapsArgs,
): rosterStandardAllFlatEntityMaps => {
  const { allFlatEntityMaps } =
    computerosterStandardApplicationAllFlatEntityMaps(args);

  return remapRecordPageUniversalIdentifiersToPre231(allFlatEntityMaps);
};
