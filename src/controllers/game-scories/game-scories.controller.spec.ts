import { Test, TestingModule } from '@nestjs/testing';
import { GameScoriesController } from './game-scories.controller';

describe('GameScoriesController', () => {
  let controller: GameScoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameScoriesController],
    }).compile();

    controller = module.get<GameScoriesController>(GameScoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
