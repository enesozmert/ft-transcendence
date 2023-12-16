import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { AchievementRuleDal } from 'src/dataAccess/concrete/achievementRuleDal';
import { AchievementRule } from 'src/entities/concrete/achievementRule.entity';

@Injectable()
export class AchievementRuleRuleService {
    constructor(@InjectRepository(AchievementRule) private achievementRuleDal: AchievementRuleDal) {

    }
    public async getAll(): Promise<IDataResult<AchievementRule[]>> {
        return new SuccessDataResult<AchievementRule[]>(
            await this.achievementRuleDal.find(),
            Messages.AchievementRuleGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<AchievementRule>> {
        return new SuccessDataResult<AchievementRule>(
            await this.achievementRuleDal.findOne({ where: { id: id } }),
            Messages.AchievementRuleDeleted,
        );
    }

    public async add(achievementRule: AchievementRule): Promise<IDataResult<AchievementRule>> {
        const addedAchievementRule = await this.achievementRuleDal.save(achievementRule);
        return new SuccessDataResult<AchievementRule>(addedAchievementRule, Messages.AchievementRuleAdded);
    }

    public async update(
        updatedAchievementRule: AchievementRule,
    ): Promise<IResult> {
        const user = await this.achievementRuleDal.findOne({ where: { id: updatedAchievementRule.id } });
        if (!user) {
            return new ErrorResult(Messages.AchievementRuleNotFound);
        }
        const mergedUser = this.achievementRuleDal.merge(user, updatedAchievementRule);
        await this.achievementRuleDal.save(mergedUser);
        return new SuccessResult(Messages.AchievementRuleDeleted);
    }

    public async delete(id: number): Promise<IResult> {
        await this.achievementRuleDal.delete(id);
        return new SuccessResult(Messages.AchievementRuleDeleted);
    }
}
