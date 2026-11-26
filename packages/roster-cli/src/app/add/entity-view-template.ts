import { randomUUID } from 'node:crypto';

import { VIEW_TYPE_DEFAULT_ICONS } from 'roster-shared/constants';
import { ViewType } from 'roster-shared/types';

import { printTypescriptValue } from '@/app/pull/print-typescript-value';

export const getViewBaseFile = ({
  name,
  universalIdentifier = randomUUID(),
  objectUniversalIdentifier,
  fieldUniversalIdentifiers,
  type = ViewType.TABLE,
}: {
  name: string;
  universalIdentifier?: string;
  objectUniversalIdentifier: string;
  fieldUniversalIdentifiers: string[];
  type?: ViewType;
}) => `import { defineView } from 'roster-sdk/define';

export default defineView(${printTypescriptValue({
  value: {
    universalIdentifier,
    name,
    objectUniversalIdentifier,
    type,
    icon: VIEW_TYPE_DEFAULT_ICONS[type],
    position: 0,
    fields: fieldUniversalIdentifiers.map(
      (fieldMetadataUniversalIdentifier, position) => ({
        universalIdentifier: randomUUID(),
        fieldMetadataUniversalIdentifier,
        position,
        isVisible: true,
        size: 200,
      }),
    ),
  },
})});
`;
