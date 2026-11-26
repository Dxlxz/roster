import { type ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { isDefined } from 'roster-shared/utils';

export const isApplicationConnectionReconnectNeeded = (
  connection: Partial<Pick<ConnectedAccount, 'authFailedAt' | 'archivedAt'>>,
): boolean =>
  isDefined(connection.authFailedAt) && !isDefined(connection.archivedAt);
