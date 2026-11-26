import { type RelativeDateFilterUnit } from 'roster-shared/utils';
import { doNotTranslate } from 'roster-shared/i18n';

export const RELATIVE_DATE_UNITS: RelativeDateFilterUnit[] = [
  doNotTranslate('DAY'),
  'WEEK',
  'MONTH',
  'QUARTER',
  'YEAR',
];
