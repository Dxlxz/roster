import { type FailedMetadataValidationError } from 'roster-shared/metadata';

export type ValidationErrorDetail = Pick<
  FailedMetadataValidationError,
  'message' | 'userFriendlyMessage'
> & {
  metadataName: string;
  entityLabel?: string;
  code?: FailedMetadataValidationError['code'];
};
