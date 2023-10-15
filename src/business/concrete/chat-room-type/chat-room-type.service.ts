import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomTypeDal } from 'src/dataAccess/concrete/chatRoomTypeDal';
import { ChatRoomType } from 'src/entities/concrete/chatRoomType.entity';

@Injectable()
export class ChatRoomTypeService {
    constructor(@InjectRepository(ChatRoomType) private chatRoomTypeDal: ChatRoomTypeDal) {
        
    }

    public async getAll(): Promise<IDataResult<ChatRoomType[]>> {
        return new SuccessDataResult<ChatRoomType[]>(
            await this.chatRoomTypeDal.find(),
            Messages.ChatRoomTypeGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<ChatRoomType>> {
        return new SuccessDataResult<ChatRoomType>(
            await this.chatRoomTypeDal.findOne({ where: { id: id } }),
            Messages.ChatRoomTypeGetById,
        );
    }

    public async add(chatRoomType: ChatRoomType): Promise<IDataResult<ChatRoomType>> {
        const addedChatRoomType = await this.chatRoomTypeDal.save(chatRoomType);
        return new SuccessDataResult<ChatRoomType>(addedChatRoomType, Messages.ChatRoomTypeAdded);
    }

    public async update(updatedChatRoomType: ChatRoomType): Promise<IResult> {
        const type = await this.chatRoomTypeDal.findOne({ where: { id: updatedChatRoomType.id } });
        if (!type) {
            return new ErrorResult(Messages.ChatRoomTypeNotFound);
        }
        const mergedType = this.chatRoomTypeDal.merge(type, updatedChatRoomType);
        await this.chatRoomTypeDal.save(mergedType);
        return new SuccessResult(Messages.ChatRoomTypeAdded);
    }

    public async delete(id: number): Promise<IResult> {
        await this.chatRoomTypeDal.delete(id);
        return new SuccessResult(Messages.ChatRoomTypeAdded);
    }
}
