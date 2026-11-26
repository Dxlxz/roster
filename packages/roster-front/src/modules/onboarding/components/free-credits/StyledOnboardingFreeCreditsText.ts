import { styled } from '@linaria/react';
import { themeCssVariables } from 'roster-ui/theme';

export const StyledOnboardingFreeCreditsText = styled.span`
  align-items: baseline;
  display: flex;
  gap: ${themeCssVariables.spacing[1]};
  white-space: nowrap;
`;
