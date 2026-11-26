import { doNotTranslate } from 'roster-shared/i18n';

// A bare `npx roster` would run the deprecated binary from the app's roster-sdk
export const roster_CLI_CREATE_APP_COMMANDS = doNotTranslate([
  'npx roster@latest app init my-app',
  'cd my-app',
  'yarn install',
  'npx roster@latest app apply --create',
  'npx roster@latest app dev',
]);
