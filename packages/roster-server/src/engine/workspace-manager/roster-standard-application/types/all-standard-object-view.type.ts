import { type STANDARD_OBJECTS } from 'roster-shared/metadata';

import { type AllStandardObjectName } from 'src/engine/workspace-manager/roster-standard-application/types/all-standard-object-name.type';

export type AllStandardObjectView<T extends AllStandardObjectName> =
  (typeof STANDARD_OBJECTS)[T] extends { views: infer View } ? View : never;
