import { type OAuthClientMetadata } from '@modelcontextprotocol/client';

import { buildAppOAuthCallbackUrl } from 'src/engine/core-modules/application/connection-provider/utils/build-callback-url.util';
import { roster_CURRENT_VERSION } from 'src/engine/core-modules/upgrade/constants/roster-current-version.constant';

const roster_WEBSITE_URL = 'https://roster.dev';
const roster_LOGO_PATH = '/images/icons/ios/192.png';

export const buildOAuthDiscoveryClientMetadata = ({
  serverUrl,
  frontendUrl,
}: {
  serverUrl: string;
  frontendUrl: string;
}): OAuthClientMetadata => ({
  client_name: 'roster',
  client_uri: roster_WEBSITE_URL,
  logo_uri: new URL(roster_LOGO_PATH, frontendUrl).toString(),
  software_id: 'roster',
  software_version: roster_CURRENT_VERSION,
  redirect_uris: [buildAppOAuthCallbackUrl(serverUrl)],
  grant_types: ['authorization_code', 'refresh_token'],
  response_types: ['code'],
  token_endpoint_auth_method: 'none',
});
