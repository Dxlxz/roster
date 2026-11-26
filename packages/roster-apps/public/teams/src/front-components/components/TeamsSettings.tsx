import 'roster-ui/style.css';
import 'roster-ui/theme-dark.css';
import 'roster-ui/theme-light.css';

import styled from '@emotion/styled';
import { themeCssVariables } from 'roster-ui/theme';

import { ChatSettings } from 'src/features/chat/front-components/ChatSettings';
import { TranscriptSettings } from 'src/features/transcripts/front-components/TranscriptSettings';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${() => themeCssVariables.spacing[6]};
  width: 100%;
`;

export const TeamsSettings = () => (
  <StyledContainer>
    <ChatSettings />
    <TranscriptSettings />
  </StyledContainer>
);
