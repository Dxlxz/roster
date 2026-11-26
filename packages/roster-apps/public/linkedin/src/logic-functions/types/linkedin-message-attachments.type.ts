import { type IngestMessageAttachment } from 'roster-sdk/logic-function';

export type LinkedinMessageAttachments = {
  messageExternalId: string;
  attachments: IngestMessageAttachment[];
};
