import { CONDITIONAL_EVALUATION_DEVICES } from 'roster-shared/conditional-evaluation';

export const WIDGET_VISIBILITY_DEVICES = [
  'ANY_DEVICE',
  ...CONDITIONAL_EVALUATION_DEVICES,
] as const;
