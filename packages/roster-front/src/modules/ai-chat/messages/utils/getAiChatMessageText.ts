import { type ExtendedUIMessage } from 'roster-shared/ai';

export const getAiChatMessageText = (
  message: Pick<ExtendedUIMessage, 'parts'>,
): string => message.parts.find((part) => part.type === 'text')?.text ?? '';
