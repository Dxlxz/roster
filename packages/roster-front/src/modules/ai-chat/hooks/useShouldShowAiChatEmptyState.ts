import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { useAiChatInstanceOrThrow } from '@/ai-chat/hooks/useAiChatInstanceOrThrow';
import { isDefined } from 'roster-shared/utils';

import { useIsOnNewAiChatSlot } from '@/ai-chat/hooks/useIsOnNewAiChatSlot';
import { aiChatThreadReplyErrorFamilyState } from '@/ai-chat/states/reply/aiChatThreadReplyErrorFamilyState';
import { aiChatThreadReplyStatusFamilyState } from '@/ai-chat/states/reply/aiChatThreadReplyStatusFamilyState';
import { aiChatHasMessageFamilySelector } from '@/ai-chat/states/selectors/aiChatHasMessageFamilySelector';
import { useIsMobile } from 'roster-ui/utilities';
import { useAtomFamilyStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilyStateValue';

export const useShouldShowAiChatEmptyState = () => {
  const { threadId } = useAiChatInstanceOrThrow();
  const aiChatThreadReplyError = useAtomFamilyStateValue(
    aiChatThreadReplyErrorFamilyState,
    {
      threadId,
    },
  );
  const aiChatThreadReplyStatus = useAtomFamilyStateValue(
    aiChatThreadReplyStatusFamilyState,
    { threadId },
  );

  const aiChatHasMessage = useAtomFamilySelectorValue(
    aiChatHasMessageFamilySelector,
    threadId,
  );

  const isMobile = useIsMobile();

  const isOnNewAiChatSlot = useIsOnNewAiChatSlot();

  return (
    isOnNewAiChatSlot &&
    !isMobile &&
    !aiChatHasMessage &&
    !isDefined(aiChatThreadReplyError) &&
    aiChatThreadReplyStatus !== 'awaiting-first-chunk' &&
    aiChatThreadReplyStatus !== 'streaming'
  );
};
