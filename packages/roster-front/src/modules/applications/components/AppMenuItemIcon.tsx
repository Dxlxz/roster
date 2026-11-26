import { AppChip } from '@/applications/components/AppChip';
import { ApplicationStackIcon } from '@/applications/components/ApplicationStackIcon';
import { styled } from '@linaria/react';
import { isDefined } from 'roster-shared/utils';
import { type IconComponent } from 'roster-ui/icon';
import { themeCssVariables } from 'roster-ui/theme';

const StyledAppIconContainer = styled.span`
  background: ${themeCssVariables.background.transparent.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  padding: ${themeCssVariables.spacing[1]};
`;

type AppMenuItemIconProps = {
  applicationId?: string | null;
  Icon?: IconComponent;
};

export const AppMenuItemIcon = ({
  applicationId,
  Icon,
}: AppMenuItemIconProps) => (
  <StyledAppIconContainer>
    {isDefined(Icon) ? (
      <ApplicationStackIcon Icon={Icon} applicationId={applicationId} />
    ) : (
      <AppChip applicationId={applicationId} size="md" chipOnly />
    )}
  </StyledAppIconContainer>
);
