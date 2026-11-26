import { type AiChatAssistantProfile } from 'roster-shared/ai';
import { fastDeepEqual } from 'roster-shared/utils';

export const getSettingsAiAssistantPreset = ({
  value,
  presets,
}: {
  value: AiChatAssistantProfile;
  presets: readonly AiChatAssistantProfile[];
}) => presets.find((preset) => fastDeepEqual(preset, value));
