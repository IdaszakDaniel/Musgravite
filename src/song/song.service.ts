import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { v4 as uuid } from 'uuid';

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

  async createSong(name, description, dateAdded): Promise<Song> {
    const song = this.songRepository.create({
      id: uuid(),
      name,
      description,
      dateAdded,
    });

    return this.songRepository.save(song);
  }
}
