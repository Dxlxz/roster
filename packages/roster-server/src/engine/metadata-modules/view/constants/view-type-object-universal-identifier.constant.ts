import { STANDARD_OBJECTS } from 'roster-shared/metadata';
import { ViewType } from 'roster-shared/types';

export const VIEW_TYPE_OBJECT_UNIVERSAL_IDENTIFIER: Partial<
  Record<ViewType, string>
> = {
  [ViewType.INBOX]: STANDARD_OBJECTS.agentChatThread.universalIdentifier,
};
