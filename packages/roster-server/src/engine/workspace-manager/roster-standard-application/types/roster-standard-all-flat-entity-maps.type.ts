import { type AllFlatEntityMaps } from 'src/engine/metadata-modules/flat-entity/types/all-flat-entity-maps.type';
import { type MetadataToFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/types/metadata-to-flat-entity-maps-key.type';
import { type roster_STANDARD_ALL_METADATA_NAME } from 'src/engine/workspace-manager/roster-standard-application/constants/roster-standard-all-metadata-name.constant';

export type rosterStandardAllFlatEntityMaps = Pick<
  AllFlatEntityMaps,
  MetadataToFlatEntityMapsKey<
    (typeof roster_STANDARD_ALL_METADATA_NAME)[number]
  >
>;
