import { Achievement } from 'src/entities/concrete/achievement.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementService } from 'src/business/concrete/achievement/achievement.service';
import { AchievementsController } from 'src/controllers/achievements/achievements.controller';
import { AchievementDal } from 'src/dataAccess/concrete/achievementDal';

@Module({
  imports: [
    TypeOrmModule.forFeature([Achievement]),
  ],
  exports: [TypeOrmModule, AchievementService],
  controllers: [AchievementsController],
  providers: [AchievementService, AchievementDal],
})
export class AchievementModule {}
