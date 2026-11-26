import { type ExtendedUIMessage } from 'roster-shared/ai';

import { isChatMessageTimeSharedWithNext } from '@/chat/utils/isChatMessageTimeSharedWithNext';

type TimedAiChatMessage = Pick<ExtendedUIMessage, 'metadata'>;

export const isAiChatMessageTimeSharedWithNext = ({
  message,
  nextMessage,
}: {
  message: TimedAiChatMessage;
  nextMessage: TimedAiChatMessage;
}): boolean =>
  isChatMessageTimeSharedWithNext({
    sentAt: message.metadata?.createdAt,
    nextSentAt: nextMessage.metadata?.createdAt,
  });
