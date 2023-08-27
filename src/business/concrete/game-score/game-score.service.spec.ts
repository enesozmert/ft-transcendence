import { Test, TestingModule } from '@nestjs/testing';
import { GameScoreService } from './game-score.service';

describe('GameScoreService', () => {
  let service: GameScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameScoreService],
    }).compile();

    service = module.get<GameScoreService>(GameScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
