import { ObjectRecordGroupByDateGranularity } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

export const isTimeRangeDateGranularity = (
  granularity?: ObjectRecordGroupByDateGranularity | null,
): boolean => {
  if (!isDefined(granularity)) {
    return false;
  }
  return [
    ObjectRecordGroupByDateGranularity.WEEK,
    ObjectRecordGroupByDateGranularity.MONTH,
    ObjectRecordGroupByDateGranularity.QUARTER,
    ObjectRecordGroupByDateGranularity.YEAR,
  ].includes(granularity);
};
