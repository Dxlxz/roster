import { type ViewFieldRelationScopeSort } from 'roster-shared/types';

export type RelationScopeFieldReference = Pick<
  ViewFieldRelationScopeSort,
  'fieldMetadataId' | 'relationTargetFieldMetadataId'
>;
