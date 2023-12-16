import { Injectable } from '@nestjs/common';
import { UserAchievement } from 'src/entities/concrete/userAchievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAchievementDal extends Repository<UserAchievement> {

}