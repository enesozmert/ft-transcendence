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

@Injectable()
export class GameTotalScoreService {
    constructor(@InjectRepository(GameTotalScore) private gameScoreDal: GameTotalScoreDal) {
        
    }
    public async getAll(): Promise<IDataResult<GameTotalScore[]>> {
		return new SuccessDataResult<GameTotalScore[]>(
			await this.gameScoreDal.find(),
			Messages.GameTotalScoreGetAll,
		);
	}

    public async getById(id: number): Promise<IDataResult<GameTotalScore>> {
		return new SuccessDataResult<GameTotalScore>(
			await this.gameScoreDal.findOne({ where: { id: id } }),
			Messages.GameTotalScoreGetById,
		);
	}
    
    public async add(gameHistory: GameTotalScore): Promise<IDataResult<GameTotalScore>> {
		const addedGameTotalScore = await this.gameScoreDal.save(gameHistory);
		return new SuccessDataResult<GameTotalScore>(addedGameTotalScore, Messages.GameTotalScoreAdded);
	}

	public async update(
		updatedGameTotalScoreDal: GameTotalScore,
	): Promise<IResult> {
		const user = await this.gameScoreDal.findOne({ where: { id: updatedGameTotalScoreDal.id } });
		if (!user) {
			return new ErrorResult(Messages.GameTotalScoreNotFound);
		}
		const mergedUser = this.gameScoreDal.merge(user, updatedGameTotalScoreDal);
		await this.gameScoreDal.save(mergedUser);
		return new SuccessResult(Messages.GameTotalScoreUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.gameScoreDal.delete(id);
		return new SuccessResult(Messages.GameTotalScoreDeleted);
	}
}
