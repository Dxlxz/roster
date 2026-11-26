import { ApiPath } from 'roster-shared/types';

export const buildOAuthDiscoveryClientMetadataUrl = (
  serverUrl: string,
): string =>
  new URL(`/${ApiPath.Auth}/apps/client-metadata.json`, serverUrl).toString();
