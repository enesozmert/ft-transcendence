import { Test, TestingModule } from '@nestjs/testing';
import { AchievementRuleService } from './achievement-rule.service';

describe('AchievementRuleService', () => {
  let service: AchievementRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchievementRuleService],
    }).compile();

    service = module.get<AchievementRuleService>(AchievementRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
