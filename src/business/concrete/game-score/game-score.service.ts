import { GameResultName } from 'src/entities/concrete/gameResultName.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { GameScoreDal } from 'src/dataAccess/concrete/gameScoreDal';
import { GameScore } from 'src/entities/concrete/gameScore.entity';
import { GameScoreDto } from 'src/entities/dto/gameScoreDto';

@Injectable()
export class GameScoreService {
    constructor(@InjectRepository(GameScore) private gameScoreDal: GameScoreDal) {
        
    }
    public async getAll(): Promise<IDataResult<GameScore[]>> {
		return new SuccessDataResult<GameScore[]>(
			await this.gameScoreDal.find(),
			Messages.GameScoreGetAll,
		);
	}

    public async getById(id: number): Promise<IDataResult<GameScore>> {
		return new SuccessDataResult<GameScore>(
			await this.gameScoreDal.findOne({ where: { id: id } }),
			Messages.GameScoreGetById,
		);
	}
    
    public async add(gameHistory: GameScore): Promise<IDataResult<GameScore>> {
		const addedGameScore = await this.gameScoreDal.save(gameHistory);
		return new SuccessDataResult<GameScore>(addedGameScore, Messages.GameScoreAdded);
	}

	public async update(
		updatedGameScoreDal: GameScore,
	): Promise<IResult> {
		const user = await this.gameScoreDal.findOne({ where: { id: updatedGameScoreDal.id } });
		if (!user) {
			return new ErrorResult(Messages.GameScoreNotFound);
		}
		const mergedUser = this.gameScoreDal.merge(user, updatedGameScoreDal);
		await this.gameScoreDal.save(mergedUser);
		return new SuccessResult(Messages.GameScoreUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.gameScoreDal.delete(id);
		return new SuccessResult(Messages.GameScoreDeleted);
	}

	// public async getByUserIdGameScoreDto(userId: number) : Promise<IDataResult<GameScoreDto[]>>{
    //     return new SuccessDataResult<GameScoreDto[]>(
    //         await this.getHistoryDto(),
    //         Messages.GameScoreGetByUserIdGameScoreDto,
    //     );
	// }

	// private async getHistoryDto(): Promise<GameScoreDto[]> {
    //     const queryBuilder = this.gameScoreDal
    //         .createQueryBuilder('gameScore')
    //         .innerJoin(GameResultName, 'gameResultName', 'gameResultName.id = gameScore.resultNameId')
    //         .select([
    //             'gameScore.id as "id"',
    //             'gameScore.userHostScore as "userHostScore"',
    //             'gameScore.userGuestScore as "userGuestScore"',
    //             'gameResultName.name as "resultName"',
    //             'gameScore.updateTime as "updateTime"',
    //             'gameScore.status as "status"',
    //         ])

    //     const gameScoreDto = await queryBuilder.getRawMany();

    //     return gameScoreDto;
    // }
}
