import { isNonEmptyString } from '@sniptt/guards';

import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const readIsPersonEnrichmentEnabled = (
  rosterConfigService: rosterConfigService,
): boolean =>
  rosterConfigService.get('IS_ONBOARDING_AI_CHAT_ENABLED') &&
  isNonEmptyString(rosterConfigService.get('PEOPLE_DATA_LABS_API_KEY'));
