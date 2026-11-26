import { type EmailAttachment } from 'roster-shared/types';
import { type EmailRecipients } from 'roster-shared/workflow';

export type WorkflowSendEmailActionInput = {
  connectedAccountId: string;
  fromHandle?: string;
  recipients: EmailRecipients;
  subject?: string;
  body?: string;
  files?: EmailAttachment[];
  inReplyTo?: string;
};
