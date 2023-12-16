import { GameTotalScoreByUserDto } from './../../../entities/dto/gameTotalScoreByUserDto';
import { UserService } from './../user/user.service';
import { GameResultName } from 'src/entities/concrete/gameResultName.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { GameTotalScoreDal } from 'src/dataAccess/concrete/gameTotalScoreDal';
import { GameTotalScore } from 'src/entities/concrete/gameTotalScore.entity';
import { User } from 'src/entities/concrete/user.entity';

@Injectable()
export class GameTotalScoreService {
	constructor(@InjectRepository(GameTotalScore) private gameTotalScoreDal: GameTotalScoreDal, private userService: UserService) {

	}
	public async getAll(): Promise<IDataResult<GameTotalScore[]>> {
		return new SuccessDataResult<GameTotalScore[]>(
			await this.gameTotalScoreDal.find(),
			Messages.GameTotalScoreGetAll,
		);
	}

	public async getById(id: number): Promise<IDataResult<GameTotalScore>> {
		return new SuccessDataResult<GameTotalScore>(
			await this.gameTotalScoreDal.findOne({ where: { id: id } }),
			Messages.GameTotalScoreGetById,
		);
	}

	public async add(gameHistory: GameTotalScore): Promise<IDataResult<GameTotalScore>> {
		const addedGameTotalScore = await this.gameTotalScoreDal.save(gameHistory);
		return new SuccessDataResult<GameTotalScore>(addedGameTotalScore, Messages.GameTotalScoreAdded);
	}

	public async update(
		updatedGameTotalScoreDal: GameTotalScore,
	): Promise<IResult> {
		const user = await this.gameTotalScoreDal.findOne({ where: { id: updatedGameTotalScoreDal.id } });
		if (!user) {
			return new ErrorResult(Messages.GameTotalScoreNotFound);
		}
		const mergedUser = this.gameTotalScoreDal.merge(user, updatedGameTotalScoreDal);
		await this.gameTotalScoreDal.save(mergedUser);
		return new SuccessResult(Messages.GameTotalScoreUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.gameTotalScoreDal.delete(id);
		return new SuccessResult(Messages.GameTotalScoreDeleted);
	}

	public async getByNickName(nickName: string): Promise<IDataResult<GameTotalScore>> {
		const user = await (await this.userService.getByNickName(nickName)).data;
		const userInfo = await this.gameTotalScoreDal.findOne({ where: { userId: user.id } });
		return new SuccessDataResult<GameTotalScore>(
			userInfo,
			Messages.UserInfoGetByNickName,
		);
	}

	public async getWithUserDtos(): Promise<IDataResult<GameTotalScoreByUserDto[]>> {
		const queryBuilder = this.gameTotalScoreDal
			.createQueryBuilder('gameTotalScoreDal')
			.innerJoin(User, 'user', 'user.id = gameTotalScoreDal.userId')
			.select([
				'gameTotalScoreDal.id as "id"',
				'user.nickName as "nickName"',
				'gameTotalScoreDal.totalScore as "totalScore"',
				'gameTotalScoreDal.totalWin as "totalWin"',
				'gameTotalScoreDal.totalLose as "totalLose"',
				'gameTotalScoreDal.updateTime as "updateTime"',
				'gameTotalScoreDal.status as "status"',
			]).orderBy('gameTotalScoreDal.totalScore', 'DESC')

		const result = await queryBuilder.getRawMany();
		return new SuccessDataResult(result, Messages.GetWithUserDtos);
	}
}
