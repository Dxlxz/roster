/* @license Enterprise */

import { isDefined } from 'roster-shared/utils';

export const isWithinBillingArrangementWindow = ({
  startsAtMs,
  endsAtMs,
  nowMs,
}: {
  startsAtMs: number;
  endsAtMs: number | null;
  nowMs: number;
}): boolean =>
  startsAtMs <= nowMs && (!isDefined(endsAtMs) || endsAtMs > nowMs);
