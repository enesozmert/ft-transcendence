import { TwoFAType } from './../../../entities/concrete/towFAType.entity';
import { Injectable } from '@nestjs/common';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { InjectRepository } from '@nestjs/typeorm';
import { TwoFATypeDal } from 'src/dataAccess/concrete/towFATypeDal';
import { Messages } from 'src/business/const/messages';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';

@Injectable()
export class TwoFatypeService {
    constructor(@InjectRepository(TwoFAType) private twoFATypeDal: TwoFATypeDal) {

    }
    public async getAll(): Promise<IDataResult<TwoFAType[]>> {
        return new SuccessDataResult<TwoFAType[]>(
            await this.twoFATypeDal.find(),
            Messages.TwoFATypeGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<TwoFAType>> {
        return new SuccessDataResult<TwoFAType>(
            await this.twoFATypeDal.findOne({ where: { id: id } }),
            Messages.TwoFATypeGetById,
        );
    }

    public async add(gameHistory: TwoFAType): Promise<IDataResult<TwoFAType>> {
        const addedTwoFAType = await this.twoFATypeDal.save(gameHistory);
        return new SuccessDataResult<TwoFAType>(addedTwoFAType, Messages.TwoFATypeAdded);
    }

    public async update(
        updatedTwoFATypeDal: TwoFAType,
    ): Promise<IResult> {
        const user = await this.twoFATypeDal.findOne({ where: { id: updatedTwoFATypeDal.id } });
        if (!user) {
            return new ErrorResult(Messages.TwoFATypeNotFound);
        }
        const mergedUser = this.twoFATypeDal.merge(user, updatedTwoFATypeDal);
        await this.twoFATypeDal.save(mergedUser);
        return new SuccessResult(Messages.TwoFATypeUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.twoFATypeDal.delete(id);
        return new SuccessResult(Messages.TwoFATypeDeleted);
    }
}
