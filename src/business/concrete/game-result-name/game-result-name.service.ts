import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { GameResultNameDal } from 'src/dataAccess/concrete/gameResultNameDal';
import { GameResultName } from 'src/entities/concrete/gameResultName.entity';

@Injectable()
export class GameResultNameService {
    constructor(@InjectRepository(GameResultName) private gameResultNameDal: GameResultNameDal) {
        
    }
    public async getAll(): Promise<IDataResult<GameResultName[]>> {
		return new SuccessDataResult<GameResultName[]>(
			await this.gameResultNameDal.find(),
			Messages.GameResultNameGetAll,
		);
	}

    public async getById(id: number): Promise<IDataResult<GameResultName>> {
		return new SuccessDataResult<GameResultName>(
			await this.gameResultNameDal.findOne({ where: { id: id } }),
			Messages.GameResultNameGetById,
		);
	}
    
    public async add(gameHistory: GameResultName): Promise<IDataResult<GameResultName>> {
		const addedGameResultName = await this.gameResultNameDal.save(gameHistory);
		return new SuccessDataResult<GameResultName>(addedGameResultName, Messages.GameResultNameAdded);
	}

	public async update(
		updatedGameResultName: GameResultName,
	): Promise<IResult> {
		const user = await this.gameResultNameDal.findOne({ where: { id: updatedGameResultName.id } });
		if (!user) {
			return new ErrorResult(Messages.GameResultNameNotFound);
		}
		const mergedUser = this.gameResultNameDal.merge(user, updatedGameResultName);
		await this.gameResultNameDal.save(mergedUser);
		return new SuccessResult(Messages.GameResultNameUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.gameResultNameDal.delete(id);
		return new SuccessResult(Messages.GameResultNameDeleted);
	}
}
