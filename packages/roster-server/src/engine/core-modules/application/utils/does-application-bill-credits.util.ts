import { type ApplicationBilling } from 'roster-shared/application';
import { isDefined } from 'roster-shared/utils';

export const doesApplicationBillCredits = (
  billing: ApplicationBilling | undefined,
): boolean => Object.values(billing?.operations ?? {}).some(isDefined);
