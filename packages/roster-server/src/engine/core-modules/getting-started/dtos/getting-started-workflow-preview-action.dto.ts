import { Field, ObjectType } from '@nestjs/graphql';

import { WorkflowActionType } from 'roster-shared/workflow';

@ObjectType('GettingStartedWorkflowPreviewAction')
export class GettingStartedWorkflowPreviewActionDTO {
  @Field(() => WorkflowActionType)
  type: WorkflowActionType;

  @Field(() => String)
  title: string;
}
