import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { DirectMessageMatchDal } from 'src/dataAccess/concrete/directMessageMatchDal';
import { DirectMessageMatch } from 'src/entities/concrete/directMessageMatch.entity';

@Injectable()
export class DirectMessageMatchService {
    constructor(@InjectRepository(DirectMessageMatch) private directMessageMatchDal: DirectMessageMatchDal) {
        
    }

    public async getAll(): Promise<IDataResult<DirectMessageMatch[]>> {
        return new SuccessDataResult<DirectMessageMatch[]>(
            await this.directMessageMatchDal.find(),
            Messages.DirectMessageMatchGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<DirectMessageMatch>> {
        return new SuccessDataResult<DirectMessageMatch>(
            await this.directMessageMatchDal.findOne({ where: { id: id } }),
            Messages.DirectMessageMatchGetById,
        );
    }

    public async add(directMessageMatch: DirectMessageMatch): Promise<IDataResult<DirectMessageMatch>> {
        const addedDirectMessageMatch = await this.directMessageMatchDal.save(directMessageMatch);
        return new SuccessDataResult<DirectMessageMatch>(addedDirectMessageMatch, Messages.DirectMessageMatchAdded);
    }

    public async update(updatedDirectMessageMatch: DirectMessageMatch): Promise<IResult> {
        const match = await this.directMessageMatchDal.findOne({ where: { id: updatedDirectMessageMatch.id } });
        if (!match) {
            return new ErrorResult(Messages.DirectMessageMatchNotFound);
        }
        const mergedMatch = this.directMessageMatchDal.merge(match, updatedDirectMessageMatch);
        await this.directMessageMatchDal.save(mergedMatch);
        return new SuccessResult(Messages.DirectMessageMatchUpdate);
    }
    public async delete(id: number): Promise<IResult> {
        await this.directMessageMatchDal.delete(id);
        return new SuccessResult(Messages.DirectMessageMatchDeleted);
    }
}
