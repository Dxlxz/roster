import { type IngestMessageAttachment } from 'roster-sdk/logic-function';

export type WhatsappMessageAttachments = {
  messageExternalId: string;
  attachments: IngestMessageAttachment[];
};
