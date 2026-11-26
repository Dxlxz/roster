import { DEFAULT_SELECT_OPTION_COLOR } from 'roster-shared/constants';
import { type FieldMetadataComplexOption } from 'roster-shared/types';
import {
  extractAndSanitizeObjectStringFields,
  isDefined,
} from 'roster-shared/utils';

type SelectOptionWithOptionalColor<TColor extends string> = Omit<
  FieldMetadataComplexOption,
  'color'
> & { color?: TColor | null };

export const sanitizeSelectOptions = <TColor extends string>(
  options: SelectOptionWithOptionalColor<TColor>[],
) =>
  options.map((option) => {
    const { color, description } = extractAndSanitizeObjectStringFields(
      option,
      ['color', 'description'],
    );

    const sanitizedOption = {
      ...option,
      color: color ?? DEFAULT_SELECT_OPTION_COLOR,
    };

    if (!isDefined(description)) {
      return sanitizedOption;
    }

    const sanitizedDescription = description === '' ? null : description;

    return { ...sanitizedOption, description: sanitizedDescription };
  });
