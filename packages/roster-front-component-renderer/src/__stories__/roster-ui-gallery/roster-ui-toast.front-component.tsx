import { useState } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import { Toast } from 'roster-ui/components/feedback';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';

const ToastExample = () => {
  const [closed, setClosed] = useState(false);
  const [action, setAction] = useState('none');

  return (
    <rosterUiGalleryCard title="Toast">
      {!closed && (
        <Toast
          status="success"
          progress={100}
          description="Your changes are available to the team"
          onClose={() => setClosed(true)}
          closeLabel="Dismiss notification"
          onCancel={() => setAction('cancelled')}
          action={<button onClick={() => setAction('undone')}>Undo</button>}
        >
          Account saved
        </Toast>
      )}
      <p>
        Notification: {closed ? 'closed' : 'visible'}; Action: {action}
      </p>
    </rosterUiGalleryCard>
  );
};

export default defineFrontComponent({
  universalIdentifier: '4d23e9af-7cb3-4e4a-bbca-8e960f840008',
  name: 'roster-ui-toast',
  description: 'Toast rendering, actions and dismissal in the sandbox',
  component: ToastExample,
});
