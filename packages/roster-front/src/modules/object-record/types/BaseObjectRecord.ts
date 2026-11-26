import { type ObjectRecord as SharedObjectRecord } from 'roster-shared/types';

export type BaseObjectRecord = SharedObjectRecord & {
  __typename: string;
};
