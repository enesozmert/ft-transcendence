import { Test, TestingModule } from '@nestjs/testing';
import { GameTotalScoriesController } from './game-total-scories.controller';

describe('GameTotalScoriesController', () => {
  let controller: GameTotalScoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameTotalScoriesController],
    }).compile();

    controller = module.get<GameTotalScoriesController>(GameTotalScoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
