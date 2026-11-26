import { isDefined } from 'roster-shared/utils';

import { createEmptyFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant';
import { getMetadataFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util';
import { roster_STANDARD_ALL_METADATA_NAME } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-all-metadata-name.constant';
import { type rosterStandardAllFlatEntityMaps } from 'src/engine/workspace-manager/roster-standard-application/types/roster-standard-all-flat-entity-maps.type';
import { buildStandardFlatAgentChatChannelMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/agent-chat-channel/build-standard-flat-agent-chat-channel-maps.util';
import { buildStandardFlatFieldMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/field-metadata/build-standard-flat-field-metadata-maps.util';
import { getStandardObjectMetadataRelatedEntityIds } from 'src/engine/workspace-manager/roster-standard-application/utils/get-standard-object-metadata-related-entity-ids.util';
import { WORKSPACE_CREATION_ONLY_WIDGET_TYPES } from 'src/engine/workspace-manager/roster-standard-application/constants/workspace-creation-only-widget-types.constant';
import { getStandardPageLayoutMetadataRelatedEntityIds } from 'src/engine/workspace-manager/roster-standard-application/utils/get-standard-page-layout-metadata-related-entity-ids.util';
import { buildStandardFlatFieldMetadataOptionMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/field-metadata-option/build-standard-flat-field-metadata-option-maps.util';
import { buildStandardFlatIndexMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/index/build-standard-flat-index-metadata-maps.util';
import { buildStandardFlatCommandMenuItemMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/command-menu-item/build-standard-flat-command-menu-item-maps.util';
import { buildStandardFlatNavigationMenuItemMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/navigation-menu-item/build-standard-flat-navigation-menu-item-maps.util';
import { buildStandardFlatObjectMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/object-metadata/build-standard-flat-object-metadata-maps.util';
import { buildStandardFlatPageLayoutTabMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/page-layout-tab/build-standard-flat-page-layout-tab-metadata-maps.util';
import { buildStandardFlatPageLayoutWidgetMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/page-layout-widget/build-standard-flat-page-layout-widget-metadata-maps.util';
import { addFlatEntityToFlatEntityMapsOrThrow } from 'src/engine/metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util';
import { computeStandardRecordFormFlatEntities } from 'src/engine/workspace-manager/roster-standard-application/utils/page-layout/compute-standard-record-form-flat-entities.util';
import { buildStandardFlatPageLayoutMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/page-layout/build-standard-flat-page-layout-metadata-maps.util';
import { buildStandardFlatRelatedRecordPathMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/related-record-path/build-standard-flat-related-record-path-maps.util';
import { buildStandardFlatPermissionFlagMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/permission-flag/build-standard-flat-permission-flag-metadata-maps.util';
import { buildStandardFlatRoleMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/role-metadata/build-standard-flat-role-metadata-maps.util';
import { buildStandardFlatSearchFieldMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/search-field-metadata/build-standard-flat-search-field-metadata-maps.util';
import { buildStandardFlatSkillMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/skill-metadata/build-standard-flat-skill-metadata-maps.util';
import { buildStandardFlatTimelineActivityTypeMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/timeline-activity-type/build-standard-flat-timeline-activity-type-maps.util';
import { buildStandardFlatViewFieldMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/view-field/build-standard-flat-view-field-metadata-maps.util';
import { buildStandardFlatViewFieldGroupMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/view-field-group/build-standard-flat-view-field-group-metadata-maps.util';
import { buildStandardFlatViewFilterMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/view-filter/build-standard-flat-view-filter-metadata-maps.util';
import { buildStandardFlatViewGroupMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/view-group/build-standard-flat-view-group-metadata-maps.util';
import { buildStandardFlatViewMetadataMaps } from 'src/engine/workspace-manager/roster-standard-application/utils/view/build-standard-flat-view-metadata-maps.util';
import { type IdByUniversalIdentifierByMetadataName } from 'src/engine/workspace-manager/workspace-migration/services/utils/enrich-create-workspace-migration-action-with-ids.util';

export type ComputerosterStandardApplicationAllFlatEntityMapsArgs = {
  now: string;
  workspaceId: string;
  rosterStandardApplicationId: string;
  isWorkspaceCreation?: boolean;
};

export const computerosterStandardApplicationAllFlatEntityMaps = ({
  now,
  workspaceId,
  rosterStandardApplicationId,
  isWorkspaceCreation = false,
}: ComputerosterStandardApplicationAllFlatEntityMapsArgs): {
  allFlatEntityMaps: rosterStandardAllFlatEntityMaps;
  // TODO remove once all metadatas has fully been universal migrated
  idByUniversalIdentifierByMetadataName: IdByUniversalIdentifierByMetadataName;
} => {
  const standardObjectMetadataRelatedEntityIds =
    getStandardObjectMetadataRelatedEntityIds();

  const flatObjectMetadataMaps = buildStandardFlatObjectMetadataMaps({
    now,
    workspaceId,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps: createEmptyFlatEntityMaps(),
    },
  });

  const flatFieldMetadataMaps = buildStandardFlatFieldMetadataMaps({
    now,
    workspaceId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps: {
      flatObjectMetadataMaps,
    },
    rosterStandardApplicationId,
  });

  const flatFieldMetadataOptionMaps = buildStandardFlatFieldMetadataOptionMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    dependencyFlatEntityMaps: { flatFieldMetadataMaps },
  });

  const flatIndexMaps = buildStandardFlatIndexMetadataMaps({
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    workspaceId,
    rosterStandardApplicationId,
  });

  const flatSearchFieldMetadataMaps = buildStandardFlatSearchFieldMetadataMaps({
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    workspaceId,
    rosterStandardApplicationId,
  });

  const flatViewMaps = buildStandardFlatViewMetadataMaps({
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    workspaceId,
  });

  const flatViewGroupMaps = buildStandardFlatViewGroupMetadataMaps({
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
      flatViewMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    workspaceId,
  });

  const flatViewFilterGroupMaps = createEmptyFlatEntityMaps();

  const flatViewFieldGroupMaps = buildStandardFlatViewFieldGroupMetadataMaps({
    dependencyFlatEntityMaps: {
      flatViewMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    workspaceId,
  });

  const flatViewFilterMaps = buildStandardFlatViewFilterMetadataMaps({
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
      flatFieldMetadataOptionMaps,
      flatViewMaps,
      flatViewFilterGroupMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    workspaceId,
  });

  const flatViewFieldMaps = buildStandardFlatViewFieldMetadataMaps({
    dependencyFlatEntityMaps: {
      flatObjectMetadataMaps,
      flatFieldMetadataMaps,
      flatFieldMetadataOptionMaps,
      flatViewMaps,
      flatViewFieldGroupMaps,
    },
    now,
    standardObjectMetadataRelatedEntityIds,
    rosterStandardApplicationId,
    workspaceId,
  });

  const flatRoleMaps = buildStandardFlatRoleMetadataMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps: undefined,
  });

  const flatPermissionFlagMaps = buildStandardFlatPermissionFlagMetadataMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
  });

  const flatAgentMaps = createEmptyFlatEntityMaps();

  const flatSkillMaps = buildStandardFlatSkillMetadataMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps: undefined,
  });

  const standardPageLayoutMetadataRelatedEntityIds =
    getStandardPageLayoutMetadataRelatedEntityIds();

  const flatPageLayoutMaps = buildStandardFlatPageLayoutMetadataMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    standardObjectMetadataRelatedEntityIds,
    standardPageLayoutMetadataRelatedEntityIds,
  });

  const excludedWidgetTypes = isWorkspaceCreation
    ? []
    : WORKSPACE_CREATION_ONLY_WIDGET_TYPES;

  const flatPageLayoutTabMaps = buildStandardFlatPageLayoutTabMetadataMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    standardPageLayoutMetadataRelatedEntityIds,
    excludedWidgetTypes,
  });

  const flatPageLayoutWidgetMaps =
    buildStandardFlatPageLayoutWidgetMetadataMaps({
      now,
      workspaceId,
      rosterStandardApplicationId,
      standardObjectMetadataRelatedEntityIds,
      standardPageLayoutMetadataRelatedEntityIds,
      excludedWidgetTypes,
    });

  const standardRecordFormFlatEntities = computeStandardRecordFormFlatEntities({
    now,
    workspaceId,
    rosterStandardApplicationId,
    flatObjectMetadataMaps,
    flatFieldMetadataMaps,
  });

  const flatPageLayoutMapsWithRecordForms =
    standardRecordFormFlatEntities.flatPageLayouts.reduce(
      (flatEntityMaps, flatEntity) =>
        addFlatEntityToFlatEntityMapsOrThrow({ flatEntity, flatEntityMaps }),
      flatPageLayoutMaps,
    );

  const flatPageLayoutTabMapsWithRecordForms =
    standardRecordFormFlatEntities.flatPageLayoutTabs.reduce(
      (flatEntityMaps, flatEntity) =>
        addFlatEntityToFlatEntityMapsOrThrow({ flatEntity, flatEntityMaps }),
      flatPageLayoutTabMaps,
    );

  const flatPageLayoutWidgetMapsWithRecordForms =
    standardRecordFormFlatEntities.flatPageLayoutWidgets.reduce(
      (flatEntityMaps, flatEntity) =>
        addFlatEntityToFlatEntityMapsOrThrow({ flatEntity, flatEntityMaps }),
      flatPageLayoutWidgetMaps,
    );

  const flatNavigationMenuItemMaps = buildStandardFlatNavigationMenuItemMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    dependencyFlatEntityMaps: {
      flatViewMaps,
    },
  });

  const flatCommandMenuItemMaps = buildStandardFlatCommandMenuItemMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    dependencyFlatEntityMaps: {
      flatObjectMetadataMaps,
    },
  });

  const flatTimelineActivityTypeMaps =
    buildStandardFlatTimelineActivityTypeMaps({
      now,
      workspaceId,
      rosterStandardApplicationId,
    });

  const flatAgentChatChannelMaps = buildStandardFlatAgentChatChannelMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
  });

  const flatRelatedRecordPathMaps = buildStandardFlatRelatedRecordPathMaps({
    now,
    workspaceId,
    rosterStandardApplicationId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps: {
      flatFieldMetadataMaps,
    },
  });

  const allFlatEntityMaps: rosterStandardAllFlatEntityMaps = {
    flatViewFieldMaps,
    flatViewFieldGroupMaps,
    flatViewFilterMaps,
    flatViewGroupMaps,
    flatViewMaps,
    flatIndexMaps,
    flatSearchFieldMetadataMaps,
    flatFieldMetadataMaps,
    flatFieldMetadataOptionMaps,
    flatObjectMetadataMaps,
    flatNavigationMenuItemMaps,
    flatPermissionFlagMaps,
    flatRoleMaps,
    flatAgentMaps,
    flatSkillMaps,
    flatPageLayoutMaps: flatPageLayoutMapsWithRecordForms,
    flatPageLayoutTabMaps: flatPageLayoutTabMapsWithRecordForms,
    flatPageLayoutWidgetMaps: flatPageLayoutWidgetMapsWithRecordForms,
    flatCommandMenuItemMaps,
    flatTimelineActivityTypeMaps,
    flatAgentChatChannelMaps,
    flatRelatedRecordPathMaps,
  };

  const idByUniversalIdentifierByMetadataName: IdByUniversalIdentifierByMetadataName =
    {};

  for (const metadataName of roster_STANDARD_ALL_METADATA_NAME) {
    const flatEntityMapsKey = getMetadataFlatEntityMapsKey(metadataName);
    const flatEntityMaps = allFlatEntityMaps[flatEntityMapsKey];

    const idByUniversalIdentifier = Object.fromEntries(
      Object.entries(flatEntityMaps.universalIdentifierById)
        .filter((entry): entry is [string, string] => isDefined(entry[1]))
        .map(([id, universalIdentifier]) => [universalIdentifier, id]),
    );

    if (Object.keys(idByUniversalIdentifier).length > 0) {
      idByUniversalIdentifierByMetadataName[metadataName] =
        idByUniversalIdentifier;
    }
  }

  return {
    allFlatEntityMaps,
    idByUniversalIdentifierByMetadataName,
  };
};
