import { isDefined } from 'roster-shared/utils';

import { FRONT_COMPONENT_LISTENERS_KEY } from 'roster-sdk/front-component-renderer';

import { toGlobalScopeRecord } from '@/polyfills/utils/toGlobalScopeRecord';

export const getFrontComponentExecutionContextListeners = (): Set<
  () => void
> => {
  const globalScope = toGlobalScopeRecord(globalThis);

  if (!isDefined(globalScope[FRONT_COMPONENT_LISTENERS_KEY])) {
    globalScope[FRONT_COMPONENT_LISTENERS_KEY] = new Set<() => void>();
  }

  return globalScope[FRONT_COMPONENT_LISTENERS_KEY] as Set<() => void>;
};
