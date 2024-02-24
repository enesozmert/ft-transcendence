import { GameHistoryDal } from './../../../dataAccess/concrete/gameHistoryDal';
import { GameHistory } from './../../../entities/concrete/gameHistory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { Messages } from 'src/business/const/messages';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { GameHistoryDto } from 'src/entities/dto/gameHistoryDto';
import { User } from 'src/entities/concrete/user.entity';

@Injectable()
export class GameHistoryService {
    constructor(@InjectRepository(GameHistory) private gameHistoryDal: GameHistoryDal) {

    }

    public async getAll(): Promise<IDataResult<GameHistory[]>> {
		return new SuccessDataResult<GameHistory[]>(
			await this.gameHistoryDal.find(),
			Messages.GameHistoryGetAll,
		);
	}

    public async getById(id: number): Promise<IDataResult<GameHistory>> {
		return new SuccessDataResult<GameHistory>(
			await this.gameHistoryDal.findOne({ where: { id: id } }),
			Messages.GameHistoryGetById,
		);
	}

    public async add(gameHistory: GameHistory): Promise<IDataResult<GameHistory>> {
		const addedGameHistory = await this.gameHistoryDal.save(gameHistory);
		return new SuccessDataResult<GameHistory>(addedGameHistory, Messages.GameHistoryAdded);
	}

	public async update(
		updatedGameHistory: GameHistory,
	): Promise<IResult> {
		const user = await this.gameHistoryDal.findOne({ where: { id: updatedGameHistory.id } });
		if (!user) {
			return new ErrorResult(Messages.GameHistoryNotFound);
		}
		const mergedUser = this.gameHistoryDal.merge(user, updatedGameHistory);
		await this.gameHistoryDal.save(mergedUser);
		return new SuccessResult(Messages.GameHistoryUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.gameHistoryDal.delete(id);
		return new SuccessResult(Messages.GameHistoryDeleted);
	}

	public async getByUserId(userId: number) : Promise<IDataResult<GameHistory[]>>{
		return new SuccessDataResult<GameHistory[]>(
			await this.gameHistoryDal.find({ where: { userHostId: userId, userGuestId: userId } }),
			Messages.GameHistoryGetAll,
		);
	}

	public async getByUserIdGameHistoryDto(userId: number) : Promise<IDataResult<GameHistoryDto[]>>{
        return new SuccessDataResult<GameHistoryDto[]>(
            await this.getHistoryDto(userId),
            Messages.ChatRoomUserGetByAccessId,
        );
	}

	private async getHistoryDto(userId: number): Promise<GameHistoryDto[]> {
        const queryBuilder = this.gameHistoryDal
            .createQueryBuilder('gameHistory')
            .innerJoin(User, 'user', 'user.id = gameHistory.userHostId')
            .innerJoin(User, 'user2', 'user2.id = gameHistory.userGuestId')
            .select([
                'gameHistory.id as "id"',
                'user.nickName as "userHostNickName"',
                'user2.nickName as "userGuestNickName"',
                'gameHistory.finishDate as "finishDate"',
                'gameHistory.updateTime as "updateTime"',
                'gameHistory.status as "status"',
            ])

        const gameHistoryDto = await queryBuilder.getRawMany();

        return gameHistoryDto;
    }
}
