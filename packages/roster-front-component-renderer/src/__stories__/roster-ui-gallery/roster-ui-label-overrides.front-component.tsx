import { useState } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import { Callout } from 'roster-ui/components/feedback';
import { ListItem } from 'roster-ui/primitives/navigation';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';

const LabelOverrides = () => {
  const [isSuppliedVisible, setIsSuppliedVisible] = useState(true);
  return (
    <rosterUiGalleryCard title="Label overrides">
      <Callout status="info" title="Default notice" onDismiss={() => {}} />
      {isSuppliedVisible && (
        <Callout
          status="info"
          title="Supplied notice"
          onDismiss={() => setIsSuppliedVisible(false)}
          closeLabel="Dismiss notice"
        />
      )}
      <ListItem shortcut={[['G'], ['D']]}>Default shortcut</ListItem>
      <ListItem shortcut={[['G'], ['S']]} shortcutJoinLabel="followed by">
        Supplied shortcut
      </ListItem>
      <ListItem shortcut={[['G'], ['L']]} shortcutJoinLabel="next">
        Sequential shortcut
      </ListItem>
    </rosterUiGalleryCard>
  );
};

export default defineFrontComponent({
  universalIdentifier: '5fbc0790-28ac-4d43-9e43-ea246f0da4da',
  name: 'roster-ui-label-overrides',
  description:
    'Caller-owned text and accessible names in both renderer runtimes',
  component: LabelOverrides,
});
