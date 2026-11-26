import { getDomainFromEmail } from 'roster-shared/utils';

export const buildCampaignThreadExternalId = ({
  messageId,
  fromAddress,
}: {
  messageId: string;
  fromAddress: string;
}): string => `<${messageId}@${getDomainFromEmail(fromAddress)}>`;
