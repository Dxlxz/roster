import { type RunAgentResult } from 'roster-sdk/logic-function';

export type SlackAssistantAgentRunResult =
  | RunAgentResult
  | { threadId: null; result: null; error: string; success: false };
