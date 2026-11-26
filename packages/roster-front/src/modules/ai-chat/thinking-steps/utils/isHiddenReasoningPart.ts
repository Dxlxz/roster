import { type ExtendedUIMessagePart } from 'roster-shared/ai';

export const isHiddenReasoningPart = (part: ExtendedUIMessagePart): boolean =>
  part.type === 'reasoning' &&
  part.state !== 'streaming' &&
  part.text.trim().length === 0;
