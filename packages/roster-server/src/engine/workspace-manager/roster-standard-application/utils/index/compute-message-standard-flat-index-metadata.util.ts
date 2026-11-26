import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/roster-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildMessageStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  rosterStandardApplicationId,
}: Omit<CreateStandardIndexArgs<'message'>, 'context'>): Record<
  AllStandardObjectIndexName<'message'>,
  FlatIndexMetadata
> => ({
  messageThreadIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'messageThreadIdIndex',
      relatedFieldNames: ['messageThread'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  messageCampaignIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'messageCampaignIdIndex',
      relatedFieldNames: ['messageCampaign'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  headerMessageIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'headerMessageIdIndex',
      relatedFieldNames: ['headerMessageId'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
});
