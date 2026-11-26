import { Field, Int, ObjectType } from '@nestjs/graphql';

import { type AiRunUsage } from 'roster-shared/application';

@ObjectType('AiRunUsage')
export class AiRunUsageDTO implements AiRunUsage {
  @Field(() => Int)
  inputTokens: number;

  @Field(() => Int)
  outputTokens: number;
}
