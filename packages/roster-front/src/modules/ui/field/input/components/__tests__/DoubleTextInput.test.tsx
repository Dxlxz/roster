import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DoubleTextInput } from '@/ui/field/input/components/DoubleTextInput';

it('replaces the full label and URL when clicking into either field', async () => {
  const user = userEvent.setup();
  render(
    <DoubleTextInput
      instanceId="link-text-selection-test"
      firstValue="Eurosport"
      secondValue="https://eurosport.fr"
      firstValuePlaceholder="Link label"
      secondValuePlaceholder="URL"
      selectOnFocus
      onEnter={jest.fn()}
      onEscape={jest.fn()}
      onClickOutside={jest.fn()}
    />,
  );

  const label = screen.getByPlaceholderText('Link label');
  const url = screen.getByPlaceholderText('URL');

  await user.click(label);
  await user.keyboard('roster');
  expect(label).toHaveValue('roster');

  await user.click(label);
  await user.keyboard('roster CRM');
  expect(label).toHaveValue('roster CRM');

  await user.click(url);
  await user.keyboard('https://roster.dev');
  expect(url).toHaveValue('https://roster.dev');

  await user.tab({ shift: true });
  await user.keyboard('Updated label');
  expect(label).toHaveValue('Updated label');
});
