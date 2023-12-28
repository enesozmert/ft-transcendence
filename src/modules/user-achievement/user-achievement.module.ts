import { AchievementDal } from 'src/dataAccess/concrete/achievementDal';
import { AchievementModule } from './../achievement/achievement.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAchievement } from 'src/entities/concrete/userAchievement.entity';
import { UserAchievementsController } from 'src/controllers/user-achievements/user-achievements.controller';
import { UserAchievementService } from 'src/business/concrete/user-achievement/user-achievement.service';
import { UserAchievementDal } from 'src/dataAccess/concrete/userAchievementDal';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAchievement]), UserModule
  ],
  exports: [TypeOrmModule, UserAchievementService],
  controllers: [UserAchievementsController],
  providers: [UserAchievementService, UserAchievementDal, AchievementDal],
})
export class UserAchievementModule {}
