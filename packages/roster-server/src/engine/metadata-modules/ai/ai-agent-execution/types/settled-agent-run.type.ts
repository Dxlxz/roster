import { type RunAgentResult } from 'roster-shared/application';

export type SettledAgentRun = Pick<
  RunAgentResult,
  'status' | 'result' | 'error'
>;
