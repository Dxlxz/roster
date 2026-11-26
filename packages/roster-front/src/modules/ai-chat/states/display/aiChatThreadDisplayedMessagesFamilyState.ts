import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';
import { type ExtendedUIMessage } from 'roster-shared/ai';

export const aiChatThreadDisplayedMessagesFamilyState = createAtomFamilyState<
  ExtendedUIMessage[],
  { threadId: string | null }
>({
  key: 'aiChatThreadDisplayedMessagesFamilyState',
  defaultValue: [],
});
