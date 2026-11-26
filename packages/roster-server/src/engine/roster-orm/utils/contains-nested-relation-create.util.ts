import { RELATION_NESTED_QUERY_KEYWORDS } from 'roster-shared/constants';
import { isDefined } from 'roster-shared/utils';

export const containsNestedRelationCreate = (
  records: Record<string, unknown>[],
  relationFieldNames: ReadonlySet<string>,
): boolean =>
  records.some((record) =>
    Object.entries(record).some(
      ([fieldName, value]) =>
        relationFieldNames.has(fieldName) &&
        isDefined(value) &&
        typeof value === 'object' &&
        isDefined(
          (value as Record<string, unknown>)[
            RELATION_NESTED_QUERY_KEYWORDS.CREATE
          ],
        ),
    ),
  );
