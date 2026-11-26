import styled from '@emotion/styled';
import { themeCssVariables } from 'roster-ui/theme';

export const StyledSettingsHint = styled.p`
  color: ${() => themeCssVariables.font.color.tertiary};
  font-size: ${() => themeCssVariables.font.size.sm};
  margin: 0;
`;
