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
        userInfo.profileImagePath = file.filename;
        this.update(userInfo);
        return await new SuccessResult(Messages.UserInfoUploadProfileImage);
    }
}
