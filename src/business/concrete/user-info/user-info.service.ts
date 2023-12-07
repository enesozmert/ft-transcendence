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

@Injectable()
export class UserInfoService {
    constructor(@InjectRepository(UserInfo) private userInfoDal: UserInfoDal) {
        
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

    public async add(chatRoomType: UserInfo): Promise<IDataResult<UserInfo>> {
        const addedUserInfo = await this.userInfoDal.save(chatRoomType);
        return new SuccessDataResult<UserInfo>(addedUserInfo, Messages.UserInfoAdded);
    }

    public async update(updatedUserInfo: UserInfo): Promise<IResult> {
        const type = await this.userInfoDal.findOne({ where: { id: updatedUserInfo.id } });
        if (!type) {
            return new ErrorResult(Messages.UserInfoNotFound,);
        }
        const mergedType = this.userInfoDal.merge(type, updatedUserInfo);
        await this.userInfoDal.save(mergedType);
        return new SuccessResult(Messages.UserInfoAdded);
    }

    public async delete(id: number): Promise<IResult> {
        await this.userInfoDal.delete(id);
        return new SuccessResult(Messages.UserInfoAdded);
    }
}
