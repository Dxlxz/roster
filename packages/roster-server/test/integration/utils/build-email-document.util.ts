import {
  convertEmailBodyInputToEmailDocument,
  type EmailDocument,
} from 'roster-shared/utils';

export const buildEmailDocument = (text: string): EmailDocument =>
  convertEmailBodyInputToEmailDocument({ type: 'text', text });
