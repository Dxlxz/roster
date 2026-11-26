import { type LegacyRowLevelPermissionPredicateGroupManifest } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import { type UniversalFlatRowLevelPermissionPredicateGroup } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-row-level-permission-predicate-group.type';

export const fromFlatRowLevelPermissionPredicateGroupToLegacyRowLevelPermissionPredicateGroupManifest =
  ({
    flatRowLevelPermissionPredicateGroup,
  }: {
    flatRowLevelPermissionPredicateGroup: UniversalFlatRowLevelPermissionPredicateGroup;
  }): LegacyRowLevelPermissionPredicateGroupManifest => ({
    universalIdentifier:
      flatRowLevelPermissionPredicateGroup.universalIdentifier,
    objectUniversalIdentifier:
      flatRowLevelPermissionPredicateGroup.objectMetadataUniversalIdentifier,
    logicalOperator: flatRowLevelPermissionPredicateGroup.logicalOperator,
    ...(isDefined(
      flatRowLevelPermissionPredicateGroup.parentRowLevelPermissionPredicateGroupUniversalIdentifier,
    )
      ? {
          parentPredicateGroupUniversalIdentifier:
            flatRowLevelPermissionPredicateGroup.parentRowLevelPermissionPredicateGroupUniversalIdentifier,
        }
      : {}),
    ...(isDefined(
      flatRowLevelPermissionPredicateGroup.positionInRowLevelPermissionPredicateGroup,
    )
      ? {
          position:
            flatRowLevelPermissionPredicateGroup.positionInRowLevelPermissionPredicateGroup,
        }
      : {}),
  });
