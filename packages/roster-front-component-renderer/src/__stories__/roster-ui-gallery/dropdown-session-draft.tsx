import { useState } from 'react';
import { Input } from 'roster-ui/primitives/input';

export const DropdownSessionDraft = () => {
  const [note, setNote] = useState('');

  return (
    <Input aria-label="Assignment note" value={note} onValueChange={setNote} />
  );
};
