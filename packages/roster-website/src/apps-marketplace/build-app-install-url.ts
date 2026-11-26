const DEFAULT_roster_APP_BASE_URL = 'https://app.roster.dev';

export const buildAppInstallUrl = (universalIdentifier: string): string => {
  const baseUrl =
    process.env.roster_APP_BASE_URL ?? DEFAULT_roster_APP_BASE_URL;

  const returnToPath = `/settings/applications/available/${universalIdentifier}`;

  return `${baseUrl.replace(/\/$/, '')}/?returnToPath=${encodeURIComponent(returnToPath)}`;
};
