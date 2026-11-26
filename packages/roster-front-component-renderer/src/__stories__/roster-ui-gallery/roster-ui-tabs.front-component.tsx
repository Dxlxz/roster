import { defineFrontComponent } from 'roster-sdk/define';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';
import { TabButtonContractsExample } from '@/__stories__/roster-ui-gallery/tab-button-contracts-example';
import { TabsContractsExample } from '@/__stories__/roster-ui-gallery/tabs-contracts-example';

const TabsExample = () => (
  <rosterUiGalleryCard title="Tabs">
    <TabsContractsExample />
    <TabButtonContractsExample />
  </rosterUiGalleryCard>
);

export default defineFrontComponent({
  universalIdentifier: '4d23e9af-7cb3-4e4a-bbca-8e960f840004',
  name: 'roster-ui-tabs',
  description: 'Tabs panels, keyboard selection, and route or action controls',
  component: TabsExample,
});
