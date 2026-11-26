import { useState } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import { IconButton } from 'roster-ui/components/input';
import { IconPlus, IconSearch } from 'roster-ui/icon';
import 'roster-ui/style.css';
import { ThemeProvider } from 'roster-ui/theme';

const IconButtonElevatedExample = () => {
  const [activations, setActivations] = useState(0);
  const handleClick = () => setActivations((count) => count + 1);

  return (
    <ThemeProvider colorScheme="light">
      <IconButton
        elevated
        size="sm"
        aria-label="Add widget"
        onClick={handleClick}
      >
        <IconPlus />
      </IconButton>
      <IconButton
        elevated
        size="sm"
        aria-label="Disabled widget action"
        disabled
        onClick={handleClick}
      >
        <IconPlus />
      </IconButton>
      <IconButton
        elevated
        size="sm"
        aria-label="Saving widget"
        loading
        onClick={handleClick}
      >
        <IconPlus />
      </IconButton>
      <IconButton
        aria-label="Browse widgets"
        href="https://roster.dev"
        target="_blank"
        rel="noreferrer"
        size="md"
      >
        <IconSearch />
      </IconButton>
      <IconButton aria-label="Elevated action" elevated>
        <IconSearch />
      </IconButton>
      <output aria-label="Widget activations">{activations}</output>
    </ThemeProvider>
  );
};

export default defineFrontComponent({
  universalIdentifier: 'b0f2a49f-a4a9-4f80-8d2d-5fb1d3223607',
  name: 'roster-ui-icon-button-elevated',
  description:
    'Elevated icon button appearance and interactions in the sandbox',
  component: IconButtonElevatedExample,
});
