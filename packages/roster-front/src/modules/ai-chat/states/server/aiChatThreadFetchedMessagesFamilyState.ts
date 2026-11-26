import { type ExtendedUIMessage } from 'roster-shared/ai';

import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';

export const aiChatThreadFetchedMessagesFamilyState = createAtomFamilyState<
  { messages: ExtendedUIMessage[]; queuedMessages: ExtendedUIMessage[] },
  { threadId: string | null }
>({
  key: 'aiChatThreadFetchedMessagesFamilyState',
  defaultValue: { messages: [], queuedMessages: [] },
});
