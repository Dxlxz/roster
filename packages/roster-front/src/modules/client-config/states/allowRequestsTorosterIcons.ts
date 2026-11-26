import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

export const allowRequestsTorosterIconsState = createAtomState<boolean>({
  key: 'allowRequestsTorosterIcons',
  defaultValue: true,
});
