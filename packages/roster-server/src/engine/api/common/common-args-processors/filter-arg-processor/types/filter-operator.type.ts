import { type FieldReferenceFilterOperator } from 'roster-shared/types';

export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'is'
  | 'like'
  | 'ilike'
  | 'startsWith'
  | 'endsWith'
  | 'containsAny'
  | 'containsIlike'
  | 'isEmptyArray'
  | 'search'
  | FieldReferenceFilterOperator;
