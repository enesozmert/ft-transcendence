import { OperationClaimDal } from './../../../dataAccess/concrete/operationClaimDal';
import { OperationClaim } from './../../../core/entities/concrete/operationClaim.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { Messages } from 'src/business/const/messages';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';

@Injectable()
export class OperationClaimService {
    constructor(@InjectRepository(OperationClaim) private operationClaimDal: OperationClaimDal) {
        
    }
    public async getAll(): Promise<IDataResult<OperationClaim[]>> {
        return new SuccessDataResult<OperationClaim[]>(
            await this.operationClaimDal.find(),
            Messages.OperationClaimGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<OperationClaim>> {
        return new SuccessDataResult<OperationClaim>(
            await this.operationClaimDal.findOne({ where: { id: id } }),
            Messages.OperationClaimGetById,
        );
    }

    public async add(operationClaim: OperationClaim): Promise<IResult> {
        const addedOperationClaim = await this.operationClaimDal.save(operationClaim);
        return new SuccessResult(Messages.OperationClaimAdded);
    }

    public async update(updatedOperationClaim: OperationClaim): Promise<IResult> {
        const match = await this.operationClaimDal.findOne({ where: { id: updatedOperationClaim.id } });
        if (!match) {
            return new ErrorResult(Messages.OperationClaimNotFound);
        }
        const mergedMatch = this.operationClaimDal.merge(match, updatedOperationClaim);
        await this.operationClaimDal.save(mergedMatch);
        return new SuccessResult(Messages.OperationClaimUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.operationClaimDal.delete(id);
        return new SuccessResult(Messages.OperationClaimDeleted);
    }
}
