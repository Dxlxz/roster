import { createElement, useRef, useState } from 'react';
import { defineFrontComponent } from 'roster-sdk/define';
import { Switch } from 'roster-ui/primitives/input';

import { isDefined } from 'roster-ui/utilities';

import { rosterUiGalleryCard } from '@/__stories__/shared/front-components/roster-ui-gallery-card';

const SwitchExample = () => {
  const [checked, setChecked] = useState(false);

  const rootRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const partRef = useRef<HTMLSpanElement>(null);
  const [composition, setComposition] = useState('pending');

  return (
    <rosterUiGalleryCard title="Switch">
      <Switch.Root
        ref={rootRef}
        inputRef={inputRef}
        render={(props, state) =>
          createElement('span', {
            ...props,
            'data-active': String(state.checked),
          })
        }
        aria-label="Email notifications"
        checked={checked}
        onCheckedChange={(nextChecked, details) => {
          setChecked(nextChecked);
          setComposition(
            `${details.event.type}/${isDefined(rootRef.current) && isDefined(inputRef.current) && isDefined(partRef.current)}`,
          );
        }}
      >
        <Switch.Thumb
          ref={partRef}
          render={(props, state) =>
            createElement('span', {
              ...props,
              'data-active': String(state.checked),
            })
          }
        />
      </Switch.Root>
      <Switch aria-label="Uncontrolled notifications" defaultChecked />
      <Switch aria-label="Disabled notifications" disabled />
      <Switch aria-label="Read-only notifications" defaultChecked readOnly />
      <p role="status">
        Notifications: {checked ? 'enabled' : 'disabled'}; Composition:{' '}
        {composition}
      </p>
    </rosterUiGalleryCard>
  );
};

export default defineFrontComponent({
  universalIdentifier: '4d23e9af-7cb3-4e4a-bbca-8e960f840010',
  name: 'roster-ui-switch',
  description:
    'Switch controlled, uncontrolled and disabled behavior in the sandbox',
  component: SwitchExample,
});
