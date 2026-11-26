import { type ObjectRecordGroupByDateGranularity } from 'roster-shared/types';

export type SupportedDateGranularityForGapFilling =
  | ObjectRecordGroupByDateGranularity.DAY
  | ObjectRecordGroupByDateGranularity.MONTH
  | ObjectRecordGroupByDateGranularity.QUARTER
  | ObjectRecordGroupByDateGranularity.YEAR
  | ObjectRecordGroupByDateGranularity.WEEK;
