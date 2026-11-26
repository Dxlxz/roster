import { registerEnumType } from '@nestjs/graphql';

import { EventLogTable } from 'roster-shared/types';

export const registerEventLogTableEnum = () => {
  registerEnumType(EventLogTable, {
    name: 'EventLogTable',
  });
};
