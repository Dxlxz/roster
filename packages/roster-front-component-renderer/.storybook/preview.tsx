import { type Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'roster-ui/theme';

import 'roster-ui/theme-light.css';
import 'roster-ui/theme-dark.css';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <ThemeProvider colorScheme="light">
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
