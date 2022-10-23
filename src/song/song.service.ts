import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { v4 as uuid } from 'uuid';
import { CreateSongInput } from './song.input';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async getSong(id: string): Promise<Song> {
    return this.songRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getSongs(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async createSong(createSongInput: CreateSongInput): Promise<Song> {
    const { name, description, dateAdded } = createSongInput;

    const song = this.songRepository.create({
      id: uuid(),
      name,
      description,
      dateAdded,
    });

    return this.songRepository.save(song);
  }
}
