import { styled } from '@linaria/react';
import { ListItemButton } from 'roster-ui/components/navigation';
import { IconPlus } from 'roster-ui/icon';
import { OverflowingTextWithTooltip } from 'roster-ui/primitives/typography';
import { themeCssVariables } from 'roster-ui/theme';

const StyledAddItemContainer = styled.div`
  padding: ${themeCssVariables.spacing[1]};
`;

type MultiItemFieldAddButtonProps = {
  label: string;
  onClick: () => void;
};

export const MultiItemFieldAddButton = ({
  label,
  onClick,
}: MultiItemFieldAddButtonProps) => (
  <StyledAddItemContainer>
    <ListItemButton onClick={onClick} startIcon={<IconPlus />}>
      <OverflowingTextWithTooltip text={label} />
    </ListItemButton>
  </StyledAddItemContainer>
);
