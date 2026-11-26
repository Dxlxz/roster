import { type ConfigVariables } from 'src/engine/core-modules/roster-config/config-variables';

export type PlanUsageLimitDefaults = Partial<
  Record<keyof ConfigVariables, number | null>
>;
