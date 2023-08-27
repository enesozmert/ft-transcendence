import { Test, TestingModule } from '@nestjs/testing';
import { GameHistoriesController } from './game-histories.controller';

describe('GameHistoriesController', () => {
  let controller: GameHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameHistoriesController],
    }).compile();

    controller = module.get<GameHistoriesController>(GameHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
