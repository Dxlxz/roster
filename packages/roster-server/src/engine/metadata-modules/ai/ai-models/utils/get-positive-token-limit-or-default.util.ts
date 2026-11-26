import { isDefined } from 'roster-shared/utils';

export const getPositiveTokenLimitOrDefault = (
  limit: number | undefined,
  fallback: number,
): number => (isDefined(limit) && limit > 0 ? limit : fallback);
