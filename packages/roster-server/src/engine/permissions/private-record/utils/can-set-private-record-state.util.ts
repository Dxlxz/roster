/* @license Enterprise */

import { FeatureFlagKey } from 'roster-shared/types';

export const canSetPrivateRecordState = ({
  featureFlagsMap,
}: {
  featureFlagsMap: Partial<Record<FeatureFlagKey, boolean>>;
}): boolean =>
  featureFlagsMap[FeatureFlagKey.IS_PRIVATE_RECORDS_ENABLED] ?? false;
