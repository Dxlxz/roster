import styled from '@emotion/styled';
import { type IconComponent } from 'roster-ui/icon';
import { THEME_COMMON, themeCssVariables } from 'roster-ui/theme';

const StyledEmptyState = styled.div`
  align-items: center;
  color: ${() => themeCssVariables.font.color.tertiary};
  display: flex;
  flex-direction: column;
  font-size: ${() => themeCssVariables.font.size.sm};
  gap: ${() => themeCssVariables.spacing[2]};
  padding: ${() => themeCssVariables.spacing[8]};
  text-align: center;
`;

type GranolaFolderEmptyStateProps = {
  Icon: IconComponent;
  message: string;
};

export const GranolaFolderEmptyState = ({
  Icon,
  message,
}: GranolaFolderEmptyStateProps) => (
  <StyledEmptyState>
    <Icon size={THEME_COMMON.icon.size.md} />
    <div>{message}</div>
  </StyledEmptyState>
);
