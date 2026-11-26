import { type RunAgentInput } from 'roster-sdk/logic-function';

export type SlackAssistantAgentMessage = NonNullable<
  RunAgentInput['messages']
>[number];
