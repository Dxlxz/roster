import { type AppConnection } from 'roster-sdk/logic-function';
import { isDefined } from 'roster-sdk/utils';

export const isWorkingTeamsWorkspaceConnection = (
  connection: Pick<AppConnection, 'scope' | 'authFailedAt'>,
): boolean =>
  connection.scope === 'WORKSPACE' && !isDefined(connection.authFailedAt);
