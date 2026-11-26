import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'roster-shared/utils';

import { readBookCallStepMinEmployeeCount } from 'src/engine/core-modules/onboarding/utils/read-book-call-step-min-employee-count.util';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

// Enrichment is only worth running when something consumes it and the provider
// can actually answer, so callers can skip the round-trip entirely.
export const readIsCompanyEnrichmentEnabled = (
  rosterConfigService: rosterConfigService,
): boolean => {
  const hasConsumer =
    rosterConfigService.get('IS_ONBOARDING_AI_CHAT_ENABLED') ||
    isDefined(readBookCallStepMinEmployeeCount(rosterConfigService));

  return (
    hasConsumer &&
    isNonEmptyString(rosterConfigService.get('PEOPLE_DATA_LABS_API_KEY'))
  );
};
