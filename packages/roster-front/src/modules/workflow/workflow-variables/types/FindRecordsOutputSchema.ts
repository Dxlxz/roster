import { type RecordNode } from '@/workflow/workflow-variables/types/RecordNode';
import type { Leaf } from 'roster-shared/workflow';

export type FindRecordsOutputSchema = {
  first: RecordNode;
  all: Leaf | undefined;
  totalCount: Leaf;
};
