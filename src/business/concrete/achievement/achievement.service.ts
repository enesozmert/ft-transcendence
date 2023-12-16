import { SuccessDataResult } from './../../../core/utilities/result/concrete/dataResult/successDataResult';
import { IDataResult } from './../../../core/utilities/result/abstract/iDataResult';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/concrete/achievement.entity';
import { AchievementDal } from 'src/dataAccess/concrete/achievementDal';
import { Messages } from 'src/business/const/messages';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';

@Injectable()
export class AchievementService {
    constructor(@InjectRepository(Achievement) private achievementDal: AchievementDal) {

    }
    public async getAll(): Promise<IDataResult<Achievement[]>> {
        return new SuccessDataResult<Achievement[]>(
            await this.achievementDal.find(),
            Messages.AchievementGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<Achievement>> {
        return new SuccessDataResult<Achievement>(
            await this.achievementDal.findOne({ where: { id: id } }),
            Messages.AchievementGetById,
        );
    }

    public async add(achievement: Achievement): Promise<IDataResult<Achievement>> {
        const addedAchievement = await this.achievementDal.save(achievement);
        return new SuccessDataResult<Achievement>(addedAchievement, Messages.AchievementAdded);
    }

    public async update(
        updatedAchievement: Achievement,
    ): Promise<IResult> {
        const user = await this.achievementDal.findOne({ where: { id: updatedAchievement.id } });
        if (!user) {
            return new ErrorResult(Messages.AchievementNotFound);
        }
        const mergedUser = this.achievementDal.merge(user, updatedAchievement);
        await this.achievementDal.save(mergedUser);
        return new SuccessResult(Messages.AchievementUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.achievementDal.delete(id);
        return new SuccessResult(Messages.AchievementDeleted);
    }
}
