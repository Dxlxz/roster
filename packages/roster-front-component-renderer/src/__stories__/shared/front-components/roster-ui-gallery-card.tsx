import { type ComponentProps } from 'react';
import 'roster-ui/style.css';
import { ThemeProvider } from 'roster-ui/theme';

import { FrontComponentCard } from '@/__stories__/shared/front-components/front-component-card';

type rosterUiGalleryCardProps = ComponentProps<typeof FrontComponentCard>;

export const rosterUiGalleryCard = ({
  title,
  children,
}: rosterUiGalleryCardProps) => (
  <ThemeProvider colorScheme="light">
    <FrontComponentCard title={title}>{children}</FrontComponentCard>
  </ThemeProvider>
);
