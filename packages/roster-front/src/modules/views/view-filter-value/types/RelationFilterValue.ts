import { type jsonRelationFilterValueSchema } from 'roster-shared/utils';
import { type z } from 'zod';

export type RelationFilterValue = z.infer<typeof jsonRelationFilterValueSchema>;
