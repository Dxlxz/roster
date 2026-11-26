import { type AiChatAssistantProfile } from 'roster-shared/ai';

export type SettingsAiAssistantSectionProps = {
  value: AiChatAssistantProfile;
  onChange: (value: Partial<AiChatAssistantProfile>) => void;
  disabled?: boolean;
  isSaving?: boolean;
  errorMessage?: string;
};
