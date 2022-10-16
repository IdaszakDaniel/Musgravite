import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SongType } from './song.type';
import { SongService } from './song.service';

@Resolver((of) => SongType)
export class SongResolver {
  constructor(private songService: SongService) {}

  @Query((returns) => SongType)
  song() {
    return {
      id: '1edcxz',
      name: 'My project 1',
      description: 'Guitar solo in key of C',
      dateAdded: new Date().toISOString(),
    };
  }

  @Mutation((returns) => SongType)
  createSong(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('dateAdded') dateAdded: string,
  ) {
    return this.songService.createSong(name, description, dateAdded);
  }
}
