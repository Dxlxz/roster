import { Field, ObjectType } from '@nestjs/graphql';
import { type IframeMediaPermission } from 'roster-shared/types';

@ObjectType('IframeMediaPermission')
export class IframeMediaPermissionDTO implements IframeMediaPermission {
  @Field()
  origin: string;

  @Field()
  microphone: boolean;

  @Field()
  camera: boolean;
}
