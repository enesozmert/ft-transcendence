import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { BusinessRules } from 'src/core/utilities/business/businessRules';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { ErrorDataResult } from 'src/core/utilities/result/concrete/dataResult/errorDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserFriendDal } from 'src/dataAccess/concrete/userFriendDal';
import { UserFriend } from 'src/entities/concrete/userFriends.entity';

@Injectable()
export class UserFriendService {
    constructor(@InjectRepository(UserFriend) private userFriendDal: UserFriendDal) {
        
    }

    public async getAll(): Promise<IDataResult<UserFriend[]>> {
        return new SuccessDataResult<UserFriend[]>(
            await this.userFriendDal.find(),
            Messages.UserFriendGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<UserFriend>> {
        return new SuccessDataResult<UserFriend>(
            await this.userFriendDal.findOne({ where: { id: id } }),
            Messages.UserFriendGetById,
        );
    }

    public async add(userFriend: UserFriend): Promise<IDataResult<UserFriend>> {
        let result = BusinessRules.run(await this.checkUniqFriend(userFriend));
        if (result != null)
            return new ErrorDataResult<UserFriend>(null, Messages.UserFriendAdded);
        const addedUserFriend = await this.userFriendDal.save(userFriend);
        return new SuccessDataResult<UserFriend>(addedUserFriend, Messages.UserFriendAdded);
    }

    public async update(updatedUserFriend: UserFriend): Promise<IResult> {
        const match = await this.userFriendDal.findOne({ where: { id: updatedUserFriend.id } });
        if (!match) {
            return new ErrorResult(Messages.UserFriendNotFound);
        }
        const mergedMatch = this.userFriendDal.merge(match, updatedUserFriend);
        await this.userFriendDal.save(mergedMatch);
        return new SuccessResult(Messages.UserFriendUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.userFriendDal.delete(id);
        return new SuccessResult(Messages.UserFriendDeleted);
    }

    public async getByFromUserIdAndTargetUserId(user: UserFriend): Promise<IDataResult<UserFriend>> {
        let userBlock = await this.userFriendDal.findOne({ where: { fromUserId: user.fromUserId, targetUserId: user.targetUserId } });
        if (!userBlock) {
            return new ErrorDataResult(null,Messages.UserBlockNotFound);
        }
        return new SuccessDataResult(userBlock);
    }

    private async checkUniqFriend(user): Promise<IResult>{
        let userFinded = await this.userFriendDal.findOne({ where: { fromUserId: user.fromUserId, targetUserId: user.targetUserId } });
        if (userFinded){
            return new ErrorResult("");
        }
        return new SuccessResult("");
    }
}
