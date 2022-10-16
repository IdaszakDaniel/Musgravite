import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Song')
export class SongType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  dateAdded: string;
}
