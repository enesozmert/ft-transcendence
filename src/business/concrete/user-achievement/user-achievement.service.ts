import { AchievementRule } from './../../../entities/concrete/achievementRule.entity';
import { UserAchievementByAchievementDto } from '../../../entities/dto/userAchievementByAchievementDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserAchievementDal } from 'src/dataAccess/concrete/userAchievementDal';
import { UserAchievement } from 'src/entities/concrete/userAchievement.entity';
import { AchievementDal } from 'src/dataAccess/concrete/achievementDal';
import { Achievement } from 'src/entities/concrete/achievement.entity';

@Injectable()
export class UserAchievementService {
    constructor(@InjectRepository(UserAchievement) private userAchievementDal: UserAchievementDal, private achievementDal: AchievementDal) {

    }
    public async getAll(): Promise<IDataResult<UserAchievement[]>> {
        return new SuccessDataResult<UserAchievement[]>(
            await this.userAchievementDal.find(),
            Messages.UserAchievementGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<UserAchievement>> {
        return new SuccessDataResult<UserAchievement>(
            await this.userAchievementDal.findOne({ where: { id: id } }),
            Messages.UserAchievementGetById,
        );
    }

    public async add(userAchievement: UserAchievement): Promise<IDataResult<UserAchievement>> {
        const addedUserAchievement = await this.userAchievementDal.save(userAchievement);
        return new SuccessDataResult<UserAchievement>(addedUserAchievement, Messages.UserAchievementAdded);
    }

    public async update(
        updatedUserAchievement: UserAchievement,
    ): Promise<IResult> {
        const user = await this.userAchievementDal.findOne({ where: { id: updatedUserAchievement.id } });
        if (!user) {
            return new ErrorResult(Messages.UserAchievementNotFound);
        }
        const mergedUser = this.userAchievementDal.merge(user, updatedUserAchievement);
        await this.userAchievementDal.save(mergedUser);
        return new SuccessResult(Messages.UserAchievementUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.userAchievementDal.delete(id);
        return new SuccessResult(Messages.UserAchievementDeleted);
    }

    public async getByUserIdAndAchievementId(userId: number, achievementId: number): Promise<IDataResult<UserAchievement>> {
        return new SuccessDataResult<UserAchievement>(
            await this.userAchievementDal.findOne({ where: { userId: userId, achievementId: achievementId } }),
            Messages.UserAchievementUserIdAndAchievementId,
        );
    }


    public async getAllUserAchievementByAchievementDtoWithUserId(userId): Promise<IDataResult<UserAchievementByAchievementDto[]>> {
        const queryBuilder = this.userAchievementDal
            .createQueryBuilder('userAchievement')
            .innerJoin(Achievement, 'achievement', 'userAchievement.achievementId = achievement.id')
            .innerJoin(AchievementRule, 'achievementRule', 'userAchievement.achievementId = achievementRule.id')
            .select([
                'userAchievement.id as "id"',
                'userAchievement.userId as "userId"',
                'userAchievement.achievementId as "achievementId"',
                'achievement.name as "name"',
                'achievement.imagePath as "imagePath"',
                'userAchievement.updateTime as "updateTime"',
                'userAchievement.status as "status"',
                'achievementRule.reward as "reward"'
            ])
            .where('userAchievement.userId = :userId', { userId });

        const result = await queryBuilder.getRawMany();

        return new SuccessDataResult(result, Messages.GetWithUserDtos);
    }
}
