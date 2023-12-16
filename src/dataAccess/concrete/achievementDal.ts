import { Injectable } from '@nestjs/common';
import { Achievement } from 'src/entities/concrete/achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementDal extends Repository<Achievement> {

}