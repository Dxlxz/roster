import { isDefined } from 'roster-shared/utils';

import { type RemoteEntry } from '@/config/types/config-file.type';
import { type RemoteCredentials } from '@/config/types/remote-credentials.type';

export const replaceRemoteCredentials = ({
  remote,
  credentials,
}: {
  remote: RemoteEntry;
  credentials: RemoteCredentials;
}): RemoteEntry => {
  const {
    apiKey: _apiKey,
    rosterCLIAccessToken: _accessToken,
    rosterCLIRefreshToken: _refreshToken,
    rosterCLIRegistrationClientId: _clientId,
    ...preservedFields
  } = remote;

  return {
    ...preservedFields,
    ...(credentials.kind === 'apiKey'
      ? { apiKey: credentials.apiKey }
      : {
          rosterCLIAccessToken: credentials.accessToken,
          rosterCLIRegistrationClientId: credentials.clientId,
          ...(isDefined(credentials.refreshToken)
            ? { rosterCLIRefreshToken: credentials.refreshToken }
            : {}),
        }),
  };
};
