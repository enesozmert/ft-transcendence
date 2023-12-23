import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementRuleService } from 'src/business/concrete/achievement-rule/achievement-rule.service';
import { AchievementRule } from 'src/entities/concrete/achievementRule.entity';
import { AchievementRulesController } from 'src/controllers/achievement-rules/achievement-rules.controller';
import { AchievementRuleDal } from 'src/dataAccess/concrete/achievementRuleDal';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementRule]), UserModule
  ],
  exports: [TypeOrmModule, AchievementRuleService],
  controllers: [AchievementRulesController],
  providers: [AchievementRuleService, AchievementRuleDal],
})
export class AchievementRuleModule {}
