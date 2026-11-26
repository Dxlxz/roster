import { type ActorMetadata } from 'roster-shared/types';

export type MessageChannelMessageAssociationFolderAssociation = {
  messageChannelMessageAssociationId: string;
  messageFolderIds: string[];
  createdBy?: ActorMetadata;
};
