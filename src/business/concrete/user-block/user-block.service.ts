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
import { UserBlockDal } from 'src/dataAccess/concrete/userBlockDal';
import { UserBlock } from 'src/entities/concrete/userBlock.entity';

@Injectable()
export class UserBlockService {
    constructor(
        @InjectRepository(UserBlock) private userBlockDal: UserBlockDal,
    ) { }

    public async getAll(): Promise<IDataResult<UserBlock[]>> {
        return new SuccessDataResult<UserBlock[]>(
            await this.userBlockDal.find(),
            Messages.UserBlockGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<UserBlock>> {
        return new SuccessDataResult<UserBlock>(
            await this.userBlockDal.findOne({ where: { id: id } }),
            Messages.UserBlockGetById,
        );
    }

    public async add(userBlock: UserBlock): Promise<IDataResult<UserBlock>> {
        let result = BusinessRules.run(await this.checkUniqBlock(userBlock));
        if (result != null)
            return new ErrorDataResult<UserBlock>(null, Messages.UserBlockAdded);
        const addedUserBlock = await this.userBlockDal.save(userBlock);
        return new SuccessDataResult<UserBlock>(addedUserBlock, Messages.UserBlockAdded);
    }

    public async update(updatedUserBlock: UserBlock): Promise<IResult> {
        const type = await this.userBlockDal.findOne({ where: { id: updatedUserBlock.id } });
        if (!type) {
            return new ErrorResult(Messages.UserBlockNotFound);
        }
        const mergedType = this.userBlockDal.merge(type, updatedUserBlock);
        await this.userBlockDal.save(mergedType);
        return new SuccessResult(Messages.UserBlockAdded);
    }

    public async delete(id: number): Promise<IResult> {
        await this.userBlockDal.delete(id);
        return new SuccessResult(Messages.UserBlockAdded);
    }

    public async getByBlockerId(blockerId: number): Promise<IDataResult<UserBlock[]>> {
        let result = await this.userBlockDal.find({ where: { blockerId: blockerId } });
        return new SuccessDataResult(result, Messages.UserBlockByBlockerId);
    }

    public async getByBlockerIdBlockedId(updateUserBlock: UserBlock): Promise<IDataResult<UserBlock>> {
        let userBlock = await this.userBlockDal.findOne({ where: { blockedId: updateUserBlock.blockedId, blockerId: updateUserBlock.blockerId } });
        if (!userBlock) {
            return new ErrorDataResult(null,Messages.UserBlockNotFound);
        }
        return new SuccessDataResult(userBlock);
    }

    //bussines
    private async checkUniqBlock(userBlock): Promise<IResult>{
        let userBlockFinded = await this.userBlockDal.findOne({ where: { blockedId: userBlock.blockedId, blockerId: userBlock.blockerId } });
        if (userBlockFinded){
            return new ErrorResult("");
        }
        return new SuccessResult("");
    }
}
