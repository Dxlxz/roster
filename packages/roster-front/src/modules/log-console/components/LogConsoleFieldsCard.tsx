import { styled } from '@linaria/react';
import { type ReactNode } from 'react';
import { Card } from 'roster-ui/primitives/surfaces';
import { themeCssVariables } from 'roster-ui/theme';

const StyledFieldsCard = styled(Card.Root)`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[2]};
`;

type LogConsoleFieldsCardProps = {
  children: ReactNode;
};

export const LogConsoleFieldsCard = ({
  children,
}: LogConsoleFieldsCardProps) => (
  <StyledFieldsCard backgroundColor={themeCssVariables.background.secondary}>
    {children}
  </StyledFieldsCard>
);
