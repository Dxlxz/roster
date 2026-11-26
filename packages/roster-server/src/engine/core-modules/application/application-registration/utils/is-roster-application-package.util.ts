import { isNonEmptyString } from '@sniptt/guards';

const roster_APPLICATION_PACKAGE_SCOPE = '@rosterhq/';

export const isrosterApplicationPackage = (
  sourcePackage: string | null | undefined,
): boolean =>
  isNonEmptyString(sourcePackage) &&
  sourcePackage.startsWith(roster_APPLICATION_PACKAGE_SCOPE);
