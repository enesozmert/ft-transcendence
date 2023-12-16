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

@Injectable()
export class UserUserAchievementService {
    constructor(@InjectRepository(UserAchievement) private userAchievementDal: UserAchievementDal) {

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
}
