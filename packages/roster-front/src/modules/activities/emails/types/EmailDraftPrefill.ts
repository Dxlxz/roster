import { type EmailRecipients } from 'roster-shared/workflow';

export type EmailDraftPrefill = EmailRecipients & {
  messageId: string;
  subject: string;
  body: string;
};
