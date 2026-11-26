import { type AiDataPolicy } from 'roster-shared/ai';

export const NO_AI_DATA_POLICY: AiDataPolicy = {
  requiredDataResidencyRegion: null,
  isZeroDataRetentionRequired: false,
  isProductImprovementDataSharingEnabled: true,
};
