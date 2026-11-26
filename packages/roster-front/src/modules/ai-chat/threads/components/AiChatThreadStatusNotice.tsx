import { useAiChatInstanceOrThrow } from '@/ai-chat/hooks/useAiChatInstanceOrThrow';
import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { isDefined } from 'roster-shared/utils';
import { IconBellOff, IconCheck, IconZzz } from 'roster-ui/icon';
import { themeCssVariables, useTheme } from 'roster-ui/theme';

import { useFormatAiChatThreadDate } from '@/ai-chat/threads/hooks/useFormatAiChatThreadDate';
import { aiChatThreadInboxStatusFamilySelector } from '@/ai-chat/threads/states/selectors/aiChatThreadInboxStatusFamilySelector';
import { useAtomFamilySelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomFamilySelectorValue';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { FeatureFlagKey } from '~/generated-metadata/graphql';

const StyledNotice = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
  justify-content: center;
`;

export const AiChatThreadStatusNotice = () => {
  const { t } = useLingui();
  const theme = useTheme();
  const { formatAiChatThreadDateTime } = useFormatAiChatThreadDate();
  const { threadId } = useAiChatInstanceOrThrow();
  const { event } = useAtomFamilySelectorValue(
    aiChatThreadInboxStatusFamilySelector,
    threadId,
  );

  const isAiChatInboxEnabled = useIsFeatureEnabled(
    FeatureFlagKey.IS_AI_CHAT_INBOX_ENABLED,
  );

  if (!isAiChatInboxEnabled || !isDefined(event)) {
    return null;
  }

  const eventTime = formatAiChatThreadDateTime(new Date(event.at));
  const notice = {
    SNOOZED: { Icon: IconZzz, text: t`Snoozed until ${eventTime}` },
    SNOOZE_ENDED: { Icon: IconZzz, text: t`Snooze ended ${eventTime}` },
    DONE: { Icon: IconCheck, text: t`Marked as done ${eventTime}` },
    UNSUBSCRIBED: {
      Icon: IconBellOff,
      text: t`Unsubscribed ${eventTime}. New messages stay out of your inbox unless you're mentioned.`,
    },
  }[event.type];

  return (
    <StyledNotice>
      <notice.Icon size={theme.icon.size.sm} />
      {notice.text}
    </StyledNotice>
  );
};
