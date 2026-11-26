import { roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS } from 'roster-shared/application';

// These apps run on every imported record or subscribed event, so metering
// each invocation would drain the free-tier allowance.
export const MARKETPLACE_BILLING_EXEMPT_UNIVERSAL_IDENTIFIERS: string[] = [
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.CALL_RECORDER,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.LAST_CONTACT,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.SLACK,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.FATHOM,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.GRANOLA,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.TEAMS,
  roster_PUBLIC_APP_UNIVERSAL_IDENTIFIERS.MEET,
];
