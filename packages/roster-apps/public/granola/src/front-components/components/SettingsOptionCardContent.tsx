import styled from '@emotion/styled';
import { isNonEmptyString } from '@sniptt/guards';
import { type ReactNode } from 'react';
import { isDefined } from 'roster-sdk/utils';
import { type IconComponent } from 'roster-ui/icon';
import { Card } from 'roster-ui/primitives/surfaces';
import { OverflowingTextWithTooltip } from 'roster-ui/primitives/typography';
import { themeCssVariables } from 'roster-ui/theme';

import {
  StyledSettingsCardDescription,
  StyledSettingsCardIcon,
  StyledSettingsCardRow,
  StyledSettingsCardTextContainer,
  StyledSettingsCardTitle,
} from 'src/front-components/components/SettingsCardContentBase';
import { SettingsOptionIconCustomizer } from 'src/front-components/components/SettingsOptionIconCustomizer';

const StyledTrailingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: ${() => themeCssVariables.spacing[2]};
  margin-left: auto;
`;

type SettingsOptionCardContentProps = {
  Icon?: IconComponent;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
};

export const SettingsOptionCardContent = ({
  Icon,
  title,
  description,
  children,
}: SettingsOptionCardContentProps) => (
  <Card.Content>
    <StyledSettingsCardRow>
      {isDefined(Icon) && (
        <StyledSettingsCardIcon>
          <SettingsOptionIconCustomizer Icon={Icon} />
        </StyledSettingsCardIcon>
      )}
      <StyledSettingsCardTextContainer>
        <StyledSettingsCardTitle>{title}</StyledSettingsCardTitle>
        {isNonEmptyString(description) && (
          <StyledSettingsCardDescription>
            <OverflowingTextWithTooltip text={description} />
          </StyledSettingsCardDescription>
        )}
      </StyledSettingsCardTextContainer>
      <StyledTrailingContainer>{children}</StyledTrailingContainer>
    </StyledSettingsCardRow>
  </Card.Content>
);
