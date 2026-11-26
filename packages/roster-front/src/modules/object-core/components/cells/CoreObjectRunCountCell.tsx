import { isDefined } from 'roster-shared/utils';
import { Text } from 'roster-ui/primitives/typography';

import { useNumberFormat } from '@/localization/hooks/useNumberFormat';

type CoreObjectRunCountCellProps = {
  runCount: number | null;
  isLowerBound: boolean;
};

export const CoreObjectRunCountCell = ({
  runCount,
  isLowerBound,
}: CoreObjectRunCountCellProps) => {
  const { formatNumber } = useNumberFormat();

  if (!isDefined(runCount)) {
    return null;
  }

  return (
    <Text truncate>
      {formatNumber(runCount)}
      {isLowerBound && '+'}
    </Text>
  );
};
