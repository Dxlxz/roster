import { type getCreditAvailability } from 'roster-sdk/billing';

// roster-sdk/billing does not export its verdict types.
export type CreditUnavailableReason = Extract<
  Awaited<ReturnType<typeof getCreditAvailability>>,
  { hasAvailableCredits: false }
>['reason'];
