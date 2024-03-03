import { UserAchievement } from 'src/entities/concrete/userAchievement.entity';
import { UserAchievementService } from './../user-achievement/user-achievement.service';
import { GameTotalScoreService } from 'src/business/concrete/game-total-score/game-total-score.service';
import { GameTotalScore } from 'src/entities/concrete/gameTotalScore.entity';
import { UserService } from './../user/user.service';
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
export class AchievementRuleService {
    constructor(
        @InjectRepository(AchievementRule) private achievementRuleDal: AchievementRuleDal,
        private userService: UserService,
        private gameTotalScoreService: GameTotalScoreService,
        private userAchievementService: UserAchievementService) {

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

    public async checkAchievement(userId: number, name: string): Promise<IResult> {
        let findByName = await this.achievementRuleDal.findOne({ where: { name: name } });
        const functionCaller = new FunctionCaller();

        if (findByName == null || findByName == undefined)
            return new ErrorResult(Messages.CheckedAchievementNotFound);
        functionCaller.addFunction("signRule", (userId: number) => this.signRule(userId));
        functionCaller.addFunction("firstPongVinnerRule", (userId: number) => this.firstPongVinnerRule(userId));

        let result: IResult = await functionCaller.callFunctionByName(findByName.condition, userId);
        if (!result.success)
            return new ErrorResult(Messages.CheckedAchievement);
        let userAchievementFound = await this.userAchievementService.getByUserIdAndAchievementId(userId, findByName.achievementId);
        if (userAchievementFound && userAchievementFound.data)
            return new ErrorResult(Messages.CheckedAchievement);
        let userAchievement: UserAchievement = {
            id: 0,
            userId: userId,
            achievementId: findByName.achievementId,
            updateTime: new Date(),
            status: true
        };
        await this.userAchievementService.add(userAchievement);
        return new SuccessResult(Messages.CheckedAchievement);
    }

    public async signRule(userId: number): Promise<IResult> {
        let findUser = await this.userService.getById(userId);
        if (findUser == null || findUser === undefined)
            return new ErrorResult();
        return new SuccessResult();
    }

    public async firstPongVinnerRule(userId: number): Promise<IResult> {
        let findUser = await this.userService.getById(userId);
        let findTotalScoreByUser = await this.gameTotalScoreService.getByNickName(findUser.data.nickName);
        if (findTotalScoreByUser.data.totalWin >= 1)
            return new ErrorResult();
        return new SuccessResult();
    }
}

export class FunctionCaller {
    private functions: { [key: string]: (...args: any[]) => void } = {};

    // Fonksiyon eklemek için kullanılan metot
    addFunction(name: string, func: (...args: any[]) => void): void {
        this.functions[name] = func;
    }

    // İsimle eşleşen fonksiyonu çağıran metot
    async callFunctionByName(name: string, ...args: any[]): Promise<any> {
        const func = this.functions[name];
        let result: any;
        if (func) {
            result = func(...args);
        } else {
            console.log(`"${name}" isimli bir fonksiyon bulunamadı.`);
        }
        return result;
    }
}
