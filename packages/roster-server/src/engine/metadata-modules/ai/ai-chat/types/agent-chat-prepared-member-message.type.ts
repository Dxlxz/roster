import { type ExtendedUIMessagePart } from 'roster-shared/ai';

export type AgentChatPreparedMemberMessage = {
  id?: string;
  text: string;
  parts: ExtendedUIMessagePart[];
};
