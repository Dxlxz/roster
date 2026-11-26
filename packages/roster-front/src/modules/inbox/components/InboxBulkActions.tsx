import { useLingui } from '@lingui/react/macro';
import { styled } from '@linaria/react';
import { isDefined } from 'roster-shared/utils';
import { IconCheck, IconZzz } from 'roster-ui/icon';
import { Button } from 'roster-ui/primitives/input';
import { Text } from 'roster-ui/primitives/typography';
import { themeCssVariables } from 'roster-ui/theme';

const StyledActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledCount = styled.span`
  margin-right: ${themeCssVariables.spacing[2]};
`;

type InboxBulkActionsProps = {
  selectedCount: number;
  onDone?: () => void;
  onSnooze?: () => void;
  onClearSelection?: () => void;
  onMarkAllDone?: () => void;
  disabled?: boolean;
};

export const InboxBulkActions = ({
  selectedCount,
  onDone,
  onSnooze,
  onClearSelection,
  onMarkAllDone,
  disabled = false,
}: InboxBulkActionsProps) => {
  const { t } = useLingui();

  if (selectedCount === 0) {
    return isDefined(onMarkAllDone) ? (
      <Button
        size="sm"
        variant="outline"
        startIcon={<IconCheck />}
        disabled={disabled}
        onClick={onMarkAllDone}
      >
        {t`Mark all done`}
      </Button>
    ) : null;
  }

  return (
    <StyledActions role="group" aria-label={t`Selected chats`}>
      <Text render={<StyledCount />} size="md" color="secondary">
        {t`${selectedCount} selected`}
      </Text>
      {isDefined(onSnooze) && (
        <Button
          size="sm"
          variant="outline"
          startIcon={<IconZzz />}
          disabled={disabled}
          onClick={onSnooze}
        >
          {t`Snooze`}
        </Button>
      )}
      {isDefined(onDone) && (
        <Button
          size="sm"
          variant="outline"
          startIcon={<IconCheck />}
          disabled={disabled}
          onClick={onDone}
        >
          {t`Done`}
        </Button>
      )}
      {isDefined(onClearSelection) && (
        <Button
          size="sm"
          variant="ghost"
          disabled={disabled}
          onClick={onClearSelection}
        >
          {t`Clear selection`}
        </Button>
      )}
    </StyledActions>
  );
};
