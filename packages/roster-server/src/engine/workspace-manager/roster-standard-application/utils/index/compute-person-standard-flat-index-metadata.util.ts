import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { IndexType } from 'roster-shared/types';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/roster-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildPersonStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  rosterStandardApplicationId,
}: Omit<CreateStandardIndexArgs<'person'>, 'context'>): Record<
  AllStandardObjectIndexName<'person'>,
  FlatIndexMetadata
> => ({
  companyIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'companyIdIndex',
      relatedFieldNames: ['company'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  emailsUniqueIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'emailsUniqueIndex',
      relatedFieldNames: ['emails'],
      isUnique: true,
      indexWhereClause: '"deletedAt" IS NULL',
      hasDeterministicUniversalIdentifier: true,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  searchVectorGinIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'searchVectorGinIndex',
      relatedFieldNames: ['searchVector'],
      indexType: IndexType.GIN,
      hasDeterministicUniversalIdentifier: true,
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
});
