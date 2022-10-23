import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { SongService } from './song.service';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('SongService', () => {
  let service: SongService;
  let repositoryMock: MockType<Repository<Song>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        {
          provide: getRepositoryToken(Song),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<SongService>(SongService);
    repositoryMock = module.get(getRepositoryToken(Song));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a single song using the id', async () => {
    const song = { name: 'Alni', id: '123' };
    repositoryMock.findOne.mockReturnValue(song);
    const result = await service.getSong('123');
    expect(result.id).toEqual('123');
    expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
  });
});
