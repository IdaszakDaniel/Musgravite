import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SongType } from './song.type';
import { SongService } from './song.service';
import { CreateSongInput } from './song.input';

@Resolver((of) => SongType)
export class SongResolver {
  constructor(private songService: SongService) {}

  @Query((returns) => SongType)
  song(@Args('id') id: string) {
    return this.songService.getSong(id);
  }

  @Mutation((returns) => SongType)
  createSong(@Args('createSongInput') createSongInput: CreateSongInput) {
    return this.songService.createSong(createSongInput);
  }
}
