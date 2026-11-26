import { CSV_INJECTION_PREVENTION_ZWJ } from 'roster-shared/constants';

export const containsCSVProtectionZWJ = (value: string): boolean => {
  return (
    typeof value === 'string' && value.includes(CSV_INJECTION_PREVENTION_ZWJ)
  );
};
