import {
  type IconComponent,
  IconAt,
  IconCheck,
  IconCircleDashed,
  IconHandClick,
  IconUserCircle,
  IconUserOff,
  IconUsers,
  IconZzz,
} from 'roster-ui/icon';
import { type AgentChatThreadPresetFilter } from 'roster-shared/ai';

export const INBOX_THREAD_PRESET_FILTER_ICONS: Record<
  AgentChatThreadPresetFilter,
  IconComponent
> = {
  active: IconCircleDashed,
  needsInput: IconHandClick,
  mentions: IconAt,
  assigned: IconUserCircle,
  assignedToAnyone: IconUsers,
  unassigned: IconUserOff,
  snoozed: IconZzz,
  done: IconCheck,
};
