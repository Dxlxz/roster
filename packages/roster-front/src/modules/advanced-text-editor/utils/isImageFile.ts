import { EMAIL_IMAGE_MIME_TYPES } from 'roster-shared/constants';

export const isImageFile = (file: File) =>
  EMAIL_IMAGE_MIME_TYPES.some((mimeType) => mimeType === file.type);
