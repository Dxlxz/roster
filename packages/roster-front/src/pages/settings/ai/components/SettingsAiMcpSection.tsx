import { SETTINGS_AI_TABS } from '@/settings/ai/constants/SettingsAiTabs';
import { SettingsCard } from '@/settings/components/SettingsCard';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath } from 'roster-shared/utils';
import { Section } from 'roster-ui/components/layout';
import { IconSparkles } from 'roster-ui/icon';
import { useTheme } from 'roster-ui/theme';
import { useLingui } from '@lingui/react/macro';

export const SettingsAiMcpSection = () => {
  const { t } = useLingui();
  const theme = useTheme();

  return (
    <Section.Root>
      <Section.Header
        title={t`MCP Server`}
        description={t`Connect AI assistants like Claude or Cursor to your workspace via the Model Context Protocol`}
      />
      <SettingsCard
        Icon={<IconSparkles size={theme.icon.size.xl} />}
        title={t`Set up MCP`}
        to={getSettingsPath(
          SettingsPath.AI,
          undefined,
          undefined,
          SETTINGS_AI_TABS.TABS_IDS.MCP,
        )}
      />
    </Section.Root>
  );
};
