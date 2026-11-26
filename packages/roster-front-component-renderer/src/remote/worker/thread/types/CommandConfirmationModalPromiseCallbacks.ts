import { type CommandConfirmationModalResult } from 'roster-sdk/front-component';

export type CommandConfirmationModalPromiseCallbacks = {
  resolve: (result: CommandConfirmationModalResult) => void;
  reject: (error: Error) => void;
};
