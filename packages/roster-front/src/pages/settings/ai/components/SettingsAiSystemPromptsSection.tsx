import { SettingsCard } from '@/settings/components/SettingsCard';
import { useQuery } from '@apollo/client/react';
import { SettingsPath } from 'roster-shared/types';
import { getSettingsPath, isDefined } from 'roster-shared/utils';
import { Section } from 'roster-ui/components/layout';
import { IconPrompt } from 'roster-ui/icon';
import { useTheme } from 'roster-ui/theme';
import { GetAiSystemPromptPreviewDocument } from '~/generated-metadata/graphql';
import { formatNumber } from '@/localization/utils/formatNumber';
import { useLingui } from '@lingui/react/macro';

export const SettingsAiSystemPromptsSection = () => {
  const { t } = useLingui();
  const theme = useTheme();
  const { data: previewData } = useQuery(GetAiSystemPromptPreviewDocument);

  const systemPromptTokenCount =
    previewData?.getAiSystemPromptPreview.estimatedTokenCount;
  const systemPromptDescription = isDefined(systemPromptTokenCount)
    ? t`Read the system prompts to understand how the AI works (~${formatNumber(
        systemPromptTokenCount,
        { abbreviate: true, decimals: 1 },
      )} tokens)`
    : t`Read the system prompts to understand how the AI works`;

  return (
    <Section.Root>
      <Section.Header
        title={t`System Prompt`}
        description={systemPromptDescription}
      />
      <SettingsCard
        to={getSettingsPath(SettingsPath.AiPrompts)}
        Icon={<IconPrompt size={theme.icon.size.md} />}
        title={t`Read system prompts`}
      />
    </Section.Root>
  );
};
