import { type ProposedToolCall } from 'roster-shared/ai';

export type ProposedToolCallResolution =
  | { proposal: ProposedToolCall }
  | { error: string };
