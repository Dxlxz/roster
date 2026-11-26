import { type EnrichedObjectMetadataItem } from '@/object-metadata/types/EnrichedObjectMetadataItem';
import { FieldMetadataType } from 'roster-shared/types';

export const hasObjectMetadataItemPositionField = (
  objectMetadataItem: EnrichedObjectMetadataItem,
) =>
  objectMetadataItem.fields.some(
    (field) => field.type === FieldMetadataType.POSITION,
  );
