import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { isDefined } from 'roster-shared/utils';
import { ReactionButton } from 'roster-ui/components/input';
import { Tooltip } from 'roster-ui/primitives/surfaces';
import { themeCssVariables } from 'roster-ui/theme';

import { type ChatMessageReaction } from '@/activities/emails/types/ChatMessageReaction';
import { TooltipDelay } from '@/ui/layout/tooltip/constants/TooltipDelay';
import { formatDisplayList } from '~/utils/format/formatDisplayList';

const StyledReactions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledReaction = styled.span`
  display: inline-flex;
`;

type ChatThreadMessageReactionsProps = {
  reactions: ChatMessageReaction[];
  onReactionToggle?: (emoji: string) => void;
};

export const ChatThreadMessageReactions = ({
  reactions,
  onReactionToggle,
}: ChatThreadMessageReactionsProps) => {
  const { t } = useLingui();

  return (
    <StyledReactions>
      {reactions.map(({ emoji, count, isOwn, reactorNames }) => {
        const reactors = formatDisplayList(reactorNames);

        return (
          <Tooltip
            key={emoji}
            content={reactors}
            delay={TooltipDelay.shortDelay}
          >
            <StyledReaction>
              <ReactionButton
                emoji={emoji}
                count={count}
                pressed={isOwn}
                aria-label={t`${emoji} by ${reactors}`}
                disabled={!isDefined(onReactionToggle)}
                onPressedChange={() => onReactionToggle?.(emoji)}
              />
            </StyledReaction>
          </Tooltip>
        );
      })}
    </StyledReactions>
  );
};
