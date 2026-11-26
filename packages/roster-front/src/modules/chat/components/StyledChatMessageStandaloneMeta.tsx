import { styled } from '@linaria/react';

import { themeCssVariables } from 'roster-ui/theme';

export const StyledChatMessageStandaloneMeta = styled.div<{
  isRightAligned: boolean;
}>`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  justify-content: ${({ isRightAligned }) =>
    isRightAligned ? 'flex-end' : 'flex-start'};
  margin-top: ${themeCssVariables.spacing[1]};
  width: 100%;
`;
