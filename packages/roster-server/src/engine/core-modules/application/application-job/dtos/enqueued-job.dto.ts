import { Field, Int, ObjectType } from '@nestjs/graphql';

import { type EnqueuedJob } from 'roster-shared/application';

@ObjectType('EnqueuedJob')
export class EnqueuedJobDTO implements EnqueuedJob {
  @Field()
  jobId: string;

  @Field(() => Int)
  sizeBytes: number;

  @Field(() => Number)
  scheduledAt: number;
}
