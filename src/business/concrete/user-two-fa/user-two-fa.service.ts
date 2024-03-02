import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserTwoFADal } from 'src/dataAccess/concrete/userTwoFaDal';
import { UserTwoFA } from 'src/entities/concrete/userTwoFa.entity';

@Injectable()
export class UserTwoFaService {
	constructor(@InjectRepository(UserTwoFA) private userTwoFADal: UserTwoFADal) {

	}

	public async getAll(): Promise<IDataResult<UserTwoFA[]>> {
		return new SuccessDataResult<UserTwoFA[]>(
			await this.userTwoFADal.find(),
			Messages.UserTwoFAGetAll,
		);
	}

	public async getById(id: number): Promise<IDataResult<UserTwoFA>> {
		return new SuccessDataResult<UserTwoFA>(
			await this.userTwoFADal.findOne({ where: { id: id } }),
			Messages.UserTwoFAGetById,
		);
	}

	public async add(userTwoFA: UserTwoFA): Promise<IDataResult<UserTwoFA>> {
		let addedUserTwoFA: UserTwoFA;
		const findedUserTwo = await this.userTwoFADal.findOne({ where: { userId: userTwoFA.userId } });
		if (findedUserTwo != null)
			return new ErrorDataResult<UserTwoFA>(null, Messages.UserTwoFAAdded);
		addedUserTwoFA = await this.userTwoFADal.save(userTwoFA);
		return new SuccessDataResult<UserTwoFA>(addedUserTwoFA, Messages.UserTwoFAAdded);
	}

	public async update(
		updatedUserTwoFA: UserTwoFA,
	): Promise<IResult> {
		const user = await this.userTwoFADal.findOne({ where: { id: updatedUserTwoFA.id } });
		if (!user) {
			return new ErrorResult(Messages.UserTwoFANotFound);
		}
		const mergedUser = this.userTwoFADal.merge(user, updatedUserTwoFA);
		await this.userTwoFADal.save(mergedUser);
		return new SuccessResult(Messages.UserTwoFAUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.userTwoFADal.delete(id);
		return new SuccessResult(Messages.UserTwoFADeleted);
	}

	public async getByUserId(userId: number): Promise<IDataResult<UserTwoFA>> {
		return new SuccessDataResult<UserTwoFA>(
			await this.userTwoFADal.findOne({ where: { userId: userId } }),
			Messages.UserTwoFAGetByUserId,
		);
	}
}
