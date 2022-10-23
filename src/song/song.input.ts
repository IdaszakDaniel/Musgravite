import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsDateString } from 'class-validator';

@InputType()
export class CreateSongInput {
  @MinLength(1)
  @Field()
  name: string;

  @Field()
  description: string;

  @IsDateString()
  @Field()
  dateAdded: string;
}
