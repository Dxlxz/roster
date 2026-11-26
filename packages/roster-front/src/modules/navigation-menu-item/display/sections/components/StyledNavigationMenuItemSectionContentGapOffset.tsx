import { styled } from '@linaria/react';
import { themeCssVariables } from 'roster-ui/theme';

export const StyledNavigationMenuItemSectionContentGapOffset = styled.div`
  margin-top: calc(-1 * ${themeCssVariables.betweenSiblingsGap});
`;
