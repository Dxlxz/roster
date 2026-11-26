import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/roster-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildMessageChannelMessageAssociationMessageFolderStandardFlatIndexMetadatas =
  ({
    now,
    objectName,
    workspaceId,
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
  }: Omit<
    CreateStandardIndexArgs<'messageChannelMessageAssociationMessageFolder'>,
    'context'
  >): Record<
    AllStandardObjectIndexName<'messageChannelMessageAssociationMessageFolder'>,
    FlatIndexMetadata
  > => ({
    messageChannelMessageAssociationIdIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'messageChannelMessageAssociationIdIndex',
        relatedFieldNames: ['messageChannelMessageAssociation'],
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
    messageFolderIdIndex: createStandardIndexFlatMetadata({
      objectName,
      workspaceId,
      context: {
        indexName: 'messageFolderIdIndex',
        relatedFieldNames: ['messageFolderId'],
      },
      standardObjectMetadataRelatedEntityIds,
      dependencyFlatEntityMaps,
      rosterStandardApplicationId,
      now,
    }),
    messageChannelMessageAssociationIdMessageFolderIdUniqueIndex:
      createStandardIndexFlatMetadata({
        objectName,
        workspaceId,
        context: {
          indexName:
            'messageChannelMessageAssociationIdMessageFolderIdUniqueIndex',
          relatedFieldNames: [
            'messageChannelMessageAssociation',
            'messageFolderId',
          ],
          isUnique: true,
          indexWhereClause: '"deletedAt" IS NULL',
        },
        standardObjectMetadataRelatedEntityIds,
        dependencyFlatEntityMaps,
        rosterStandardApplicationId,
        now,
      }),
  });
