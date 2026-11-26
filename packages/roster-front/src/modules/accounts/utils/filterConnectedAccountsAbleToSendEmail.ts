import {
  type ConnectedAccountEmailFields,
  EmailOperation,
} from 'roster-shared/types';
import { canConnectedAccountPerformEmailOperation } from 'roster-shared/utils';

export const filterConnectedAccountsAbleToSendEmail = <
  TConnectedAccount extends ConnectedAccountEmailFields,
>(
  connectedAccounts: TConnectedAccount[],
): TConnectedAccount[] =>
  connectedAccounts.filter((connectedAccount) =>
    canConnectedAccountPerformEmailOperation({
      connectedAccount,
      operation: EmailOperation.SEND,
    }),
  );
