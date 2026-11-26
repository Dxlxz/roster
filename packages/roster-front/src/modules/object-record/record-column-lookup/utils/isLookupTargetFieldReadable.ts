import { type RecordFieldLookupTarget } from '@/object-record/record-column-lookup/types/RecordFieldLookupTarget';
import { findById } from 'roster-shared/utils';

export const isLookupTargetFieldReadable = ({
  relationObjectMetadataItem,
  lookupTargetFieldMetadataItem,
}: Pick<
  RecordFieldLookupTarget,
  'relationObjectMetadataItem' | 'lookupTargetFieldMetadataItem'
>): boolean =>
  relationObjectMetadataItem.readableFields.some(
    findById(lookupTargetFieldMetadataItem.id),
  );
