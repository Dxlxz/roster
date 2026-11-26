import { type ViewFilterGroupManifest } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

import { type UniversalFlatViewFilterGroup } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-view-filter-group.type';

export const fromFlatViewFilterGroupToViewFilterGroupManifest = ({
  flatViewFilterGroup,
}: {
  flatViewFilterGroup: UniversalFlatViewFilterGroup;
}): ViewFilterGroupManifest => ({
  universalIdentifier: flatViewFilterGroup.universalIdentifier,
  logicalOperator: flatViewFilterGroup.logicalOperator,
  ...(isDefined(flatViewFilterGroup.parentViewFilterGroupUniversalIdentifier)
    ? {
        parentViewFilterGroupUniversalIdentifier:
          flatViewFilterGroup.parentViewFilterGroupUniversalIdentifier,
      }
    : {}),
  ...(isDefined(flatViewFilterGroup.positionInViewFilterGroup)
    ? {
        positionInViewFilterGroup:
          flatViewFilterGroup.positionInViewFilterGroup,
      }
    : {}),
});
