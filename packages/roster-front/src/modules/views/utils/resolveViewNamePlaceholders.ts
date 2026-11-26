import {
  buildObjectMetadataLabelPlaceholderValues,
  interpolateMessagePlaceholders,
} from 'roster-shared/i18n';
import { isDefined } from 'roster-shared/utils';
import { type FlatObjectMetadataItem } from '@/metadata-store/types/FlatObjectMetadataItem';

export const resolveViewNamePlaceholders = (
  viewName: string | undefined,
  objectMetadataItem: FlatObjectMetadataItem | undefined,
): string => {
  if (!isDefined(viewName) || !isDefined(objectMetadataItem)) {
    return viewName ?? '';
  }

  return interpolateMessagePlaceholders(
    viewName,
    buildObjectMetadataLabelPlaceholderValues(objectMetadataItem),
  );
};
