import { GameTotalScoreModule } from './../game-total-score/game-total-score.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementRuleService } from 'src/business/concrete/achievement-rule/achievement-rule.service';
import { AchievementRule } from 'src/entities/concrete/achievementRule.entity';
import { AchievementRulesController } from 'src/controllers/achievement-rules/achievement-rules.controller';
import { AchievementRuleDal } from 'src/dataAccess/concrete/achievementRuleDal';
import { UserAchievementModule } from '../user-achievement/user-achievement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementRule]), UserModule, GameTotalScoreModule, UserAchievementModule
  ],
  exports: [TypeOrmModule, AchievementRuleService],
  controllers: [AchievementRulesController],
  providers: [AchievementRuleService, AchievementRuleDal],
})
export class AchievementRuleModule {}
