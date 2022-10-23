import { SongResolver } from './song.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { SongService } from './song.service';
import { Song } from './song.entity';

const mockSong: Song = {
  _id: 'y5vh4b23',
  id: 'ab01',
  name: 'My Song 1',
  description: 'Guitar Solo in key of B minor',
  dateAdded: '2022-10-22T07:48:35Z',
};

const songServiceMock = {
  getSong: jest.fn((id: string): Song => mockSong),
  getSongs: jest.fn((): Song[] => [mockSong]),
};

describe('SongResolver', () => {
  let resolver: SongResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongResolver,
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();

    resolver = module.get<SongResolver>(SongResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query for a single song', async () => {
    const result = await resolver.song('ab01');
    expect(result.id).toEqual('ab01');
  });

  it('should query all songs', async () => {
    const result = await resolver.songs();
    expect(Array.isArray(result)).toEqual(true);
    expect(result[0].id).toEqual('ab01');
  });
});
