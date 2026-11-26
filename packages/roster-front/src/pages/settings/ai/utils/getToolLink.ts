import { type SettingsAgentToolItem } from '~/pages/settings/ai/types/SettingsAgentToolItem';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';

export const getToolLink = (tool: SettingsAgentToolItem): string =>
  getSettingsPath(SettingsPath.AiToolDetail, {
    toolIdentifier: tool.identifier,
  });
