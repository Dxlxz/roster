import { styled } from '@linaria/react';
import { Separator } from 'roster-ui/primitives/layout';
import { themeCssVariables } from 'roster-ui/theme';

const StyledBubbleMenuSeparatorContainer = styled.div`
  display: flex;
  padding: ${themeCssVariables.spacing[1]} 0;
`;

export const BubbleMenuSeparator = () => (
  <StyledBubbleMenuSeparatorContainer>
    <Separator orientation="vertical" />
  </StyledBubbleMenuSeparatorContainer>
);
