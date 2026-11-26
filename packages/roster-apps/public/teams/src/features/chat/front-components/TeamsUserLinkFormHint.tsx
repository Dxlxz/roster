import styled from '@emotion/styled';
import { themeCssVariables } from 'roster-ui/theme';

export const TeamsUserLinkFormHint = styled.span`
  color: ${() => themeCssVariables.font.color.tertiary};
  font-family: ${() => themeCssVariables.font.family};
  font-size: ${() => themeCssVariables.font.size.xs};
`;
