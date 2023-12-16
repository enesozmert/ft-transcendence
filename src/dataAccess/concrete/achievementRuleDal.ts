import { Injectable } from '@nestjs/common';
import { AchievementRule } from 'src/entities/concrete/achievementRule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementRuleDal extends Repository<AchievementRule> {

}