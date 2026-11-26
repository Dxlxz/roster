import { type ConditionalAvailabilityFilterVariable } from '@/conditional-availability/types/ConditionalAvailabilityFilterVariable';
import { isNonEmptyString } from '@sniptt/guards';
import { CONDITIONAL_EVALUATION_DEVICES } from 'roster-shared/conditional-evaluation';
import { assertUnreachable } from 'roster-shared/utils';

export const isConditionalAvailabilityFilterValueValid = ({
  variable,
  value,
}: {
  variable: ConditionalAvailabilityFilterVariable;
  value: string;
}): boolean => {
  switch (variable) {
    case 'currentRole':
    case 'currentWorkspaceMember':
      return isNonEmptyString(value);
    case 'device':
      return CONDITIONAL_EVALUATION_DEVICES.some((device) => device === value);
    default:
      return assertUnreachable(variable);
  }
};
