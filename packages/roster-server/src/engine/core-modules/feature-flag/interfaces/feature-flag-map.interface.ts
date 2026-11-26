import { type FeatureFlagKey } from 'roster-shared/types';

export type FeatureFlagMap = Record<`${FeatureFlagKey}`, boolean>;
