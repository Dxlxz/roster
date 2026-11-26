import { type FrontComponentExecutionContext } from 'roster-sdk/front-component';

import { FRONT_COMPONENT_CONTEXT_KEY } from 'roster-sdk/front-component-renderer';

import { toGlobalScopeRecord } from '@/polyfills/utils/toGlobalScopeRecord';

export const getFrontComponentExecutionContext = ():
  | FrontComponentExecutionContext
  | undefined =>
  toGlobalScopeRecord(globalThis)[FRONT_COMPONENT_CONTEXT_KEY] as
    | FrontComponentExecutionContext
    | undefined;
