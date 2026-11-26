import { ButtonContractsExample } from '@/__stories__/roster-ui-gallery/button-contracts-example';
import { defineFrontComponent } from 'roster-sdk/define';
import 'roster-ui/style.css';
import { ThemeProvider } from 'roster-ui/theme';

const ButtonContracts = () => (
  <ThemeProvider colorScheme="light">
    <ButtonContractsExample />
  </ThemeProvider>
);

export default defineFrontComponent({
  universalIdentifier: '1c8d8d4a-a5d5-49f9-806b-69d5ad573ba7',
  name: 'roster-ui-button-contracts',
  description:
    'Button native rendering and appearance contracts in the sandbox',
  component: ButtonContracts,
});
