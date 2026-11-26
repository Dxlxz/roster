import { doNotTranslate } from 'roster-shared/i18n';

import { REACT_APP_SERVER_BASE_URL } from '~/config';

export const roster_CLI_LOGIN_COMMAND = doNotTranslate(
  `npx roster@latest auth login --url ${REACT_APP_SERVER_BASE_URL} --use`,
);
