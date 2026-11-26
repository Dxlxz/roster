import { isObject } from '@sniptt/guards';
import { RELATION_NESTED_QUERY_KEYWORDS } from 'roster-shared/constants';
import { isDefined } from 'roster-shared/utils';

const { CONNECT, CREATE, DISCONNECT } = RELATION_NESTED_QUERY_KEYWORDS;

export const isRelationNestedOperation = (value: unknown): boolean => {
  if (!isObject(value)) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    (CONNECT in obj && isDefined(obj[CONNECT])) ||
    (CREATE in obj && isDefined(obj[CREATE])) ||
    (DISCONNECT in obj && isDefined(obj[DISCONNECT]))
  );
};
