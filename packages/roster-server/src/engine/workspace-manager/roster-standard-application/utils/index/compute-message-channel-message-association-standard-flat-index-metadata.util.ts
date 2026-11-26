import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/roster-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildMessageChannelMessageAssociationStandardFlatIndexMetadatas =
  ({
    now,
    objectName,
    workspaceId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
  }: Omit<
    CreateStandardIndexArgs<'messageChannelMessageAssociation'>,
    'context'
  >): Record<
    AllStandardObjectIndexName<'messageChannelMessageAssociation'>,
    FlatIndexMetadata
  > => ({
    messageChannelIdIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'messageChannelIdIndex',
        relatedFieldNames: ['messageChannelId'],
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
    messageIdIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'messageIdIndex',
        relatedFieldNames: ['message'],
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
    messageChannelIdMessageIdUniqueIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'messageChannelIdMessageIdUniqueIndex',
        relatedFieldNames: ['messageChannelId', 'message'],
        isUnique: true,
        indexWhereClause: '"deletedAt" IS NULL',
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
    accountOwnerIdIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'accountOwnerIdIndex',
        relatedFieldNames: ['accountOwner'],
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
  });
