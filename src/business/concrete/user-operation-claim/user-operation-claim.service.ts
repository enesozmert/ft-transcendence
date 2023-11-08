import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { UserOperationClaim } from 'src/core/entities/concrete/userOperationClaim.entity';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { UserOperationClaimDal } from 'src/dataAccess/concrete/userOperationClaimDal';

@Injectable()
export class UserOperationClaimService {
    constructor(@InjectRepository(UserOperationClaim) private userOperationClaimDal: UserOperationClaimDal) {}

    public async getAll(): Promise<IDataResult<UserOperationClaim[]>> {
        return new SuccessDataResult<UserOperationClaim[]>(
            await this.userOperationClaimDal.find(),
            Messages.UserOperationClaimGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<UserOperationClaim>> {
        return new SuccessDataResult<UserOperationClaim>(
            await this.userOperationClaimDal.findOne({ where: { id: id } }),
            Messages.UserOperationClaimGetById,
        );
    }

    public async add(userOperationClaim: UserOperationClaim): Promise<IResult> {
        const addedOperationClaim = await this.userOperationClaimDal.save(userOperationClaim);
        return new SuccessResult(Messages.UserOperationClaimAdded);
    }

    public async update(updatedOperationClaim: UserOperationClaim): Promise<IResult> {
        const match = await this.userOperationClaimDal.findOne({ where: { id: updatedOperationClaim.id } });
        if (!match) {
            return new ErrorResult(Messages.UserOperationClaimNotFound);
        }
        const mergedMatch = this.userOperationClaimDal.merge(match, updatedOperationClaim);
        await this.userOperationClaimDal.save(mergedMatch);
        return new SuccessResult(Messages.UserOperationClaimUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.userOperationClaimDal.delete(id);
        return new SuccessResult(Messages.UserOperationClaimDeleted);
    }
}
