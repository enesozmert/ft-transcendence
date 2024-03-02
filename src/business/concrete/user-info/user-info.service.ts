import { FormFileProp } from './../../../core/utilities/file/concrete/prop/formFileProp';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserInfoDal } from 'src/dataAccess/concrete/userInfoDal';
import { UserInfo } from 'src/entities/concrete/userInfo.entity';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { FormFileImageSave } from 'src/core/utilities/file/concrete/formFileImageSave';
import { BusinessRules } from 'src/core/utilities/business/businessRules';
import { userInfo } from 'os';
import { User } from 'src/entities/concrete/user.entity';
import { UserForSearchDto } from 'src/entities/dto/userForSearchDto';
import { UserForUserInfoDto } from 'src/entities/dto/userForUserInfoDto';

@Injectable()
export class UserInfoService {
    constructor(@InjectRepository(UserInfo) private userInfoDal: UserInfoDal, private userService: UserService, private formFileImageSave: FormFileImageSave) {

    }

    public async getAll(): Promise<IDataResult<UserInfo[]>> {
        return new SuccessDataResult<UserInfo[]>(
            await this.userInfoDal.find(),
            Messages.UserInfoGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<UserInfo>> {
        return new SuccessDataResult<UserInfo>(
            await this.userInfoDal.findOne({ where: { id: id } }),
            Messages.UserInfoGetById,
        );
    }

    public async add(userInfo: UserInfo): Promise<IDataResult<UserInfo>> {
        let addedUserInfo;
        const result = await this.getByUserId(userInfo.userId);
        if (result.data != null)
            return new ErrorDataResult<UserInfo>(null, Messages.UserBlockAdded);
        addedUserInfo = await this.userInfoDal.save(userInfo)
        return new SuccessDataResult<UserInfo>(addedUserInfo, Messages.UserInfoAdded);
    }

    public async update(updatedUserInfo: UserInfo): Promise<IResult> {
        const type = await this.userInfoDal.findOne({ where: { id: updatedUserInfo.id } });
        if (!type) {
            return new ErrorResult(Messages.UserInfoNotFound);
        }
        const mergedType = this.userInfoDal.merge(type, updatedUserInfo);
        await this.userInfoDal.save(mergedType);
        return new SuccessResult(Messages.UserInfoAdded);
    }

    public async delete(id: number): Promise<IResult> {
        await this.userInfoDal.delete(id);
        return new SuccessResult(Messages.UserInfoAdded);
    }

    public async getByNickName(nickName: string): Promise<IDataResult<UserInfo>> {
        const user = await (await this.userService.getByNickName(nickName)).data;
        const userInfo = await this.userInfoDal.findOne({ where: { userId: user.id } });
        return new SuccessDataResult<UserInfo>(
            userInfo,
            Messages.UserInfoGetByNickName,
        );
    }
    public async uploadProfileImage(nickName: string, file: Express.Multer.File): Promise<IResult> {
        let userInfo = await (await this.getByNickName(nickName)).data;
        let newUserInfo: UserInfo = {
            ...userInfo,
            profileImagePath: file.filename
        }
        await this.update(newUserInfo);
        return await new SuccessResult(Messages.UserInfoUploadProfileImage);
    }
    private async getByUserId(userId: number): Promise<IDataResult<UserInfo>> {
        const userInfo = await this.userInfoDal.findOne({ where: { userId: userId } });
        return new SuccessDataResult<UserInfo>(
            userInfo,
            Messages.UserInfoGetByNickName,
        );
    }

    public async getByAttributes(attributes: Partial<UserForSearchDto>): Promise<IDataResult<UserForUserInfoDto[]>> {
		const queryBuilder = this.userInfoDal
        .createQueryBuilder('userInfo')
		.innerJoin(User, 'user', 'user.id = userInfo.userId')
            .select([
                'user.id as "userId"',
				'userInfo.id as "userInfoId"',
				'user.firstName as "firstName"',
				'user.lastName as "lastName"',
				'user.email as "email"',
				'user.nickName as "nickName"',
				'userInfo.profileImagePath as "profileImagePath"',
            ]);

		Object.entries(attributes).forEach(([key, value]) => {
			if (value) {
				queryBuilder.andWhere(`user.${key} LIKE :${key}`, { [key]: `%${value}%` });
			}
		});

		const userForUserInfos: any[] = await queryBuilder.getRawMany();
		return await new SuccessDataResult<UserForUserInfoDto[]>(
			userForUserInfos,
			Messages.UserGetAttributes,
		);
	}
}
