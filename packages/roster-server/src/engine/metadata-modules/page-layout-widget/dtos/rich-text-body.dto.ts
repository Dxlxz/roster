import { Field, ObjectType } from '@nestjs/graphql';

import { IsOptional, IsString } from 'class-validator';
import { RICH_TEXT_BLOCKNOTE_DEPRECATION_REASON } from 'roster-shared/constants';
import { type RichTextMetadata } from 'roster-shared/types';

@ObjectType('RichTextBody')
export class RichTextBodyDTO implements RichTextMetadata {
  @Field(() => String, {
    nullable: true,
    deprecationReason: RICH_TEXT_BLOCKNOTE_DEPRECATION_REASON,
  })
  @IsString()
  @IsOptional()
  blocknote?: string | null;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  markdown?: string | null;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tiptap?: string | null;
}
