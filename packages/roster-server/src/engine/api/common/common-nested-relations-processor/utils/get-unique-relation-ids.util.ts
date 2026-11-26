import { type ObjectRecord } from 'roster-shared/types';
import { isDefined } from 'roster-shared/utils';

type GetUniqueRelationIdsArgs = {
  records: ObjectRecord[];
  idField: string;
};

// Nullish join columns match nothing; keeping them issues a wasted `IN (NULL)` query per unset relation.
export const getUniqueRelationIds = ({
  records,
  idField,
}: GetUniqueRelationIdsArgs): string[] => [
  ...new Set(records.map((record) => record[idField]).filter(isDefined)),
];
