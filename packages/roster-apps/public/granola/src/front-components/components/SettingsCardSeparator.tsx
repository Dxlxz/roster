import styled from '@emotion/styled';
import { Separator } from 'roster-ui/primitives/layout';
import { themeCssVariables } from 'roster-ui/theme';

const StyledSeparatorContainer = styled.div`
  padding-inline: ${() => themeCssVariables.spacing[4]};
`;

export const SettingsCardSeparator = () => (
  <StyledSeparatorContainer>
    <Separator />
  </StyledSeparatorContainer>
);
