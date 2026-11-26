import { WebhookSubscriptionChannelType } from 'roster-shared/types';

export type WebhookSubscriptionChannelReference = {
  channelType: WebhookSubscriptionChannelType;
  channelId: string;
  workspaceId: string;
};
