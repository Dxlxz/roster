import { type ExtendedUIMessagePart } from 'roster-shared/ai';

export const buildToolPart = ({
  toolName,
  toolCallId,
  input,
  output,
}: {
  toolName: string;
  toolCallId: string;
  input: unknown;
  output: unknown;
}): ExtendedUIMessagePart => ({
  type: `tool-${toolName}`,
  toolCallId,
  state: 'output-available',
  input,
  output,
});
