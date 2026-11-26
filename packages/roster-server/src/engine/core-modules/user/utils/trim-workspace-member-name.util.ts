import { isString } from '@sniptt/guards';
import { isPlainObject } from 'roster-shared/utils';

export const trimWorkspaceMemberName = <TName>(name: TName): TName => {
  if (!isPlainObject(name)) {
    return name;
  }

  return {
    ...name,
    ...(isString(name.firstName) ? { firstName: name.firstName.trim() } : {}),
    ...(isString(name.lastName) ? { lastName: name.lastName.trim() } : {}),
  } as TName;
};
