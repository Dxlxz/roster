import { RATING_VALUES } from 'roster-shared/constants';
import { type FieldRatingValue } from 'roster-shared/types';

export const isFieldRatingValue = (
  fieldValue: unknown,
): fieldValue is FieldRatingValue =>
  RATING_VALUES.includes(fieldValue as NonNullable<FieldRatingValue>);
