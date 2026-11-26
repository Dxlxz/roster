import { useState } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import { openCommandConfirmationModal } from 'roster-sdk/front-component';
import { Button } from 'roster-ui/primitives/input';
import { Text } from 'roster-ui/primitives/typography';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';

const DialogExample = () => {
  const [status, setStatus] = useState('idle');

  const handleRequestConfirmation = async () => {
    setStatus('requested');
    const result = await openCommandConfirmationModal({
      title: 'Update account',
      subtitle: 'Confirm the account changes.',
      confirmButtonText: 'Update',
    });
    setStatus(result);
  };

  return (
    <rosterUiGalleryCard title="Host dialog">
      <Text>Front components request dialogs through the SDK host API.</Text>
      <Button
        onClick={handleRequestConfirmation}
        disabled={status === 'requested'}
      >
        Update account
      </Button>
      <Text role="status">Confirmation: {status}</Text>
    </rosterUiGalleryCard>
  );
};

export default defineFrontComponent({
  universalIdentifier: 'test-20ui0-0000-0000-0000-000000000111',
  name: 'roster-ui-dialog',
  description: 'Requests a host-owned confirmation through the SDK dialog API',
  component: DialogExample,
});
