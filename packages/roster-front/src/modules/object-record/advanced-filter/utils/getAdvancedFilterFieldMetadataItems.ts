import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { FieldMetadataType } from 'roster-shared/types';

export const getAdvancedFilterFieldMetadataItems = <
  TFieldMetadataItem extends Pick<FieldMetadataItem, 'type'>,
>({
  filterableFieldMetadataItems,
  shouldHideRelationFields,
}: {
  filterableFieldMetadataItems: TFieldMetadataItem[];
  shouldHideRelationFields: boolean | undefined;
}): TFieldMetadataItem[] => {
  if (!shouldHideRelationFields) {
    return filterableFieldMetadataItems;
  }

  return filterableFieldMetadataItems.filter(
    ({ type }) => type !== FieldMetadataType.RELATION,
  );
};
