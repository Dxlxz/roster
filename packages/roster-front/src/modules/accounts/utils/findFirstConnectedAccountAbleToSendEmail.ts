import {
  type ConnectedAccountEmailFields,
  EmailOperation,
} from 'roster-shared/types';
import { canConnectedAccountPerformEmailOperation } from 'roster-shared/utils';

export const findFirstConnectedAccountAbleToSendEmail = <
  TConnectedAccount extends ConnectedAccountEmailFields,
>(
  connectedAccounts: TConnectedAccount[],
): TConnectedAccount | null =>
  connectedAccounts.find((connectedAccount) =>
    canConnectedAccountPerformEmailOperation({
      connectedAccount,
      operation: EmailOperation.SEND,
    }),
  ) ?? null;
