import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/business/const/messages';
import { IDataResult } from 'src/core/utilities/result/abstract/iDataResult';
import { IResult } from 'src/core/utilities/result/abstract/iResult';
import { SuccessDataResult } from 'src/core/utilities/result/concrete/dataResult/successDataResult';
import { ErrorResult } from 'src/core/utilities/result/concrete/result/errorResult';
import { SuccessResult } from 'src/core/utilities/result/concrete/result/successResult';
import { ChatRoomUserPropertyDal } from 'src/dataAccess/concrete/chatRoomUserPropertyDal';
import { ChatRoomUserProperty } from 'src/entities/concrete/chatRoomUserProperty.entity';

@Injectable()
export class ChatRoomUserPropertyService {
    constructor(@InjectRepository(ChatRoomUserProperty) private chatRoomUserPropertyDal: ChatRoomUserPropertyDal) {
        
    }

    public async getAll(): Promise<IDataResult<ChatRoomUserProperty[]>> {
        return new SuccessDataResult<ChatRoomUserProperty[]>(
            await this.chatRoomUserPropertyDal.find(),
            Messages.ChatRoomUserPropertyGetAll,
        );
    }

    public async getById(id: number): Promise<IDataResult<ChatRoomUserProperty>> {
        return new SuccessDataResult<ChatRoomUserProperty>(
            await this.chatRoomUserPropertyDal.findOne({ where: { id: id } }),
            Messages.ChatRoomUserPropertyGetById,
        );
    }

    public async add(chatRoomUserProperty: ChatRoomUserProperty): Promise<IDataResult<ChatRoomUserProperty>> {
        const addedChatRoomUserProperty = await this.chatRoomUserPropertyDal.save(chatRoomUserProperty);
        return new SuccessDataResult<ChatRoomUserProperty>(addedChatRoomUserProperty, Messages.ChatRoomUserPropertyAdded);
    }

    public async update(updatedChatRoomUserProperty: ChatRoomUserProperty): Promise<IResult> {
        const userProperty = await this.chatRoomUserPropertyDal.findOne({ where: { id: updatedChatRoomUserProperty.id } });
        if (!userProperty) {
            return new ErrorResult(Messages.ChatRoomUserPropertyNotFound);
        }
        const mergedUserProperty = this.chatRoomUserPropertyDal.merge(userProperty, updatedChatRoomUserProperty);
        await this.chatRoomUserPropertyDal.save(mergedUserProperty);
        return new SuccessResult(Messages.ChatRoomUserPropertyUpdate);
    }

    public async delete(id: number): Promise<IResult> {
        await this.chatRoomUserPropertyDal.delete(id);
        return new SuccessResult(Messages.ChatRoomUserPropertyDeleted);
    }
}
