import { LightButton } from 'roster-ui/components/input';
import { IconChevronDown } from 'roster-ui/icon';
import { useLingui } from '@lingui/react/macro';

type FieldWidgetShowMoreButtonProps = {
  remainingCount: number;
  onClick: () => void;
};

export const FieldWidgetShowMoreButton = ({
  remainingCount,
  onClick,
}: FieldWidgetShowMoreButtonProps) => {
  const { t } = useLingui();
  return (
    <LightButton
      emphasis="subtle"
      size="sm"
      startIcon={<IconChevronDown />}
      data-testid="field-widget-show-more-button"
      onClick={onClick}
    >
      {t`More (${remainingCount})`}
    </LightButton>
  );
};
