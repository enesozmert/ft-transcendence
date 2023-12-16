import { Test, TestingModule } from '@nestjs/testing';
import { UserAchievementsController } from './user-achievements.controller';

describe('UserAchievementsController', () => {
  let controller: UserAchievementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAchievementsController],
    }).compile();

    controller = module.get<UserAchievementsController>(UserAchievementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
