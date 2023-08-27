import { Test, TestingModule } from '@nestjs/testing';
import { GameResultNamesController } from './game-result-names.controller';

describe('GameResultNamesController', () => {
  let controller: GameResultNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameResultNamesController],
    }).compile();

    controller = module.get<GameResultNamesController>(GameResultNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
