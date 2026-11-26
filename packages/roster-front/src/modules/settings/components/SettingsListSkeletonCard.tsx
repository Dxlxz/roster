import { styled } from '@linaria/react';
import { Card } from 'roster-ui/primitives/surfaces';
import { themeCssVariables } from 'roster-ui/theme';

const StyledSkeletonCard = styled.div`
  height: 40px;
`;

export const SettingsListSkeletonCard = () => (
  <Card.Root
    backgroundColor={themeCssVariables.background.secondary}
    render={<StyledSkeletonCard />}
  />
);
