import { Test, TestingModule } from '@nestjs/testing';
import { GameTotalScoreService } from './game-total-score.service';

describe('GameTotalScoreService', () => {
  let service: GameTotalScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameTotalScoreService],
    }).compile();

    service = module.get<GameTotalScoreService>(GameTotalScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
