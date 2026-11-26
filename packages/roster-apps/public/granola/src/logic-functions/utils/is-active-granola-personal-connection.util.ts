import { isNonEmptyString } from '@sniptt/guards';
import { type AppConnection } from 'roster-sdk/logic-function';
import { isDefined } from 'roster-sdk/utils';

export const isActiveGranolaPersonalConnection = <
  TConnection extends Pick<
    AppConnection,
    'workspaceMemberId' | 'authFailedAt' | 'accessToken'
  >,
>(
  connection: TConnection,
): connection is TConnection & {
  workspaceMemberId: string;
  accessToken: string;
} =>
  isDefined(connection.workspaceMemberId) &&
  !isDefined(connection.authFailedAt) &&
  isNonEmptyString(connection.accessToken);
