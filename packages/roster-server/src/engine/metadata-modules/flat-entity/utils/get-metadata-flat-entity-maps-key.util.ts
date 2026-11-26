import { capitalize } from 'roster-shared/utils';
import { type AllMetadataName } from 'roster-shared/metadata';

import { type MetadataToFlatEntityMapsKey } from 'src/engine/metadata-modules/flat-entity/types/metadata-to-flat-entity-maps-key.type';

export const getMetadataFlatEntityMapsKey = <T extends AllMetadataName>(
  metadataName: T,
): MetadataToFlatEntityMapsKey<T> =>
  `flat${capitalize(metadataName)}Maps` as MetadataToFlatEntityMapsKey<T>;
