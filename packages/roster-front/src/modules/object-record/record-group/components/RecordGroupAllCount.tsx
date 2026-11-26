import { useGetRecordIndexTotalCount } from '@/views/hooks/internal/useGetRecordIndexTotalCount';
import { isDefined } from 'roster-shared/utils';

export const RecordGroupAllCount = () => {
  const { totalCount } = useGetRecordIndexTotalCount();

  return isDefined(totalCount) ? totalCount : '-';
};
