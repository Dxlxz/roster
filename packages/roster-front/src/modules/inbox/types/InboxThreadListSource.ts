import { type AgentChatThreadPresetFilter } from 'roster-shared/ai';

import { type InboxChannelView } from '@/inbox/types/InboxChannelView';

export type InboxThreadListSource =
  | { type: 'recent' }
  | { type: 'presetFilter'; presetFilter: AgentChatThreadPresetFilter }
  | { type: 'channel'; channelView: InboxChannelView };
