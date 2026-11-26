import { useCallback } from 'react';
import { ConnectedAccountProvider, SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';

import { useTriggerApisOAuth } from '@/settings/accounts/hooks/useTriggerApiOAuth';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';

export const useTriggerProviderReconnect = () => {
  const { triggerApisOAuth } = useTriggerApisOAuth();
  const navigate = useNavigateSettings();

  const triggerProviderReconnect = useCallback(
    async (
      provider: ConnectedAccountProvider,
      accountId?: string,
      options?: Parameters<typeof triggerApisOAuth>[1],
    ) => {
      if (provider === ConnectedAccountProvider.IMAP_SMTP_CALDAV) {
        if (!accountId) {
          navigate(SettingsPath.AppPreferencesNewImapSmtpCaldavConnection);
          return;
        }

        navigate(SettingsPath.AppPreferencesEditImapSmtpCaldavConnection, {
          connectedAccountId: accountId,
        });
        return;
      }

      await triggerApisOAuth(provider, {
        redirectLocation: getSettingsPath(SettingsPath.AppPreferences),
        ...options,
      });
    },
    [triggerApisOAuth, navigate],
  );

  return { triggerProviderReconnect };
};
