import { type ExtendedUIMessage } from 'roster-shared/ai';
import { type Nullable } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

import { aiChatMessageAuthorLookupSelector } from '@/ai-chat/messages/states/selectors/aiChatMessageAuthorLookupSelector';
import { getAiChatMessageAuthor } from '@/ai-chat/messages/utils/getAiChatMessageAuthor';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';

export const useAiChatMessageAuthor = (
  message: Nullable<Pick<ExtendedUIMessage, 'id' | 'role' | 'metadata'>>,
) => {
  const aiChatMessageAuthorLookup = useAtomStateValue(
    aiChatMessageAuthorLookupSelector,
  );

  return isDefined(message)
    ? getAiChatMessageAuthor({
        message,
        authorLookup: aiChatMessageAuthorLookup,
      })
    : null;
};
