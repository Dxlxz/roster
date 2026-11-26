import { matchPath } from 'react-router-dom';
import { AppPath } from 'roster-shared/types';
import { isDefined, isValidUuid } from 'roster-shared/utils';

import { AI_CHAT_NEW_THREAD_PATH_SEGMENT } from '@/ai-chat/constants/AiChatNewThreadPathSegment';

export const getAiChatPageThreadId = ({
  pathname,
  newAiChatThreadId,
}: {
  pathname: string;
  newAiChatThreadId: string;
}): string | null => {
  const aiChatPageMatch = matchPath(AppPath.AiChat, pathname);
  const urlThreadId = (
    aiChatPageMatch ?? matchPath(AppPath.AiChatInbox, pathname)
  )?.params.threadId;

  if (isDefined(urlThreadId) && isValidUuid(urlThreadId)) {
    return urlThreadId;
  }

  if (isDefined(aiChatPageMatch)) {
    return newAiChatThreadId;
  }

  return urlThreadId === AI_CHAT_NEW_THREAD_PATH_SEGMENT
    ? newAiChatThreadId
    : null;
};
