import { registerEnumType } from '@nestjs/graphql';

import { NavigationMenuItemType } from 'roster-shared/types';

registerEnumType(NavigationMenuItemType, {
  name: 'NavigationMenuItemType',
});

export { NavigationMenuItemType };
