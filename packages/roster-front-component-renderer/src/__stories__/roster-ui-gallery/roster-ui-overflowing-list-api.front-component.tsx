import { defineFrontComponent } from 'roster-sdk/define';

import { rosterUiGalleryCard } from '../shared/front-components/roster-ui-gallery-card';
import { OverflowingListApiExample } from './components/OverflowingListApiExample';

const OverflowingListApi = () => (
  <rosterUiGalleryCard title="Overflowing list API">
    <OverflowingListApiExample />
  </rosterUiGalleryCard>
);

export default defineFrontComponent({
  universalIdentifier: '652141f6-6f4f-4f7b-9333-8c71b2f0b84e',
  name: 'roster-ui-overflowing-list-api',
  description: 'Controlled popup state, native composition and caller events',
  component: OverflowingListApi,
});
