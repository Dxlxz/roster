import { defineFrontComponent } from 'roster-sdk/define';
import { ListItem } from 'roster-ui/primitives/navigation';
import { ThemeProvider } from 'roster-ui/theme';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';
import { ListItemButtonExample } from '@/__stories__/roster-ui-gallery/list-item-button-example';
import { ListItemOwnerExample } from '@/__stories__/roster-ui-gallery/list-item-owner-example';
import { ListItemPopupOwnerExample } from '@/__stories__/roster-ui-gallery/list-item-popup-owner-example';
import { ListItemPresentationExample } from '@/__stories__/roster-ui-gallery/list-item-presentation-example';

const OVERFLOW_ROW_STYLE = { width: 160 };

const ListItemExample = () => (
  <rosterUiGalleryCard title="ListItem">
    <ListItemButtonExample />
    <ListItemOwnerExample />
    <ListItemPresentationExample />
    <ListItemPopupOwnerExample />
    <ThemeProvider colorScheme="light" applyToRoot={false}>
      <ListItem style={OVERFLOW_ROW_STYLE}>
        A long workspace preference that overflows its row
      </ListItem>
    </ThemeProvider>
  </rosterUiGalleryCard>
);

export default defineFrontComponent({
  universalIdentifier: '4d23e9af-7cb3-4e4a-bbca-8e960f840003',
  name: 'roster-ui-list-item',
  description:
    'ListItemButton actions and ListItem rows with explicit native owners',
  component: ListItemExample,
});
