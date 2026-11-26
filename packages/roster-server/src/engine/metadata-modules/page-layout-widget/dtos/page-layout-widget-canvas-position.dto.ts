import { Field, ObjectType } from '@nestjs/graphql';

import { IsIn, IsNotEmpty } from 'class-validator';
import { PageLayoutTabLayoutMode } from 'roster-shared/types';

@ObjectType('PageLayoutWidgetCanvasPosition')
export class PageLayoutWidgetCanvasPositionDTO {
  @Field(() => PageLayoutTabLayoutMode)
  @IsIn([PageLayoutTabLayoutMode.CANVAS])
  @IsNotEmpty()
  layoutMode: PageLayoutTabLayoutMode.CANVAS;
}
