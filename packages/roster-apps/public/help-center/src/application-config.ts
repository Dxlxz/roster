import { defineApplication } from 'roster-sdk/define';

import {
  APP_DESCRIPTION,
  APP_DISPLAY_NAME,
  APPLICATION_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineApplication({
  universalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  displayName: APP_DISPLAY_NAME,
  description: APP_DESCRIPTION,
  logo: 'public/logo.svg',
  author: 'roster',
  category: 'Productivity',
  websiteUrl:
    'https://github.com/Dxlxz/roster/tree/main/packages/roster-apps/public/help-center',
  termsUrl: 'https://www.roster.dev/terms',
  emailSupport: 'contact@roster.dev',
  issueReportUrl: 'https://github.com/Dxlxz/roster/issues',
});
