import { Test, TestingModule } from '@nestjs/testing';
import { AchievementRulesController } from './achievement-rules.controller';

describe('AchievementRulesController', () => {
  let controller: AchievementRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementRulesController],
    }).compile();

    controller = module.get<AchievementRulesController>(AchievementRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
