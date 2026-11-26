import { registerEnumType } from '@nestjs/graphql';

import { UpgradeHealthEnum } from 'roster-shared/types';

export { UpgradeHealthEnum };

registerEnumType(UpgradeHealthEnum, {
  name: 'UpgradeHealth',
});
