import { defineFrontComponent } from 'roster-sdk/define';
import { Text } from 'roster-ui/primitives/typography';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';

const DisplayHelpers = () => (
  <rosterUiGalleryCard title="Text and display helpers">
    <Text render={<p />} truncate style={{ width: 160 }}>
      A long account name that should truncate
    </Text>
    <Text lineClamp={2} style={{ width: 160 }}>
      A longer account description that spans several lines and should be
      clamped to two lines.
    </Text>
    <Text truncate style={{ maxWidth: 120 }}>
      An overflowing reference number
    </Text>
    <Text truncate>1234.5</Text>
    <Text truncate>{'{"active":true}'}</Text>
    <Text truncate>Account description</Text>
  </rosterUiGalleryCard>
);

export default defineFrontComponent({
  universalIdentifier: '4d23e9af-7cb3-4e4a-bbca-8e960f840002',
  name: 'roster-ui-display-helpers',
  description: 'Text and migrated display helpers in the sandbox',
  component: DisplayHelpers,
});
