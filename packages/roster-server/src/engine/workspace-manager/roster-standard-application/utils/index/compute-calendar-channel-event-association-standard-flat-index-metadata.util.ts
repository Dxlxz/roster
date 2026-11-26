import { type FlatIndexMetadata } from 'src/engine/metadata-modules/flat-index-metadata/types/flat-index-metadata.type';
import { type AllStandardObjectIndexName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-index-name.type';
import {
  type CreateStandardIndexArgs,
  createStandardIndexFlatMetadata,
} from 'src/engine/workspace-manager/roster-standard-application/utils/index/create-standard-index-flat-metadata.util';

export const buildCalendarChannelEventAssociationStandardFlatIndexMetadatas = ({
  now,
  objectName,
  workspaceId,
  standardObjectMetadataRelatedEntityIds,
  dependencyFlatEntityMaps,
  rosterStandardApplicationId,
}: Omit<
  CreateStandardIndexArgs<'calendarChannelEventAssociation'>,
  'context'
>): Record<
  AllStandardObjectIndexName<'calendarChannelEventAssociation'>,
  FlatIndexMetadata
> => ({
  calendarChannelIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'calendarChannelIdIndex',
      relatedFieldNames: ['calendarChannelId'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  calendarEventIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'calendarEventIdIndex',
      relatedFieldNames: ['calendarEvent'],
    },
    standardObjectMetadataRelatedEntityIds,
    dependencyFlatEntityMaps,
    rosterStandardApplicationId,
    now,
  }),
  eventExternalIdIndex: createStandardIndexFlatMetadata({
    objectName,
    workspaceId,
    context: {
      indexName: 'eventExternalIdIndex',
      relatedFieldNames: ['eventExternalId'],
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
