import { isDefined } from 'roster-shared/utils';
import { type FullNameMetadata } from 'roster-shared/types';

export const computeDisplayName = (
  name: FullNameMetadata | null | undefined,
) => {
  if (!name) {
    return '';
  }

  return Object.values(name).filter(isDefined).join(' ');
};
