import { isDefined } from 'roster-shared/utils';

export const getQueueJobScheduledAt = ({
  timestamp,
  options,
}: {
  timestamp: number;
  options: { scheduledAt?: number; delay?: number };
}): number =>
  isDefined(options.scheduledAt)
    ? options.scheduledAt
    : timestamp + (options.delay ?? 0);
