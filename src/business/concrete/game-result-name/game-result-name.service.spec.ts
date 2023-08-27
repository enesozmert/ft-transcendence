import { Test, TestingModule } from '@nestjs/testing';
import { GameResultNameService } from './game-result-name.service';

describe('GameResultNameService', () => {
  let service: GameResultNameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameResultNameService],
    }).compile();

    service = module.get<GameResultNameService>(GameResultNameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
