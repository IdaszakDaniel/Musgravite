import { Query, Resolver } from '@nestjs/graphql';
import { SongType } from './song.type';

@Resolver((of) => SongType)
export class SongResolver {
  @Query((returns) => SongType)
  song() {
    return {
      id: '1edcxz',
      name: 'My project 1',
      description: 'Guitar solo in key of C',
      dateAdded: new Date().toISOString(),
    };
  }
}
