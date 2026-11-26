import {
  convertEmailBodyInputToEmailDocument,
  type EmailBodyInput,
} from 'roster-shared/utils';

export const serializeEmailBody = (body: EmailBodyInput): string =>
  JSON.stringify(convertEmailBodyInputToEmailDocument(body));
