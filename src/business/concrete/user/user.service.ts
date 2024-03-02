import { UserForSearchDto } from './../../../entities/dto/userForSearchDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserDal } from 'src/dataAccess/concrete/userDal';
import { User } from 'src/entities/concrete/user.entity';
import { OperationClaim } from 'src/core/entities/concrete/operationClaim.entity';
import { OperationClaimDal } from 'src/dataAccess/concrete/operationClaimDal';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { Messages } from 'src/business/const/messages';
import { SelectQueryBuilder } from 'typeorm';
import { UserForUserInfoDto } from 'src/entities/dto/userForUserInfoDto';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';
import { UserInfoDal } from 'src/dataAccess/concrete/userInfoDal';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userDal: UserDal,
		@InjectRepository(OperationClaim)
		private operationClaimDal: OperationClaimDal,
	) { }

	public async getAll(): Promise<IDataResult<User[]>> {
		return new SuccessDataResult<User[]>(
			await this.userDal.find(),
			Messages.UserGetAll,
		);
	}

	public async getById(id: number): Promise<IDataResult<User>> {
		return await new SuccessDataResult<User>(
			await this.userDal.findOne({ where: { id: id } }),
			Messages.UserGetById,
		);
	}

	public async getByMail(email: string): Promise<IDataResult<User>> {
		return await new SuccessDataResult<User>(
			await this.userDal.findOne({ where: { email: email } }),
			Messages.UserGetByMail,
		);
	}
	public async getByNickName(nickName: string): Promise<IDataResult<User>> {
		return await new SuccessDataResult<User>(
			await this.userDal.findOne({ where: { nickName: nickName } }),
			Messages.UserGetByNickName,
		);
	}

	public async add(user: User): Promise<IDataResult<User>> {
		const addedUser = await this.userDal.save(user);
		return new SuccessDataResult<User>(addedUser, Messages.UserAdded);
	}

	public async update(
		updatedUser: User,
	): Promise<IResult> {
		const user = await this.userDal.findOne({ where: { id: updatedUser.id } });
		if (!user) {
			return new ErrorResult(Messages.UserNotFound);
		}
		const mergedUser = this.userDal.merge(user, updatedUser);
		await this.userDal.save(mergedUser);
		return new SuccessResult(Messages.UserUpdate);
	}

	public async delete(id: number): Promise<IResult> {
		await this.userDal.delete(id);
		return new SuccessResult(Messages.UserDeleted);
	}

	public async getClaims(user: User): Promise<IDataResult<OperationClaim[]>> {
		const result = await this.operationClaimDal
			.createQueryBuilder('operationClaim')
			.innerJoin(
				'operationClaim.userOperationClaims',
				'userOperationClaim',
				'userOperationClaim.userId = :userId',
				{ userId: user.id },
			)
			.select([
				'operationClaim.id',
				'operationClaim.name',
				'operationClaim.explanation',
				'operationClaim.description',
			])
			.getMany();
		return new SuccessDataResult<OperationClaim[]>(result, Messages.UserGetClaims);
	}
}
