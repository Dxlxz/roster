import { type ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { ConnectedAccountProvider } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

export const isConnectedAccountEligibleForProviderReconnect = (
  account: ConnectedAccount,
): boolean =>
  (account.provider === ConnectedAccountProvider.GOOGLE ||
    account.provider === ConnectedAccountProvider.MICROSOFT) &&
  (isDefined(account.authFailedAt) || isDefined(account.archivedAt));
