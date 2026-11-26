import { type AllMetadataName } from 'roster-shared/metadata';

import { type MetadataValidationRelatedUniversalFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/metadata-related-types.type';
import { type StandardObjectMetadataRelatedEntityIds } from 'src/engine/workspace-manager/roster-standard-application/utils/get-standard-object-metadata-related-entity-ids.util';
import { type ComputerosterStandardApplicationAllFlatEntityMapsArgs } from 'src/engine/workspace-manager/roster-standard-application/utils/roster-standard-application-all-flat-entity-maps.constant';

export type StandardBuilderArgs<T extends AllMetadataName> = {
  standardObjectMetadataRelatedEntityIds: StandardObjectMetadataRelatedEntityIds;
  dependencyFlatEntityMaps: MetadataValidationRelatedUniversalFlatEntityMaps<T>;
} & ComputerosterStandardApplicationAllFlatEntityMapsArgs;
