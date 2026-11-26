import { type FieldMetadataItemOption } from '@/object-metadata/types/FieldMetadataItem';
import { isDefined } from 'roster-shared/utils';
import { type ThemeColor } from 'roster-ui/theme';

export const getSelectOptionColorForValue = ({
  rawValue,
  selectOptions,
}: {
  rawValue: string | null | undefined;
  selectOptions: FieldMetadataItemOption[] | null | undefined;
}): ThemeColor | undefined => {
  if (!isDefined(selectOptions) || !isDefined(rawValue)) {
    return undefined;
  }

  const option = selectOptions.find((opt) => opt.value === rawValue);

  return option?.color;
};
