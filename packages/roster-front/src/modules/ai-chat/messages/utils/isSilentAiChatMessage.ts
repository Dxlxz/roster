import {
  type ExtendedUIMessage,
  isSilentAgentChatMessageParts,
} from 'roster-shared/ai';

import { AGENT_MESSAGE_ROLE } from '@/ai-chat/messages/constants/AgentMessageRole';

export const isSilentAiChatMessage = (message: ExtendedUIMessage): boolean =>
  message.role === AGENT_MESSAGE_ROLE.ASSISTANT &&
  isSilentAgentChatMessageParts(message.parts);
