import 'roster-ui/style.css';
import 'roster-ui/theme-dark.css';
import 'roster-ui/theme-light.css';

import styled from '@emotion/styled';
import { themeCssVariables } from 'roster-ui/theme';

import { TelegramConnectSection } from 'src/front-components/components/TelegramConnectSection';
import { TelegramUserLinksList } from 'src/front-components/components/TelegramUserLinksList';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${() => themeCssVariables.spacing[8]};
  width: 100%;
`;

export const TelegramSettings = () => (
  <StyledContainer>
    <TelegramConnectSection />
    <TelegramUserLinksList />
  </StyledContainer>
);
